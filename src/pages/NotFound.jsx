import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col items-center ">
            <h1 className="text-4xl font-bold m-4">Page Not Found</h1>
            <img className="w-1/4" src="/images/bowls.png" />
            <Link to="/" className="text-3xl self-center rounded-3xl text-white bg-orange-400 m-4 px-16 py-4 shadow-md
                transition hover:translate-x-0.5 hover:translate-y-0.5
                ">
                    Return Home
            </Link>
        </div>
    )
}