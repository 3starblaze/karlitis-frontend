import './App.css';
import Map from './Map';
import { Menu, Select, Slider } from 'antd';
import * as L from 'leaflet';
import { useEffect, useState } from 'react';
import '/node_modules/leaflet/dist/leaflet.css';
import ExamForm from './ExamForm';
import proj4 from 'proj4';
import RangeSlider from './Slider';

function baseMenuItems() {
  const children = [
    {
      label: "Meklēt",
      href: "#",
    },
    {
      label: "Par mums",
      href: "#",
    },
    {
      label: "Aktualitātes",
      href: "#",
    },
  ];

  return children.map((obj: any) => {
    obj['key'] = obj['label'];
    return obj;
  });
}

function menuItems() {
  let children = baseMenuItems();
  children = children.map((obj) => {
    delete obj['href'];
    return obj;
  });

  return [{
    label: '',
    key: 'menu',
    children: children,
  }];
}

function schoolSelectOptions() {
  const values = ['Rīgas Valsts 1. ģimnāzija', 'Rīgas 1. tālmācības skola', "Rīgas 30. vidusskola"];

  return values.map((val) => ({
    value: val,
    label: val,
  }));
}

function schoolToPoint(school: any) {
  const coords = school.gps;
  coords[0] = Number(coords[0]);
  coords[1] = Number(coords[1]);

  return {
    latLng: coords,
    name: school.name,
  };
}

function getURLParameter(sParamL: string)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParamL) 
        {
            return sParameterName[1];
        }
    }
	return null;
}

function App() {
  const [schoolsRaw, setSchoolsRaw] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [home, setHome] = useState<L.LatLng | null>(null);
  const [maxDist, setMaxDist] = useState<number>(50_000);


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
    // const response = fetch("http://localhost:6942/api/schools/list")
    //       .then((response) => response.json())
    //       .then((data) => {
    //         // console.log(data);
    //       });

		  let formData: {address: string | null, checkedExams: string[]} = {
				address: getURLParameter("address"),
				checkedExams: []
			}

			if(getURLParameter("matematika") !== null) formData.checkedExams.push("matematika");
			if(getURLParameter("latv_val") !== null) formData.checkedExams.push("latv_val");
			if(getURLParameter("anglu_val") !== null) formData.checkedExams.push("anglu_val");
			if(getURLParameter("francu_val") !== null) formData.checkedExams.push("francu_val");
			if(getURLParameter("krievu_val") !== null) formData.checkedExams.push("krievu_val");
			if(getURLParameter("vacu_val") !== null) formData.checkedExams.push("vacu_val");
			if(getURLParameter("biologija") !== null) formData.checkedExams.push("biologija");
			if(getURLParameter("fizika") !== null) formData.checkedExams.push("fizika");
			if(getURLParameter("kimija") !== null) formData.checkedExams.push("kimija");
			if(getURLParameter("vesture") !== null) formData.checkedExams.push("vesture");

			const response = fetch("http://localhost:6942/api/schools/nearby", {
					method: 'POST',
					headers: new Headers({'content-type': 'application/json'}),
					body: JSON.stringify(formData)
				})
				.then((response) => response.json())
				.then((data) => {
					setHome(data.homeLatLang === null ? null : L.latLng([parseFloat(data.homeLatLng[0]), parseFloat(data.homeLatLng[1])]));
					setSchoolsRaw(data.updatedSchoolList);
				});
  }, []);

  useEffect(() => {
	setSchools(schoolsRaw.filter((val) => home === null ? true : checkDistance(val)).sort((a, b) => home === null ? a.examScore - b.examScore : getDistance(a) - getDistance(b)))
  }, [schoolsRaw, home, maxDist]);

  return (
    <div className="bg-custom-white h-full">
      <header
        className="bg-custom-blue shadow-md p-4 flex items-center"
      >
        <a href="#">
          <img
            src="/karlitis_logo-karlitis.png"
            className="h-5"
            alt="Karlitis logo"
          />
        </a>

        {/* Empty space in between */}
        <div className="flex-grow"></div>

        {/* links */}
        <ul className="hidden lg:flex lg:gap-4">
          <li className="text-custom-white"><a href="#">Meklēt</a></li>
          <li className="text-custom-white"><a href="#">Par mums</a></li>
          <li className="text-custom-white"><a href="#">Aktualitātes</a></li>
        </ul>

        <Menu
          className="lg:hidden"
          mode="vertical"
          items={ menuItems() }
        />

      </header>


      <div className="flex flex-col lg:flex-row-reverse">
        <Map
          points={ schools.map(schoolToPoint) }
		  home={ home }
        />
        <div className="flex flex-col lg:w-2/3 lg:h-screen overflow-scroll">
          <div className="fixed bg-custom-white w-full p-4 z-50 border-b border-custom-blue shadow-md">
            { schools?.length } rezultāti
          </div>

          {/* Non-fixed element duplicate is here in order to reserve sapce */}
          <div className="w-full p-4">
            { schools?.length } rezultāti
          </div>


          {/* Card */}
          <div className="m-4 p-4 border border-custom-blue shadow-md">
            <p>Hello there</p>
            <p>This is an example paragraph.</p>
          </div>

		  <div className="m-4 p-4 border border-custom-blue shadow-md">
		  	{/* <ExamForm onSubmit={(formData) => {
				const response = fetch("http://localhost:6942/api/schools/nearby", {
					method: 'POST',
					headers: new Headers({'content-type': 'application/json'}),
					body: JSON.stringify(formData)
				})
				.then((response) => response.json())
				.then((data) => {
					setHome(data.homeLatLang === null ? null : L.latLng([parseFloat(data.homeLatLng[0]), parseFloat(data.homeLatLng[1])]));
					setSchoolsRaw(data.updatedSchoolList);
				});
			}}/> */}
          </div>

          <div className="m-4 p-4 border border-custom-blue shadow-md flex flex-col">
            <p className="mb-2">
              Izvēlies skolu
            </p>
            <Select
              options={ schoolSelectOptions() }
            />
          </div>

          <div>
			 <p className="mb-2">
              Maksimālais attālums
            </p>

			<RangeSlider value={maxDist} callback={(val) => setMaxDist(val)}/>
			
            <ul>
              { schools?.map((val) => (
                <li
                  key={ val.id }
                  className="m-4 border border-custom-blue rounded-md shadow-md flex flex-col"
                >
                  <div className="border-b border-custom-blue p-4 text-xl">{ val.name }</div>
                  <p className="p-4">
                    Centralā eksāmena rezultāts: <span className="text-xl">{ val.examScore }%</span>
                  </p>

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
