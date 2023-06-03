import logo from './logo.svg';
import './App.css';
import Dropdown from  './Dropdown';
import Map from './Map';
import * as L from 'leaflet';
import '/node_modules/leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <header className="bg-white shadow p-4">
        <p className="text-2xl">Kārlītis</p>
      </header>


      <div className="flex flex-col lg:flex-row-reverse">

        {/* Map placeholder */}
        <Map />

        <div className="lg:w-80 lg:h-screen">
          <Dropdown title="Rīgas Pilsētas skola">
            <p>Eksāmena vidējā vērtība:</p>
            <p className="pl-4">9.klase 89.92%</p>
            <p className="pl-4">12.klase 92.73%</p>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default App;
