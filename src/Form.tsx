import './App.css';
import Map from './Map';
import { Menu, Select, Slider } from 'antd';
import * as L from 'leaflet';
import { useEffect, useState } from 'react';
import '/node_modules/leaflet/dist/leaflet.css';
import ExamForm from './ExamForm';
import proj4 from 'proj4';
import RangeSlider from './Slider';
import Header from './Header';

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
     
    <Header />

      <div className="flex flex-col lg:flex-col">

        <div className="m-4 p-4 border-2 border-custom-blue shadow-md">
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
          <ExamForm />
        </div>
      </div>
    </div>
  );
}

export default Form;
