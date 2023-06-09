import './App.css';
import Map from './Map';
import { Menu, Select, Slider, Input } from 'antd';
import * as L from 'leaflet';
import { useEffect, useState } from 'react';
import '/node_modules/leaflet/dist/leaflet.css';
import ExamForm from './ExamForm';
import proj4 from 'proj4';
import RangeSlider from './Slider';
import Fuse from 'fuse.js';
import { School } from '../server/models/school';
import Header from './Header';
import StudentTeacherCount from './StudentTeacherCount';

const fuseOptions = {
  keys: ['name']
};

function schoolToPoint(school: any) {
  const coords = school.gps;
  coords[0] = Number(coords[0]);
  coords[1] = Number(coords[1]);

  return {
    latLng: coords,
    name: school.name,
  };
}

function getURLParameter(sParamL: string) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParamL) {
      return sParameterName[1];
    }
  }
  return null;
}

function App() {
  class RawSchools {
    data: any[];
    fuse: Fuse<any[]>;

    constructor(data: any[]) {
      this.data = data;
      this.fuse = new Fuse(data, fuseOptions);
    }
  }
  const [rawSchools, setRawSchools] = useState<RawSchools>(new RawSchools([]));
  const [schools, setSchools] = useState<any[]>([]);
  const [home, setHome] = useState<L.LatLng | null>(null);
  const [maxDist, setMaxDist] = useState<number>(50_000);
  const [searchQuery, setSearchQuery] = useState<string>("");

  function checkDistance(school: any) {
    const p = schoolToPoint(school);
    const latLngCoord = proj4("EPSG:3857", "EPSG:4326", p.latLng);
    const flippedCoord: [number, number] = [latLngCoord[1], latLngCoord[0]];
    const flippedLatLng = L.latLng(flippedCoord);

    return flippedLatLng.distanceTo(home!) < maxDist;
  }

  function getDistance(school: any) {
    const p = schoolToPoint(school);
    const latLngCoord = proj4("EPSG:3857", "EPSG:4326", p.latLng);
    const flippedCoord: [number, number] = [latLngCoord[1], latLngCoord[0]];
    const flippedLatLng = L.latLng(flippedCoord);

    return flippedLatLng.distanceTo(home!);
  }

  useEffect(() => {
    if (schools?.length !== 0) return;

    let formData: { address: string | null, examsToCheck: string[] } = {
      address: getURLParameter("address"),
      examsToCheck: []
    }

    if (getURLParameter("matematika") !== null) formData.examsToCheck.push("matematika");
    if (getURLParameter("latv_val") !== null) formData.examsToCheck.push("latv_val");
    if (getURLParameter("anglu_val") !== null) formData.examsToCheck.push("anglu_val");
    if (getURLParameter("francu_val") !== null) formData.examsToCheck.push("francu_val");
    if (getURLParameter("krievu_val") !== null) formData.examsToCheck.push("krievu_val");
    if (getURLParameter("vacu_val") !== null) formData.examsToCheck.push("vacu_val");
    if (getURLParameter("biologija") !== null) formData.examsToCheck.push("biologija");
    if (getURLParameter("fizika") !== null) formData.examsToCheck.push("fizika");
    if (getURLParameter("kimija") !== null) formData.examsToCheck.push("kimija");
    if (getURLParameter("vesture") !== null) formData.examsToCheck.push("vesture");

    const response = fetch("http://localhost:6942/api/schools/nearby", {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (getURLParameter("address") !== "") setHome(data.homeLatLang === null ? null : L.latLng([parseFloat(data.homeLatLng[0]), parseFloat(data.homeLatLng[1])]));
        setRawSchools(new RawSchools(data.updatedSchoolList));
      });
  }, []);

  useEffect(() => {
    let queriedSchools: any[] = rawSchools.data;
    if (searchQuery !== "") {
      queriedSchools = rawSchools.fuse.search(searchQuery).map(res => res.item as any);
    }

    let newSchools = queriedSchools
      .filter((val) => home === null ? true : checkDistance(val))
      .sort((a, b) => home === null ? b.examScore - a.examScore : getDistance(a) - getDistance(b));
    setSchools(newSchools);
  }, [rawSchools, home, maxDist, searchQuery]);

  return (
    <div className="bg-custom-white h-full">
      <Header />


      <div className="flex flex-col lg:flex-row-reverse">
        <Map
          points={schools.map(schoolToPoint)}
          home={home}
        />
        <div className="flex flex-col lg:w-2/3 lg:h-screen">
          <div className="sticky bg-custom-white w-full p-4 z-50 border-b border-custom-blue shadow-md">

            <a href="/form" className="bg-blue-400 rounded-lg text-white p-4 mr-4">Pielāgot meklēšanas kritērijus</a>

            <Input placeholder="meklēt" onChange={e => setSearchQuery(e.target.value)} className="w-60 h-12 mt-4 border border-custom-blue" />
            <div>


              <RangeSlider value={maxDist} callback={(val) => setMaxDist(val)} />
              <div className="columns-2">
                <p className="mb-2 text-left">
                  Maksimālais attālums: {maxDist / 1000} km
                </p>
                <p className="mb-2 text-right">Rezultāti: {schools.length}</p>
              </div>

            </div>
          </div>



          <div className="overflow-scroll">
            <ul>
              {schools?.map((val) => (
                <li
                  key={val.id}
                  className="m-4 border border-custom-blue rounded-md shadow-md flex flex-col"
                >
                  <div className="border-b border-custom-blue p-4 text-xl">{val.name}</div>
                  {val.examScore != null ? <p className="p-4">
                    Centralā eksāmena rezultāts: <span className="text-xl">{val.examScore.toFixed(1)} / 100</span>
                  </p> : <p>Centralizēto eksāmenu rezultāti trūkst.</p>}

                  <StudentTeacherCount studentCount={val.skoleni} teacherCount={val.skolotaji} />

                </li>
              ))
              }
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
