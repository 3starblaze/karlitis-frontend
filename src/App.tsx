import './App.css';
import Map from './Map';
import { Menu, Select } from 'antd';
import * as L from 'leaflet';
import { useEffect, useState } from 'react';
import '/node_modules/leaflet/dist/leaflet.css';

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


function App() {
  const [schools, setSchools] = useState<any[]>([]);

  useEffect(() => {
    if (schools?.length !== 0) return;
    const response = fetch("http://localhost:6942/api/schools/list")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setSchools(data);
          });
  });

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
        <Map />
        <div className="flex flex-col lg:w-2/3 lg:h-screen overflow-scroll">
          {/* Card */}
          <div className="m-4 p-4 border border-custom-blue shadow-md">
            <p>Hello there</p>
            <p>This is an example paragraph.</p>
          </div>

          <div className="m-4 p-4 border border-custom-blue shadow-md flex flex-col">
            <p className="mb-2">
              Izvēlies skolu
            </p>
            <Select
              options={ schoolSelectOptions() }
            />
          </div>

          <div className="m-4 p-4 border border-custom-blue shadow-md flex flex-col">
            <ul>
              { schools?.map((val) => <li key={ val.id }>{ val.name }</li>) }
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
