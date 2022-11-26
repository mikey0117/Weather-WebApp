import './App.css';
import Header from './pages/header';
import Sidebar from './pages/sidebar';
import Body from './pages/body';
import Footer from './pages/footer';
import { useEffect, useState } from 'react';
import { getLocation } from './pages/utils/process';
import { getGeoReverseCodeData } from './pages/utils/search';

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState(null);

  useEffect(() => {
    const load = async () => {
      setUnitsSystem('imperial');
      const location = await getLocation();
      const details = await getGeoReverseCodeData(location);

      setCurrentLocation({
        id: 0,
        name: details.name,
        state: details.state,
        country: details.country,
        lat: location.lat,
        lon: location.lon,
      });

      setDefaultLocation({
        id: 0,
        name: details.name,
        state: details.state,
        country: details.country,
        lat: location.lat,
        lon: location.lon,
      });
    }

    load();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header setUnitsSystem={setUnitsSystem} defaultLocation={defaultLocation} setCurrentLocation={setCurrentLocation}/>
      </header>

      <section>
        <Sidebar setCurrentLocation={setCurrentLocation} defaultLocation={defaultLocation} currentLocation={currentLocation}/>
        <Body currentLocation={currentLocation} unitsSystem={unitsSystem}/>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
