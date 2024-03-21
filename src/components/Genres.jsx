

import { Link } from "react-router-dom";

export default function Genres({ genres }) {
    return (
        <div>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>
                        <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}