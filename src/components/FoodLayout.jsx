import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom"
import data from "../data"

export default function FoodLayout() {
    const foodData = data[useParams().id - 1]

    const location = useLocation()
    const search = location.state?.search || ""

    const inactive = "w-1/2 p-1 text-center border-2 border-black rounded-t-2xl hover:underline bg-white"
    return (
        <div className="background">
            <Link to={`../gallery?${search}`} className="inline-block p-4 text-lg underline underline-offset-2 hover:text-green-600">Back to Gallery</Link>
            <div className="flex justify-center">
                <nav className="flex w-5/6 md:w-2/3 mt-5 text-xl underline-offset-2">
                    <NavLink to="." state={{ search: search }} end className={({isActive}) => isActive ? `${inactive} font-bold` : inactive}>Details</NavLink>
                    <NavLink to="fullimage" state={{ search: search }} end className={({isActive}) => isActive ? `${inactive} font-bold` : inactive}>Full Image</NavLink>
                    {foodData.mapPosition ? 
                        <NavLink to="map" state={{ search: search }} className={({isActive}) => isActive ? `${inactive} font-bold` : inactive}>Map</NavLink>
                        :
                        <h2 className="w-1/2 p-1 text-center border-2 text-stone-500 border-black rounded-t-2xl bg-white">Map</h2>
                    }
                </nav>
            </div>
            <Outlet />
        </div>
    )
}