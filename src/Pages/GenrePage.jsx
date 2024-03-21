import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";






export default function GenrePage() {
    const { genre } = useParams();
   const [genreGames, setGenreGames] = useState([])

    useEffect(() => {
        async function getGenre() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre}&page_size=21`);
            const json = await response.json();
            setGenreGames(json.results);
        }
        getGenre();
    }, [genre])

    return (
        <div className="relative  flex flex-col items-center overflow-hidden ">
                <div className="mt-7 z-[1]">
                <h1 className="flex justify-center text-3xl w-full text-cyan-50">{genre} Games</h1>
            </div>
            
        <div className="grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-7">
            

            {genreGames && genreGames.map((game) => (
                 <Link to={`/game/${game.id}`}>
                <article className=" rounded-lg bg-white text-grey-700 p-3 shadow-lg min-h-80  flex flex-col justify-end" key={game.id}
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),  url(${game.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>

                    <h4 className="font-bold text-lg mb-2 text-cyan-50 z-10 relative">{game.name}</h4>
                </article>
                </Link>

            ))}

        </div>
        </div>
    )
}