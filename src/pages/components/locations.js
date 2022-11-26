import AlertBody from "./alertbody";

export default function Locations ({ currentLocation, alertsData }) {
  return (
    <div className="col-sm-6">
      <div className="card locat-info border-0 shadow-sm">
          <div className="card-body">
            <div className="locatTitleBody">
              {!currentLocation.name &&
                <>
                  <p className="locatTitle">Current Location</p>
                </>
              }
              {currentLocation.name &&
                <>
                  <p className="locatTitle">{currentLocation.name}</p>
                  <p className="locatSubtitle">{`${currentLocation.state}, ${currentLocation.country}`}</p>
                </>
              }
            </div>
            <br />
            <div className="alerts">
              {!alertsData && <p>There are no alerts at this time.</p>}
              {alertsData && alertsData.map(alert => (
                <AlertBody
                  key={alert.index}
                  alertDate={alert.effDate}
                  alertText={alert.text}
                />
              ))
              }
            </div>
          </div>
      </div>
    </div>
  )
}