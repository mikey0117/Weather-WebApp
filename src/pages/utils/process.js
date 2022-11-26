export const getLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      let tempLat = position.coords.latitude;
      let tempLon = position.coords.longitude;

      let data = {lat: tempLat, lon: tempLon};
      resolve(data);
    }, () => {
      reject('ERROR');
      alert('Snippet Needs Your Location');
    }); 
  });
}

const changeTimeZone = (date, timeZone) => {
  if (typeof date === 'stringify') {
    return new Date(
      new Date(date).toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  return new Date(
    date.toLocaleString('en-US', {
      timeZone,
    }),
  )
}

export const getCurrentInfo = (weatherInfo) => {
  let curr = weatherInfo.current;
  let day = weatherInfo.daily[0];

  let sunriseTime = new Date(curr.sunrise * 1000);
  sunriseTime = changeTimeZone(sunriseTime, weatherInfo.timezone);
  sunriseTime = sunriseTime.toLocaleTimeString('default', {hour: '2-digit', minute: '2-digit'});
  let sunsetTime = new Date(curr.sunset * 1000);
  sunsetTime = changeTimeZone(sunsetTime, weatherInfo.timezone);
  sunsetTime = sunsetTime.toLocaleTimeString('default', {hour: '2-digit', minute: '2-digit'});

  return {
    dt: curr.dt,
    sunrise: sunriseTime,
    sunset: sunsetTime,
    temp: curr.temp,
    feels_like: curr.feels_like,
    pressure: curr.pressure,
    humidity: curr.humidity,
    dew_point: curr.dew_point,
    uvi: curr.uvi,
    clouds: curr.clouds,
    precip: day.pop,
    visibility: curr.visibility,
    wind_speed: curr.wind_speed,
    wind_deg: curr.wind_deg,
    weather_id: curr.weather[0].id,
    weather_main: curr.weather[0].main,
    weather_descritpion: curr.weather[0].description,
    weather_icon: curr.weather[0].icon,
  }
}

export const getMinutely = (weatherInfo) => { 
  let rainFlag = 0;
  var rainPopLoop = [];

  for (let i = 0; i < 60; i+=2) {
    const pop = weatherInfo.minutely[i].precipitation;

    if (pop > 0) {
      rainFlag += 2;
      rainPopLoop.push(1); // rain
    } else {
      rainPopLoop.push(0); // no rain
    }
  }

  let rainMssg;
  let noRainCtr = 0;
  let yesRainCtr = 0;

  if (rainFlag === 0) {
    rainMssg = "No precipitation for the next hour";
  } else if (rainFlag === 60) {
    rainMssg = "Precipitation for the next hour";
  } else if (rainFlag > 0 && rainFlag < 60) {
    for (let i = 0; i < rainPopLoop.length; i++) {
      if (rainPopLoop[i] === 0) {
        noRainCtr += 2;
      } else {
        yesRainCtr += 2;
      }
    }

    if (rainPopLoop[0] === 0) {
      rainMssg = "Precipitation starting within the next " + noRainCtr + " minutes"
    } else if (rainPopLoop[0] === 1) {
      rainMssg = "Precipitation ending within the next " + yesRainCtr + " minutes"
    }
  }

  return { rainMssg: rainMssg, rainPopLoop: rainPopLoop };
}

const getFormattedTime = (hour) => {
  var formatted;

  if (hour < 1) {
    formatted = `12 AM`;
  } else if (hour < 12) {
    formatted = `${hour} AM`;
  } else if (hour === 12) {
    formatted = `${hour} PM`;
  } else if (hour > 12 && hour < 24) {
    formatted = `${hour - 12} PM`;
  } else if (hour === 24) {
    formatted = `${hour - 12} AM`;
  }

  return formatted;
}

export const getHourly = (weatherInfo) => {
  let hours = weatherInfo.hourly;
  let hoursData = [];

  for (let i = 0; i < 48; i++) {
    const time = new Date(hours[i].dt * 1000);
    const hour = time.getHours();

    hoursData.push({
      dt: getFormattedTime(hour),
      temp: hours[i].temp,
      feels_like: hours[i].feels_like,
      pressure: hours[i].pressure,
      humidity: hours[i].humidity,
      dew_point: hours[i].dew_point,
      uvi: hours[i].uvi,
      clouds: hours[i].clouds,
      precip: hours[i].pop * 100,
      visibility: hours[i].visibility,
      wind_speed: hours[i].wind_speed,
      wind_deg: hours[i].wind_deg,
      wind_gust: hours[i].wind_gust,
      weather_id: hours[i].weather[0].id,
      weather_main: hours[i].weather[0].main,
      weather_description: hours[i].weather[0].description,
      weather_icon: hours[i].weather[0].icon,
    });
  }

  return hoursData;
}

export const getDaily = (weatherInfo) => {
  let days = weatherInfo.daily;
  let daysData = [];
  var daysNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  for (let i = 0; i < 8; i++) {
    const today = new Date();
    let x = new Date(days[i].dt * 1000);
    var day;
    if (today.toDateString() === x.toDateString()) {
      day = "Today";
    } else {
      day = daysNames[x.getDay()];
    }

    daysData.push({
      dt: day,
      sunrise: days[i].sunrise,
      sunset: days[i].sunset,
      moonrise: days[i].moonrise,
      moonset: days[i].moonset,
      moon_phase: days[i].moon_phase,
      temp_day: days[i].temp.day,
      temp_min: days[i].temp.min,
      temp_max: days[i].temp.max,
      temp_night: days[i].temp.night,
      temp_eve: days[i].temp.eve,
      temp_morn: days[i].temp.morn,
      feels_like_day: days[i].feels_like.day,
      feels_like_night: days[i].feels_like.night,
      feels_like_eve: days[i].feels_like.eve,
      feels_like_morn: days[i].feels_like.morn,
      pressure: days[i].pressure,
      humidity: days[i].humidity,
      dew_point: days[i].dew_point,
      uvi: days[i].uvi,
      clouds: days[i].clouds,
      precip: days[i].pop * 100,
      wind_speed: days[i].wind_speed,
      wind_deg: days[i].wind_deg,
      wind_gust: days[i].wind_gust,
      weather_id: days[i].weather[0].id,
      weather_main: days[i].weather[0].main,
      weather_description: days[i].weather[0].description,
      weather_icon: days[i].weather[0].icon,
    });
  }

  return daysData;
}

const getUVColor = (uvValue) => {
  switch(uvValue){
    case 1:
      return "green";
    case 2:
      return "lime";
    case 3:
      return "yellow";
    case 4:
      return "yellowOrange";
    case 5:
      return "orange";
    case 6:
      return "bloodOrange";
    case 7:
      return "red";
    case 8:
      return "darkRed";
    case 9:
      return "redPink";
    case 10:
      return "pink";
    case 11:
      return "violet";
    default:
      return "violet";
  }
}

export const getUvi = (weatherInfo) => {
  let days = weatherInfo.daily;
  let uviData = [];
  var daysNames = ['M','T','W','T','F','S', 'S'];

  for (let i = 0; i < 8; i++) {
    const today = new Date();
    let x = new Date(days[i].dt * 1000);
    
    var day;
    if (today.toDateString() === x.toDateString()) {
      day = "▲";
    } else {
      day = daysNames[x.getDay()];
    }

    if (Math.round(days[i].uvi) === 0) {
      uviData.push({
        dt: days[i].dt,
        day: day,
        uvi: 1,
        uvColor: getUVColor(1),
      });
    } else {
      uviData.push({
        dt: days[i].dt,
        day: day,
        uvi: Math.round(days[i].uvi),
        uvColor: getUVColor(Math.round(days[i].uvi)),
      });
    }
  }

  return uviData;
}

const getAqiColor = (aqiValue) => {
  if (aqiValue <= 50) {
    return "green";
  } else if (aqiValue >= 51 && aqiValue <= 100) {
    return "yellow";
  } else if (aqiValue >= 101 && aqiValue <= 150) {
    return "orange";
  } else if (aqiValue >= 151 && aqiValue <= 200) {
    return "red";
  } else {
    return "purple";
  }
}

export const getAqiInfo = (aqiInfo) => {
  var ozone = null;
  var pm2_5 = null;
  var pm10 = null;

  // For each current AQI forecast
  for (let i = 0; i < aqiInfo.length; i++) {
    if (aqiInfo[i].ParameterName === "O3") {
      ozone = aqiInfo[i].AQI;
    } else if (aqiInfo[i].ParameterName === "PM2.5") {
      pm2_5 = aqiInfo[i].AQI;
    } else if (aqiInfo[i].ParameterName === "PM10") {
      pm10 = aqiInfo[i].AQI;  
    }
  }

  return {
    overall: (ozone + pm2_5 + pm10) / 3,
    ozone: ozone,
    fine: pm2_5,
    coarse: pm10,
    overallColor: getAqiColor((ozone + pm2_5 + pm10) / 3),
    ozoneColor: getAqiColor(ozone),
    fineColor: getAqiColor(pm2_5),
    coarseColor: getAqiColor(pm10),
  }
}

export const processWeatherAlertData = (alertData, limit) => {
  const features = alertData.features;
  var data = [];
  
  for (let i = 0; i < features.length; i++) {
    data.push({
      "event": features[i].properties.event,
      "effDate": features[i].properties.effective,
      "text": features[i].properties.parameters.NWSheadline[0],
      "instruction": features[i].properties.instruction
    });
  }

  // Sort and limit the results
  const sorted = data.sort((a, b) => {
    var keyA = new Date(a.effDate)
    var keyB = new Date(b.effDate)
    if (keyA < keyB) return 1
    if (keyA > keyB) return -1
    return 0
  }).slice(0, limit)

  return sorted;
}

export const processNpsTodoData = (todoData) => {
  var data = [];

  for (let i = 0; i < todoData.length; i++) {
    const item = todoData[i];
    data.push({
      name: item.title,
      imageUrl: item.images[0].url
    });
  }

  return data;
}

export const processPlacesData = (placesData) => {
  const places_feat = placesData.features;
  var data = [];
  var item = null;

  for (let i = 0; i < places_feat.length; i++) {
    item = places_feat[i].properties
    if (item.name) {
      data.push({
        name: item.name ? item.name : item.street,
        address: item.formatted,
        category: item.categories[Math.floor(Math.random() * item.categories.length)]
      });
    }
  }

  return data;
}

export const processEventsData = (eventsData) => {
  var data = [];
  var item = null;
  
  for (let i = 0; i < eventsData.length; i++) {
    item = eventsData[i]
    data.push({
      name: item.name,
      address: `${item.location.display_address[0]}, ${item.location.display_address[1]}`,
      category: item.category,
      imageUrl: item.image_url
    })
  }

  return data;
}