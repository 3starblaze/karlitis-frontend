import './App.css';
import Dropdown from  './Dropdown';
import Map from './Map';
import { Menu } from 'antd';
import * as L from 'leaflet';
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


function App() {
  return (
    <div className="bg-custom-white h-screen">
      <header
        className="bg-[#213458] shadow-md p-4 flex items-center"
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
        <div className="lg:w-2/3 lg:h-screen">
          <Dropdown title="Rīgas Pilsētas skola">
            <p>Eksāmena vidējā vērtība:</p>
            <p className="pl-4">9.klase 89.92%</p>
            <p className="pl-4">12.klase 92.73%</p>
          </Dropdown>

          {/* Card */}
          <div className="m-4 p-4 border border-blue-300 shadow-md">
            <p>Hello there</p>
            <p>This is an example paragraph.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
