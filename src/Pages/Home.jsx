
import Card from "../components/Card";
import React, { useState } from "react";



export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value); // Aggiorna lo stato con il valore di ricerca
    };


    return (

        <div className="relative  flex flex-col items-center bg-cyan-900 overflow-hidden ">

            <div className="mt-7 z-[1]">
                <h1 className="flex justify-center text-3xl w-full text-cyan-50">NUOVI GIOCHI</h1>
            </div>
            <div className='max-w-md mx-auto basis-3/5 relative z-[1] container m-auto mt-7'>
                    <div className="relative flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            placeholder="Search something.." 
                            onChange={handleSearch}                          
                            />                           
                    </div>
                </div>
            <div className="flex justify-between  mt-7 mb-7">

                <div className="relative z-[1] container m-auto sm:grid-cols-1">
                    <Card search={searchQuery} />
                </div>

            </div>

            <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#020314] opacity-70"></div>

        </div>
    )

}