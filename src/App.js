import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <header className="bg-white shadow p-4">
        <p className="text-2xl">Kārlītis</p>
      </header>

      <div className="flex flex-col lg:flex-row-reverse">

        {/* Map placeholder */}
        <div className="bg-blue-100 h-80 lg:w-full"></div>

        <div className="lg:w-80 lg:h-screen">
          <div className="p-4">
            <h2 className="text-xl mb-4">School info</h2>
            <p>Pirmā piemēra skola</p>
            <p>Eksāmena vidējā vērtība:</p>
            <p className="pl-4">9.klase 89.92%</p>
            <p className="pl-4">12.klase 92.73%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
