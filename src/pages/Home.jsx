import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../data"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"

function extractId(filename) {
    const match = filename.match(/(\d+)/)
    return match ? parseInt(match[0]) : null
}

function updateIndices() {
    let randomArray = []
    for (let i = 0; i < 18; i ++) {
        const random = Math.floor(Math.random() * data.length)
        if (!randomArray.includes(random)) {
            randomArray[i] = random
        } else {
            i --
        }
    }
    return randomArray
}

export default function Home() {

    const [randomIndices, setRandomIndieces] = useState(updateIndices())
    const [display, setDisplay] = useState(6)
    
    const randomImages = randomIndices.map((i, index) => {
        while (index >= display && index < display + 6)
        return (
            <Link to={`/gallery/${extractId(data[i].img)}`}>
                <img className="aspect-square rounded-2xl border-4 border-transparent hover:border-green-300" src={data[i].img}/>
            </Link>
        )
    })

    function handleArrows(direction) {
        if (direction === "left") {
            (display > 0 ? setDisplay(prev => prev - 1) : null)
        } else {
            (display < 12 ? setDisplay(prev => prev + 1) : null)
        }
    }
    
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col background">
            <div className="w-full md:w-3/4 lg:w-2/3 m-2 px-8 py-4 flex self-center gap-10">
                <img className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain self-center rounded-xl border-2 border-black" src="images/0 Julian.jpg"/>
                <p className="text-lg">
                    Hello! I love food. Here's a picture of me, enjoying a pie in Julian. I also love taking pictures of food.
                    Click on one of the pictures below to find out more about it, or browse the full gallery of just some of the food pics I've taken recently.</p>
            </div>
            <div className="flex mx-4 my-2 items-center">
                <button className={display <= 0 ? "text-gray-400 cursor-default flex p-4 fixed left-3" : "flex p-4 peer/left fixed left-3"} onClick={() => handleArrows("left")}>
                    <FaAngleDoubleLeft /><FaAngleDoubleLeft />
                </button>
                <button className={display >= 12 ? "text-gray-400 cursor-default flex p-4 fixed right-3" : "flex p-4 peer/right fixed right-3"} onClick={() => handleArrows("right")}>
                    <FaAngleDoubleRight /><FaAngleDoubleRight />
                </button>
                <div className="mx-16 grid grid-cols-6 md:gap-4 lg:gap-10 peer-hover/left:translate-x-2 peer-active/left:translate-x-14 transition peer-hover/right:-translate-x-2 peer-active/right:-translate-x-14">
                    {randomImages}
                </div>
            </div>
            <Link to="/gallery" className="text-5xl self-center rounded-3xl text-white bg-orange-400 mt-6 px-20 pt-4 pb-6
                border-4 border-orange-600 shadow-lg transition hover:translate-x-0.5 hover:translate-y-0.5 z-10
                ">
                    Explore
            </Link>
        </div>
    )
}