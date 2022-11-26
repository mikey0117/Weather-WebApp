export default function ResultArea({
  searchResults, setSearchResults,
  savedLocations, setSavedLocations,
  setCurrentLocation
}) {
  
  const handleSelect = (index) => {
    const id = savedLocations.length ? savedLocations[savedLocations.length - 1].id + 1 : 1;
    const selectedLocation = searchResults[index]
    const newSavedLocation = {
      id: id,
      name: selectedLocation.name,
      state: selectedLocation.state,
      country: selectedLocation.country,
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
      parkCode: selectedLocation.parkCode
    };

    const savedLocationList = [...savedLocations, newSavedLocation];
    setSavedLocations(savedLocationList);
    setCurrentLocation(newSavedLocation);
    setSearchResults([]);
  };
  
  return (
    <div className="results-area">
      {searchResults && searchResults.map((location, index) => 
          <div className="search-results" key={index}>
            <div
              className="search-results-inner"
              onClick={() => handleSelect(index)}
            >
              <a className="locationName">{location.name}</a>
              {location.state &&
                <a className="locationSub">{location.state}, {location.country}</a>
              }
              {!location.state &&
                <a className="locationSub">{location.country}</a>
              }
            </div>
          </div>
      )}
      {/* handle if no search results */}
    </div>
  )
}
