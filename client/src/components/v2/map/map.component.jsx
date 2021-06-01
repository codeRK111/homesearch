import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from "./location.component";


const Map = ({location, zoomLevel,className}) => {
	console.log({location})
	const defaultLocation = {
		address: 'Bhubaneswar',
		lat: 20.328518,
		lng: 20.328518
	}
	return (
		<div className="map">

			<div className={className}>
				<GoogleMapReact
					bootstrapURLKeys={{key: 'AIzaSyAgS0E2Sa0L4-4b0sFuGRw8oJ5qEuD_TrU'}}
					defaultCenter={defaultLocation}
					defaultZoom={zoomLevel}
				>
					<LocationPin
						lat={location.lat}
						lng={location.lng}
						text={'Test'}
					/>
				</GoogleMapReact>
			</div>
		</div>
	);
};

export default Map