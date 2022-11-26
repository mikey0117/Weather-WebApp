import axios from 'axios';
import { format } from 'date-fns';
import { getAqiInfo, processWeatherAlertData, processPlacesData, processEventsData, processNpsTodoData } from './process';

const BASE_URL = 'http://localhost:4000';

export const getWeatherData = async (currentLocation, unitSystem) => {
  try {
    const params = {
      lat: currentLocation.lat,
      lon: currentLocation.lon,
      units: unitSystem
    }
    const response = await axios.get(`${BASE_URL}/weather`, { params });
    return response.data;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getAQIData = async (currentLocation) => {
  try {
    const dateFormat = format(new Date(), 'yyyy-MM-dd');
    const params = {
      format: 'application/json',
      latitude: currentLocation.lat,
      longitude: currentLocation.lon,
      date: dateFormat,
      distance: 25
    }
    const response = await axios.get(`${BASE_URL}/airquality`, { params });
    const result = getAqiInfo(response.data);
    return result;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getWeatherAlertData = async (currentLocation) => {
  // TODO: Consider WeatherBit API to get alerts in EU and Israel
  try {
    const response = await axios.get(`${BASE_URL}/alerts?lat=${currentLocation.lat}&lon=${currentLocation.lon}`)
    const result = processWeatherAlertData(response.data, 3)
    
    if (result.length) return result
    return null;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getTodoData = async (currentLocation, radius_meter, limit) => {
  var todo = []
  var places = []
  var events = []

  if (currentLocation.parkCode !== undefined) {
    const nps_resp = await getNpsTodoData(currentLocation, limit);
    todo = processNpsTodoData(nps_resp);
  } else {
    const places_resp = await getPlacesData(currentLocation, radius_meter, limit);
    places = processPlacesData(places_resp);
  }

  // Get events if not enough todo/places
  if ((todo.length + places.length) < limit) {
    const events_resp = await getEventsData(currentLocation, limit - todo.length - places.length);
    events = processEventsData(events_resp.events);
  }

  const finalTodo = [...todo, ...places, ...events]

  return finalTodo;
}

export const getNpsTodoData = async (currentLocation, limit) => {
  try {
    const params = {
      parkCode: currentLocation.parkCode,
      limit: limit
    }
    const response = await axios.get(`${BASE_URL}/nps/todo`, { params });
    const data = response.data.data;
    return data;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getPlacesData = async (currentLocation, radius_meter, limit) => {
  try {
    const params = {
      filter: `circle:${currentLocation.lon},${currentLocation.lat},${radius_meter}`,
      categories: 'activity,entertainment,leisure,natural,national_park,tourism,camping,amenity',
      conditions: 'access',
      lang: 'en',
      limit: limit
    }
    const response = await axios.get(`${BASE_URL}/places`, { params });
    return response.data;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getEventsData = async (currentLocation, limit) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const timestamp = startOfDay / 1000;
    const params = {
      latitude: currentLocation.lat,
      longitude: currentLocation.lon,
      start_date: timestamp,
      sort_on: 'popularity',
      sort_by: 'desc',
      limit: limit
    }
    const response = await axios.get(`${BASE_URL}/events`, { params });
    return response.data;
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }

  return null;
}

export const getGooglePhoto = async (place) => {
  var textInput = '';
  const addr = place.address;

  if (addr === undefined || addr === '' || addr === null) {
    textInput = place.name;
  } else {
    textInput = place.address;
  }

  try {
    const response = await axios.get(`${BASE_URL}/google/find_photo?input=${textInput}`);
    const photo = response.data;
    return photo;
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }

  return null;
}