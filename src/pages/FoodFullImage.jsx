import { useParams } from "react-router-dom"
import data from "../data"

export default function FoodFullImage() {
    const foodData = data[useParams().id - 1]

    return (
        <div className="flex w-full justify-center">
            <div className="food-box justify-center mb-6">
                <img className="h-screen p-2 rounded-xl" src={foodData.img} />
            </div>
        </div>
    )
}