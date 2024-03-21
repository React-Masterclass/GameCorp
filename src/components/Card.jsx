import { useEffect, useState } from "react";
import useDebounceSearch from '../Hooks/useDebounceSearch';
import { Link } from "react-router-dom";

export default function Card({ search }) {
    const [games, setGames] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
   
    const debouncedSearch = useDebounceSearch(search);

    useEffect(() => {
        async function fetchData() {
            setGames([]);
            setError('');
            setLoading(true);
            
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=1&page_size=21&search=${search}`);
                if (response.ok) {
                    const json = await response.json();
                    setGames(json.results);
                } else {
                    setError('Ops, Riprova');
                }
            } catch (error) {
                setError('Ops, Riprova');
            }
            setLoading(false);
        } 
        fetchData();
    }, [debouncedSearch]);

    return (
        <div className="grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {games && games.map((game) => (
                <Link key={game.id} to={`/game/${game.id}`}>
                    <article className="rounded-lg bg-white text-grey-700 p-3 shadow-lg min-h-80 flex flex-col justify-end" style={{ 
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),  url(${game.background_image})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center', 
                    }}>
                        <h4 className="font-bold text-lg mb-2 text-cyan-50 z-10 relative">{game.name}</h4>
                    </article>
                </Link>
            ))}
        </div>
    );
}
