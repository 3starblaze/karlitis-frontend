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


function Form() {
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
          {/* Card */}
          <div className="m-4 p-4 border border-custom-blue shadow-md">
            <p>Hello there</p>
            <p>This is an example paragraph.</p>
          </div>

		  <div className="m-4 p-4 border border-custom-blue shadow-md">
			{/**onSubmit={(formData) => {
				const response = fetch("http://localhost:6942/api/schools/nearby", {
					method: 'POST',
					headers: new Headers({'content-type': 'application/json'}),
					body: JSON.stringify(formData)
				})
				.then((response) => response.json())
				.then((data) => {

				});
			}} */}
		  	<ExamForm/>
          </div>
      </div>
    </div>
  );
}

export default Form;
