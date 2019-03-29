import * as React from "react";
// import { FieldProps } from "formik";
import Geosuggest, { Suggest } from "react-geosuggest";
// import MapWithAMarker from "./map";

import "./geo.css";



import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const google = window.google;


const MapWithAMarker = withGoogleMap(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
));

export class Maps extends React.Component {
    onSuggestSelect = (place: Suggest) => {
        const {
            location: { lat, lng }
        } = place;
        const {
            form: { setValues, values }
        } = this.props;
        setValues({
            ...values,
            latitude: lat,
            longitude: lng
        });
    };

    render() {
        // const {
            // lat:
        //     form: { values } // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        // } = this.props;

        return (
            <div>
                <Geosuggest
                    placeholder="Start typing!"
                    onSuggestSelect={this.onSuggestSelect}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius={20}
                />
                {/* <div>{values.longitude}</div>
                <div>{values.latitude}</div> */}
                <MapWithAMarker
                    containerElement={<div style={{ height: `800px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                
            </div>
        );
    }
}

export default Maps;
