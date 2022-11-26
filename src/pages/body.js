import Conditions from './components/conditions';
import Locations from './components/locations';
import Activities from './components/activities';
import Details from './components/details';
import Forecasts from './components/forecasts';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { getAQIData, getTodoData, getWeatherAlertData, getWeatherData } from './utils/ingest';

export default function Body({currentLocation, unitsSystem}) {
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);
  const [todoData, setTodoData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const newWeatherData = await getWeatherData(currentLocation, unitsSystem);
      setWeatherData(newWeatherData);
    };

    const fetchAqiData = async () => {
      const newAqiData = await getAQIData(currentLocation);
      setAqiData(newAqiData);
    };

    const fetchAlertsData = async () => {
      const newAlertsData = await getWeatherAlertData(currentLocation);
      setAlertsData(newAlertsData);
    }

    const fetchTodoData = async () => {
      const newTodoData = await getTodoData(currentLocation, 5000, 5);
      setTodoData(newTodoData);
    }
    
    fetchWeatherData();
    fetchAqiData();
    fetchAlertsData();
    fetchTodoData();
  }, [currentLocation, unitsSystem]);

  return (
    <div className="showcase">
      <div className="content">
        <div className="main-body">
          {!currentLocation &&
            <ReactLoading type={'spinningBubbles'} color={'#56BFB5'} height={200} width={200} />
          }
          {currentLocation && weatherData && 
            <div className="container-fluid mt-4">
              <div className="row d-flex mainBody">
                <Conditions 
                  weatherData={weatherData} 
                  unitsSystem={unitsSystem}
                />
                
                <Locations
                  currentLocation={currentLocation}
                  alertsData={alertsData}
                />
                
                <Activities todoData={todoData} />
                
                <Details 
                  weatherData={weatherData} 
                  aqiData={aqiData}
                />
                
                <Forecasts 
                  weatherData={weatherData} 
                  unitsSystem={unitsSystem}
                />
              </div>
              <div className="tempFiller"/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}