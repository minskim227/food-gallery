import { Link, useParams } from "react-router-dom"
import data from "../data"

export default function Food() {
    const foodData = data[useParams().id - 1]

    const displayInfo = (
        <div>
            {foodData.dish ? (
                <>
                    <div className="text-3xl font-bold py-2">
                        {foodData.dish}
                    </div>
                    {foodData.primaryName && <span>
                        from
                    </span>}
                </>
            ) : (
                <>
                    <div className="text-xl font-bold py-2">
                        {foodData.meal}
                    </div>
                    <span>
                        at
                    </span>
                </>
            )}
            {foodData.secondaryName ? (
                <div>
                    <h1 className="text-3xl font-bold pt-2">
                        {foodData.secondaryName}
                    </h1>
                    <span className="text-sm">
                        {`(${foodData.primaryName})`}
                    </span>
                </div>
            ) : (
                <h1 className="text-3xl font-bold py-2">{foodData.primaryName}</h1>
            )}
        </div>
    )

    const tags = foodData.tags.map(tag => {
        return (
            <Link to={`../gallery?tags=${tag.toLowerCase()}`} className={`${tag} font-bold px-2 py-1 hover:underline underline-offset-2 cursor-pointer border-2`}>
                {tag}
            </Link>
        )
    })

    const displayFlag = (
        foodData.country === "US" ? 
            <Link to={`../gallery?country=us`}><img src="/images/United States of America.png"/></Link> :
        foodData.country === "Taiwan" ?
            <Link to={`../gallery?country=taiwan`}><img src="/images/Taiwan.png"/></Link> :
        <Link to={`../gallery?country=korea`}><img src="/images/South Korea.png"/></Link>
    )

    return (
        <div className="flex h-[calc(100vh-15.5rem)] w-full justify-center">
            <div className="food-box h-2/3 min-h-[16rem]">
                <img className="aspect-square rounded-2xl p-2 w-1/3" src={foodData.img} />
                <div className="flex flex-col justify-between h-full w-2/3 text-center">
                    <div>
                        {displayInfo}
                        <h3 className="text-lg py-2">{`${foodData.city}, ${foodData.country}`}</h3>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                        <h3 className="text-xl">Tags: </h3>
                        <span className="flex gap-2">{tags}</span>
                        <div className="ml-4">
                            {displayFlag}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}