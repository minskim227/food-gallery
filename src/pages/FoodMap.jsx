import { useParams } from "react-router-dom"
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import data from "../data"

function Map(props) {
    return (
        <GoogleMap zoom={20} center={props.center} mapContainerClassName="h-full w-full">
            <Marker position={{lat: props.center.lat, lng: props.center.lng}} />
        </GoogleMap>
    )
}

export default function FoodMap() {
    const foodData = data[useParams().id - 1]
    const {isLoaded} = useLoadScript({googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY})
    const center = foodData.mapPosition ? {lat: foodData.mapPosition[0], lng: foodData.mapPosition[1]} : null

    return (
        <div className="flex h-[calc(100vh-15.5rem)] justify-center">
            <div className="food-box mb-6">
                {foodData.mapPosition ?
                    isLoaded ? <Map center={center} /> : <h2>Loading...</h2>
                :
                    <div className="flex h-full w-full justify-center items-center">
                        <h1 className="text-xl font-bold">No map available</h1>
                    </div>
                }
            </div>
        </div>
    )
}