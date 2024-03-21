import Genres from "./Genres";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";



export async function getGenres(){

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY}`);
        const json = await response.json();
        return json.results;
    

}

export default function AppSidebar() {


    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const fetchedGenres = await getGenres();
                setGenres(fetchedGenres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        }

        fetchGenres();
    }, []);



    return (
        <div className="md:flex flex-col  w-full ">
            <div className="flex flex-col w-full md:w-64 text-cyan-50  bg-gray-900 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
                
                <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto" style={{ height: "calc(100vh - 3.5rem)" }}>
                {genres.map(genre => (
                    
                        <Link key={genre.id} to={`/games/${genre.slug}`} className="block px-4 py-2 mt-2 text-sm font-semibold text-cyan-50 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">{genre.name}</Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}

