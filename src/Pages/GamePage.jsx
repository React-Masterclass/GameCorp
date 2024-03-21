import { useLoaderData, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import supabase from '../supabase/client';
import useProfile from '../Hooks/useProfile';
import AppContext from '../contexts/AppContext';
import AppNavbar from '../components/AppNavbar';
import Messages from '../components/Messages';
import Comments from '../components/Comments';

export async function getSingleGame({ params }) {

  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}games/${params.id}?key=${import.meta.env.VITE_API_KEY
    }`
  );
  const json = await response.json(); console.log(json)
  return json;

}

function GamePage() {

  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const game = useLoaderData();
  const [fav, setFav] = useState([]);
  console.log(profile)

  const getFavGame = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {

      alert(error.message);
    } else {
      setFav(() => [...data]);
    }
  };

  const addToFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .insert([
        {
          game_id: game.id,
          game_name: game.name,
        },
      ])
      .select();
    if (error) {

      alert(error.message);
    } else {
      getFavGame();
    }
  };
  const removeFromFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {

      alert(error.message);
    } else {
      getFavGame();
    }
  };


  useEffect(() => {
    if (session) {
      getFavGame();
    }
  }, []);





  return (
    <div className='bg-cyan-900 min-h-screen relative '>
       <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#020314] opacity-70 z-0"></div>
      <AppNavbar />
      <div className="flex overflow-hidden">
        <div className={profile ? "flex justify-center  w-1/3 z-10" : "flex justify-center w-1/2 z-10"}>
          <div className="w-1/2">
            <div className="group overflow-hidden relative shadow-lg rounded-lg min-h-96 flex flex-col justify-end mt-10" style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${game.background_image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              <div className="absolute bg-black flex items-center group-hover:-top-0 group-hover:opacity-100 duration-700 top-full right-0 w-full opacity-0 h-1/2 transition-all" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${game.background_image_additional})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              </div>
              <div className="absolute bg-gradient-to-br duration-700 from-green-800 to-blue-800 text-white block left-0 right-0 top-full text-base h-1/2 w-full opacity-50 transition-all group-hover:top-1/2 group-hover:opacity-100">
                <div className="py-4 text-xs px-7">
                  <div className="text-xl font-bold">{game.name}</div>
                  <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                    <span className="uppercase text-gray-400 whitespace-nowrap text-xs md:text-sm">{game.platforms.map((p) => p.platform.name).join(', ')}:</span>
                  </div>
                  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                    <span className="uppercase text-gray-400 whitespace-nowrap text-xs md:text-sm">Genres:{game.genres.map((p) => p.name).join(', ')}</span>
                  </div>
                  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                    <span className="uppercase text-gray-400 whitespace-nowrap text-xs md:text-sm">All Reviews:</span>
                    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                      <span className="text-positive">Very Positive</span>
                      <span className="text-gray-300">(2,912)</span>
                    </span>
                  </div>
                </div>
                <div className="absolute left-0 pl-3 pt-1">
                  {profile && (
                    <Link to={`/game/${game.id}/comment`}>
                      <button type='button' className="px-4 text-base block text-green-300 rounded-sm border-2 border-opacity-20 bg-gradient-to-b duration-700 from-green-400 to-green-800">
                        Give a comment
                      </button>
                    </Link>
                  )}
                </div>
                <br />
                {profile && (
                  <div className="absolute left-0 pl-3 pt-3">
                    {fav.length !== 0 ? (

                      <button type='button' className="px-4 text-base block text-green-300 rounded-sm border-2 border-opacity-20 bg-gradient-to-b duration-700 from-green-400 to-green-800" onClick={removeFromFavorites}>
                        Remove Favourites
                      </button>

                    ) : (
                      <button type='button' className="px-4 text-base block text-green-300 rounded-sm border-2 border-opacity-20 bg-gradient-to-b duration-700 from-green-400 to-green-800" onClick={addToFavorites}>
                        Add favourites
                      </button>

                    )}</div>)}
              </div>
            </div>
          </div>
        </div>
        <div className={profile ? "flex justify-center w-1/3 z-10" : ""}>
          {profile && (
            <div className="p-10 justify-end">
              <Messages game={game} />
            </div>
          )}
        </div>
        <div className={profile ? "p-10 flex justify-center w-1/3 z-10" : "p-10 flex justify-center w-1/2 z-10"}>
          <Comments game={game} />
        </div>
       
      </div>
    </div>
  );
}

export default GamePage;