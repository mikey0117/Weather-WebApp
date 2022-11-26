import { useState } from 'react';

export default function SavedLocations({ savedLocations, setSavedLocations, setCurrentLocation, defaultLocation, currentLocation }) {
  const [selectedLocation, setSelectedLocation] = useState({name: 'NA', country: 'NA'});

  const handleSelect = (index, name, country) => {
    setSelectedLocation({
      name: name, country: country,
    });
    setCurrentLocation(savedLocations[index])
  };

  const handleDelete = (index) => {
    const newSavedLocations = savedLocations.filter(loc => loc.id !== index);
    var newCurrentLocation = null;

    // Handle if selected location is selected for delete
    // Select the prev saved location relative to it
    // Or, select last saved location if first saved location is deleted
    // Otherwise, select default location
    if (index === currentLocation.id) {
      
      const indexInArray = savedLocations.findIndex(e => e.id === index);

      if (savedLocations.length === 1) {
        newCurrentLocation = defaultLocation;
      } else {
        if (indexInArray === 0) {
          newCurrentLocation = savedLocations[savedLocations.length - 1];
        } else {
          newCurrentLocation = savedLocations[indexInArray - 1];
        }
      }

      setCurrentLocation(newCurrentLocation);
    }

    setSavedLocations(newSavedLocations);
  };
  
  return (
    <div className="saved-area">
      <div className="saved-title">
        <p>Saved Locations</p>
      </div>
      
      <div className="saved-area-mobile">
        {savedLocations && savedLocations.map((location, index) => 
          <div key={index} className="saved-locs" >
            <div className="saved-locs-inner" onClick={() => handleSelect(index, location.name, location.country)}>
              {selectedLocation.name === location.name && selectedLocation.country === location.country && currentLocation.lat !== defaultLocation.lat && currentLocation.lon !== defaultLocation.lat
                ? <>
                    <a className="locationName" style={{color: 'crimson'}}>{location.name}</a>
                    {location.state && 
                      <a className="locationSub" style={{color: 'crimson'}}>{location.state}, {location.country}</a>
                    }
                    {!location.state &&
                      <a className="locationSub" style={{color: 'crimson'}}>{location.country}</a>
                    }
                  </>
                : <>
                    <a className="locationName">{location.name}</a>
                    {location.state && 
                      <a className="locationSub">{location.state}, {location.country}</a>
                    }
                    {!location.state &&
                      <a className="locationSub">{location.country}</a>
                    }
                  </>
              }
            </div>
            <div className="locDelete-body" onClick={() => handleDelete(location.id)} >
              <span className="locDelete-icon fa-solid fa-xmark" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
