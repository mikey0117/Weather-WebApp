import SearchBox from "./components/searchbox";
import ResultArea from "./components/resultarea";
import SavedLocations from "./components/savedlocations";
import { getGeoCodeData, getParkData } from "./utils/search";
import { useEffect, useState } from 'react';

export default function Sidebar({ setCurrentLocation, defaultLocation, currentLocation }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem('savedLocations')) || []
  );

  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const geo_response = await getGeoCodeData(searchValue);
      const np_response = await getParkData(searchValue);
      
      // Process np_response to be the same structure as geo_response
      const np_processed = np_response.map(item => {
        return {
          name: item.name,
          lat: item.latitude,
          lon: item.longitude,
          parkCode: item.parkCode,
          state: item.stateName,
          country: 'US'
        }
      });

      const results = [...np_processed, ...geo_response];
      
      setSearchResults(results);
      setSearchValue('');
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  };

  return (
    <div className="sidebar">
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSubmit={handleSubmit}
        />
        <ResultArea
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          savedLocations={savedLocations}
          setSavedLocations={setSavedLocations}
          setCurrentLocation={setCurrentLocation}
        />
        
        <div className="sidebar-divider" />

        <SavedLocations
          savedLocations={savedLocations}
          setSavedLocations={setSavedLocations}
          setCurrentLocation={setCurrentLocation}
          defaultLocation={defaultLocation}
          currentLocation={currentLocation}
        />
    </div>
  )
}