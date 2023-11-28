import { Link, useSearchParams } from 'react-router-dom'
import data from "../data.js"

function extractId(filename) {
    const match = filename.match(/(\d+)/)
    return match ? parseInt(match[0]) : null
}


export default function Gallery() {
    
    const [searchParams, setSearchParams] = useSearchParams()
    
    const tagsFilter = searchParams.get("tags")
    const countryFilter = searchParams.get("country")
    
    const filteredByTags = tagsFilter ? handleTags() : null
    const filteredbyCountry = countryFilter ? data.filter(food => food.country.toLowerCase() === countryFilter) : null
    
    const filteredFood = filteredByTags || filteredbyCountry ? handleFilter(filteredByTags, filteredbyCountry) : data
    
    function handleTags() {
        if (tagsFilter.includes("-")) {
            const array = tagsFilter.split("-")
            const capitalized = array.map(el => el.charAt(0).toUpperCase() + el.slice(1))
            return data.filter(food => food.tags.some(tag => capitalized.includes(tag)))
        } else {
            const capitalized = tagsFilter.charAt(0).toUpperCase() + tagsFilter.slice(1)
            return data.filter(food => food.tags.includes(capitalized))
        }
    }
    
    function handleFilter(byTags, byCountry) {
        if (byTags && byCountry) {
            return byTags.filter(food => {
                return food.country.toLowerCase() === countryFilter
            })
        } else {
            if (!byTags) {
                return byCountry
            } else {
                return byTags
            }
        }
    }
    
    function RestaurantCard(props) {
        return (
            <div className="p-2 m-4 group relative">
                <Link to={`./${props.id}`} state={{ search: searchParams.toString() }}>
                    <img className="aspect-square rounded-2xl border-4 border-transparent hover:border-green-300" src={props.img} />
                </Link>
                <h3 className="absolute left-1/2 -translate-y-10 -translate-x-1/2 w-full text-center font-bold pt-1
                    opacity-0 transition group-hover:opacity-100 group-hover:translate-y-0"
                >
                    {props.dish || `${props.meal} at ${props.primaryName || props.secondaryName}`}
                </h3>
            </div>
        )
    }

    const foodEls = filteredFood.map(el => {
        return (
            <div>
                <RestaurantCard
                    key={extractId(el.img)}
                    id={extractId(el.img)}
                    primaryName={el.primaryName || null}
                    secondaryName={el.secondaryName || null}
                    dish={el.dish || null}
                    meal={el.meal || null}
                    img={el.img}
                />
            </div>
        )
    })

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value) {
                prevParams.set(key, value)
            } else {
                prevParams.delete(key)
            }
            return prevParams
        })
    }

    function handleTagsChange(tag) {
        setSearchParams(prevParams => {
            if (tagsFilter === tag) {
                prevParams.delete("tags")
            } else {
                if (!tagsFilter) {
                    prevParams.set("tags", tag)
                } else {
                    if (tagsFilter.includes(`-${tag}`)) {
                        prevParams.set("tags", tagsFilter.replace(`-${tag}`, ""))
                    } else if (tagsFilter.includes(`${tag}-`)) {
                        prevParams.set("tags", tagsFilter.replace(`${tag}-`, ""))
                    }
                    else {
                        prevParams.set("tags", tagsFilter + `-${tag}`)
                    }
                }
            }
            return prevParams
        })
    }

    function compileTags() {
        let tagsArray = []
        data.forEach(food => {
            food.tags.forEach(tag => {
                if (!tagsArray.includes(tag)) {
                    tagsArray.push(tag)
                }
            })
        })
        return tagsArray.sort()
    }

    const tags = compileTags().map(tag => {
        return (
            <h4 className={tagsFilter && tagsFilter.includes(tag.toLowerCase()) ? tag : "tag"} onClick={() => {handleTagsChange(tag.toLowerCase())}}>
                {tag}
            </h4>
        )
    })

    return (
        <div className='py-4 background'>
            <div className='flex gap-4 mx-8 mb-4 items-center flex-wrap'>
                <h2 className='text-xl'>Tags: </h2>
                {tags}
                {searchParams.get("tags") &&
                    <button className='text-lg px-2 py-1 text-blue-600 hover:underline underline-offset-2'
                    onClick={() => {handleFilterChange("tags", null)}}>clear</button>
                }
            </div>
            <div className='flex gap-4 mx-8 mt-4 items-center'>
                <h2 className='text-xl'>Eaten in: </h2>
                <img className={`${countryFilter === "korea" ? "border-2 country-filter" : "country-filter" }`}
                    onClick={() => {handleFilterChange("country", "korea")}} src='/images/South Korea.png'
                />
                <img className={`${countryFilter === "taiwan" ? "border-2 country-filter" : "country-filter" }`}
                    onClick={() => {handleFilterChange("country", "taiwan")}} src='/images/Taiwan.png'
                />
                <img className={`${countryFilter === "us" ? "border-2 country-filter" : "country-filter" }`}
                    onClick={() => {handleFilterChange("country", "us")}} src='/images/United States of America.png'
                />
                {searchParams.get("country") &&
                    <button className='text-lg px-2 py-1 text-blue-600 hover:underline underline-offset-2'
                    onClick={() => {handleFilterChange("country", null)}}>clear</button>
                }
            </div>
            {foodEls[0] ?
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-4 gap-4">
                    {foodEls}
                </div>
                :
                <h2 className='text-2xl text-center py-16'>There's nothing here! Try changing the tags.</h2>
            }
        </div>
    )
}