import React, { use, useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

    const navigate = useNavigate();
    const [input,setInput] = useState(data? data : '');

    const onSearchHandler = (e) =>{
        e.preventDefault()
        navigate('/course-list/'+ input)
    }

    return (
        <form onSubmit={onSearchHandler} className="flex items-center w-full md:w-auto max-w-2xl mx-auto space-x-4">

            <div className="relative w-full md:w-96">
                <img
                    src={assets.search_icon}
                    alt="search_icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
                />

                <input onChange={e=>setInput(e.target.value)} value={input}
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-700 transition-all duration-200 cursor-pointer"
            >
                Search
            </button>

        </form>


    )
}

export default SearchBar