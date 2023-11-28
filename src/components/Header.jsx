import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className='flex h-16 items-center p-4 justify-between bg-rose-200 text-gray-800 text-xl font-semibold underline-offset-2'>
            <Link to="/" className='hover:underline'>HOME</Link>
        </header>
    )
}