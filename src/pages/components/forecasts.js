import ReactLoading from 'react-loading';
import { getHourly, getDaily } from '../utils/process';

export default function Forecasts({weatherData, unitsSystem}) {
  let hourlyInfo = getHourly(weatherData);
  let dailyInfo = getDaily(weatherData);

  return (
    <div className="col-sm-12">
      <div className="card w-100 text-center mt-4 cond-details border-0 shadow-sm">
        {!hourlyInfo && dailyInfo &&
          <ReactLoading type={'spinningBubbles'} color={'#56BFB5'} height={50} width={50} />
        }
        {hourlyInfo && dailyInfo &&
          <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item navItemCustom" role="presentation">
                <button className="nav-link active navLinkCustom" id="horuly-tab" data-bs-toggle="tab" data-bs-target="#horuly-tab-pane" type="button" role="tab" aria-controls="horuly-tab-pane" aria-selected="true">48-Hour</button>
              </li>
              <li className="nav-item navItemCustom" role="presentation">
                <button className="nav-link navLinkCustom" id="daily-tab" data-bs-toggle="tab" data-bs-target="#daily-tab-pane" type="button" role="tab" aria-controls="daily-tab-pane" aria-selected="false">7-Day</button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="horuly-tab-pane" role="tabpanel" aria-labelledby="horuly-tab" tabindex="0">
                <p className="foreTitle">48 Hour Forecast</p>
                <div className="hourlyBody foreBody">
                  <div className="scrollContainer">
                    {hourlyInfo && 
                      hourlyInfo.map((fore, i) => 
                      <div key={i} className="boxes shadow-sm">
                        <p className="hourlyDetails hourlytime">{fore.dt}</p>
                        <img 
                          src={`https://openweathermap.org/img/wn/${fore.weather_icon}@2x.png`} 
                          className="weather-icon-hourly" 
                          alt="..."
                        />
                        {unitsSystem === 'imperial'
                          ? <p className="hourlyDetails hourlyTemp">{Math.round(fore.temp)}°F</p>
                          : <p className="hourlyDetails hourlyTemp">{Math.round(fore.temp)}°C</p>
                        }
                        <p className="hourlyDetails hourlyPop">{Math.round(fore.precip)}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="daily-tab-pane" role="tabpanel" aria-labelledby="daily-tab" tabindex="0">
                <p className="foreTitle">7 Day Forcast</p>
                <div className="dailyBody foreBody">
                  <div className="scrollContainer">
                    {dailyInfo && 
                      dailyInfo.map((fore, i) => 
                      <div key={i} className="outBoxes">  
                        <p className="dailyDetails dailytime">{fore.dt}</p>
                        <div className="boxes shadow-sm">
                          <img 
                            src={`https://openweathermap.org/img/wn/${fore.weather_icon}@2x.png`} 
                            className="weather-icon-daily" 
                            alt="..."
                          />
                          {unitsSystem === 'imperial'
                            ? <p className="dailyDetails dailyTemp">{Math.round(fore.temp_max)}°F</p>
                            : <p className="dailyDetails dailyTemp">{Math.round(fore.temp_max)}°C</p>
                          }
                          <div className="maxBar"/>
                          <div className="minBar"/>
                          {unitsSystem === 'imperial'
                            ? <p className="dailyDetails dailyTemp">{Math.round(fore.temp_min)}°F</p>
                            : <p className="dailyDetails dailyTemp">{Math.round(fore.temp_min)}°C</p>
                          }
                          <p className="dailyDetails dailyPop">{Math.round(fore.precip)}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}