import ReactLoading from 'react-loading';

export default function Header({setUnitsSystem, defaultLocation, setCurrentLocation}) {
    return (
        <div className="head">
            <nav className="navbar fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">S N I P P E T</a>

                    <div className="headerBtns">
                        {!defaultLocation &&
                            <ReactLoading type={'spinningBubbles'} color={'#56BFB5'} height={30} width={30} />
                        }
                        {defaultLocation &&
                            <>
                                <div className="defaultLocBtn-full shadow-sm"  onClick={() => {
                                    setCurrentLocation(defaultLocation); // reset location to devices current
                                }}>
                                    <span className="defaultLocBtn-text-full fa-solid fa-location-crosshairs"/>  
                                    <span className="defaultLocBtn-locText-full">{defaultLocation.name}</span>
                                </div>
                                <div className="defaultLocBtn-mobile shadow-sm"  onClick={() => {
                                    setCurrentLocation(defaultLocation); // reset location to devices current
                                }}>
                                    <span className="defaultLocBtn-text-mobile fa-solid fa-location-crosshairs"/>  
                                </div>
                            </>
                        }
                        <div className="currUnitBtn shadow-sm">
                            <p className="currUnitBtn-text" onClick={() => {
                                setUnitsSystem('imperial'); // invert unitsSystem flag
                            }}>F</p>
                            <p className="currUnitBtn-text" onClick={() => {
                                setUnitsSystem('metric'); // invert unitsSystem flag
                            }}>C</p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}