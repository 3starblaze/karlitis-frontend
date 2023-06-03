import './App.css';
import Dropdown from  './Dropdown';
import Map from './Map';
import * as L from 'leaflet';
import '/node_modules/leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <header className="bg-[#213458] shadow p-4">
        <img
          src="/karlitis_logo-karlitis.png"
          className="h-5"
          alt="Karlitis logo"
        />
      </header>


      <div className="flex flex-col lg:flex-row-reverse">

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
