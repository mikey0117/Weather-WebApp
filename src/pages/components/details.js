import React from 'react';
import ReactLoading from 'react-loading';
import { getUvi, getMinutely } from '../utils/process';
import SunIcon from '../assets/images/UVIsun.png';

export default function Details({weatherData, aqiData}) {
  const minutelyInfo = getMinutely(weatherData);
  const uviInfo = getUvi(weatherData);

  return (
    <div className="col-sm-12">
      <div className="card w-100 text-center mt-4 cond-details border-0 shadow-sm">
        {!aqiData && minutelyInfo && uviInfo &&
          <ReactLoading type={'spinningBubbles'} color={'#56BFB5'} height={50} width={50} />
        }
        {aqiData && minutelyInfo && uviInfo &&
          <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item navItemCustom" role="presentation">
                <button className="nav-link active navLinkCustom" id="aqi-tab" data-bs-toggle="tab" data-bs-target="#aqi-tab-pane" type="button" role="tab" aria-controls="aqi-tab-pane" aria-selected="true">AQI</button>
              </li>
              <li className="nav-item navItemCustom" role="presentation">
                <button className="nav-link navLinkCustom" id="precip-tab" data-bs-toggle="tab" data-bs-target="#precip-tab-pane" type="button" role="tab" aria-controls="precip-tab-pane" aria-selected="false">Precipitation</button>
              </li>
              <li className="nav-item navItemCustom" role="presentation">
                <button className="nav-link navLinkCustom" id="uvi-tab" data-bs-toggle="tab" data-bs-target="#uvi-tab-pane" type="button" role="tab" aria-controls="uvi-tab-pane" aria-selected="false">UV Index</button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade aqi-tab show active" id="aqi-tab-pane" role="tabpanel" aria-labelledby="aqi-tab" tabindex="0">
                <p className="detailsTitle">Current Air Quality</p>
                <div className="aqiBody detailsBody">
                  <div className={"aqiRing-" + aqiData.overallColor}>
                    <p className="aqiGenValue">{Math.round(aqiData.overall)}</p>
                    <p className="aqiGenTitle">AQI</p>
                  </div>
                  <div className="aqiSubValuesBody">
                    <div className="aqiSubTitles">
                      <p>Ozone:</p>
                      <p>Fine Matter:</p>
                      <p>Coarse Matter:</p>
                    </div>
                    <div className="aqiSubValues">
                      <p className={"aqiSubValue-" + aqiData.ozoneColor}>{Math.round(aqiData.ozone)}</p>
                      <p className={"aqiSubValue-" + aqiData.fineColor}>{Math.round(aqiData.fine)}</p>
                      <p className={"aqiSubValue-" + aqiData.coarseColor}>{Math.round(aqiData.coarse)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="precip-tab-pane" role="tabpanel" aria-labelledby="precip-tab" tabindex="0">
                <p className="detailsTitle">Current Precipitation</p>
                <div className="precipBody detailsBody">
                  <p className="precipMssg">{minutelyInfo.rainMssg}</p>
                  <div className="precipBubbles">
                    {minutelyInfo.rainPopLoop && minutelyInfo.rainPopLoop.map((bar, i) => 
                      <div key={i}>
                        {bar > 0 &&
                          <div className="rainBoxesTrue"/>
                        }
                        {bar === 0 &&
                          <div className="rainBoxes"/>
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="uvi-tab-pane" role="tabpanel" aria-labelledby="uvi-tab" tabindex="0">
                  <p className="detailsTitle">This Week's UV Outlook</p>
                  <div className="uvBody detailsBody">
                    <div className="uvBlocks">
                      {uviInfo && uviInfo.map((block, i) =>
                        <div key={i} className="uvBlock">
                          {i === 0 &&
                            <>
                              <p className="uvDetailsText">{block.uvi}</p>
                              <img src={SunIcon} className="uvIcon" alt="..." />
                              <div className={"shadow-sm uvBar-" + block.uvColor}/>
                              <p className="uvDetailsText-red">{block.day}</p>
                            </>
                          }
                          {i > 0 &&
                            <>
                              <p className="uvDetailsText">{block.uvi}</p>
                              <img src={SunIcon} className="uvIcon" alt="..." />
                              <div className={"shadow-sm uvBar-" + block.uvColor}/>
                              <p className="uvDetailsText">{block.day}</p>
                            </>
                          }
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