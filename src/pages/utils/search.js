import axios from 'axios';

const BASE_URL = 'http://localhost:4000'

export const getGeoCodeData = async (cityName) => {
	try {
		const response = await axios.get(`${BASE_URL}/geo?q=${cityName}&limit=5`);
		return response.data;
	} catch (err) {
		console.log(`ERROR: ${err.message}`);
	}

	return null;
}

export const getGeoReverseCodeData = async (location) => {
	try {
		const response = await axios.get(`${BASE_URL}/georev?lat=${location.lat}&lon=${location.lon}&limit=1`);
		return response.data[0];
	} catch (err) {
		console.log(`ERROR: ${err.message}`);
	}

	return null;
}

export const getParkData = async (searchValue) => {
  try {
    const response = await axios.get(`${BASE_URL}/parklist?search_value=${searchValue}`);
    return response.data
  } catch (err) {
		console.log(`ERROR: ${err.message}`);
	}

	return null;
}