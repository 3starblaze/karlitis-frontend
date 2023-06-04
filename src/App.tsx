import './App.css';
import Map from './Map';
import { Menu, Select, Input } from 'antd';
import * as L from 'leaflet';
import { useEffect, useState } from 'react';
import '/node_modules/leaflet/dist/leaflet.css';
import Fuse from 'fuse.js';
import { addOptions } from 'sequelize-typescript';

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

function App() {
  const fuseOptions = {
    keys: ['name']
  };
  interface SchoolState {
    allSchools: any[],
    filteredSchools: any[],
    fuse: Fuse<any>,
  }
  const [schools, setSchools] = useState<SchoolState>({ allSchools: [], filteredSchools: [], fuse: new Fuse([], fuseOptions) });

  useEffect(() => {
    if (schools.allSchools.length !== 0) return;
    const response = fetch("http://localhost:6942/api/schools/list")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSchools({ allSchools: data, filteredSchools: data, fuse: new Fuse(data, fuseOptions) });
      });
  });

  const onSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let results = schools.allSchools;
      if (e.target.value !== "")
      results = schools.fuse.search(e.target.value).map(res => res.item);

    setSchools({
      allSchools: schools.allSchools,
      filteredSchools: results,
      fuse: schools.fuse,
    });
  };

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
          items={menuItems()}
        />

      </header>


      <div className="flex flex-col lg:flex-row-reverse">
        <Map
          points={schools.filteredSchools.map(schoolToPoint)}
        />
        <div className="flex flex-col lg:w-2/3 lg:h-screen">
          <div className="sticky bg-custom-white w-full p-4 z-50 border-b border-custom-blue shadow-md">
            {schools.filteredSchools.length} rezultāti
            <Input placeholder="meklēt" onChange={onSearch} style={{ width: 200 }} />
            <div ></div>

          </div>

          <div className="overflow-scroll">

            <div>
              <ul>
                {schools.filteredSchools.map((val) => (
                  <li
                    key={val.id}
                    className="m-4 border border-custom-blue rounded-md shadow-md flex flex-col"
                  >
                    <div className="border-b border-custom-blue p-4 text-xl">{val.name}</div>
                    <p className="p-4">
                      Centralā eksāmena rezultāts: <span className="text-xl">{val.examScore}%</span>
                    </p>

                  </li>
                ))
                }
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
