import { useState, useEffect, useContext } from 'react';
import useProfile from '../Hooks/useProfile';
import supabase from '../supabase/client';
import AppContext from '../contexts/AppContext';
import getProfileImg from '../Utils/getprofileImg';
import AppNavbar from '../components/AppNavbar';
import Avatar from '../components/Avatar';

function Account() {


  const { profile } = useProfile();
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { session } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setfirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name, avatar_url`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setfirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  useEffect(() => {
    const getFav = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('profile_id', session.user.id);
      if (error) {
        alert(error.message);
      } else {
        setFavorites(data);
      }
    };
    getFav();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('profile_id', session.user.id);
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        setComments(data);
      }
    };
    getComments();
  }, []);


  return (

    <div className="bg-gray-900 min-h-screen">
      
      <AppNavbar />
      <section id="user" className="flex justify-center bg-cyan-900 overflow-hidden relative">
        <div className="container mx-auto my-5 p-5 z-10">
          <div className="md:flex flex-col items-center">
            <div className="mb-8">
              <img
                className="inline rounded-full"
                src={profile && getProfileImg(profile.avatar_url)}
                alt="profile"
                style={{
                  height: 300,
                  width: 300,
                  boxShadow: '1px 1px 10px #030405',
                }}
              />
            </div>
            <form className="w-full md:w-2/3 mx-auto bg-gray-800  p-3 border-t-4 border-green-400 shadow-lg rounded-lg">
              <div className="bg-gray-800  p-3 shadow-sm rounded-sm">
                <div className="text-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="last_name" className="block px-2 py-2 font-semibold border bg-blue-200">
                        First name : {first_name}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="last_name" className="block px-2 py-2 font-semibold border bg-blue-200">
                        Last Name : {last_name}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="email" className="block px-2 py-2 font-semibold border bg-blue-200">
                        Email: {session.user.email}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="username" className="block px-2 py-2 font-semibold border bg-blue-200">
                        Username : {username}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#020314] opacity-70 z-0"></div>
      </section>

      <div className="flex justify-center gap-4 mt-8 max-h-80">
        <div className="flex flex-col max-w-96 max-h-96 ">
          <div className="bg-cyan-900 p-4 text-white text-center">
            <h2>My favourites</h2>
          </div>

          <div className="bg-gray-800 p-2 rounded-lg mt-5">
            <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">

              {favorites &&
                favorites.map((favGame) => (
                  <div key={favGame.id}><li>{favGame.game_name}</li></div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col ml-6 max-w-96 max-h-80 mb-10">
          <div className="bg-cyan-900 p-4 text-white text-center">
            <h2>My review</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {comments.map((c) => (
              <div key={c.id} className="bg-gray-800 rounded-lg p-4 mt-4">
                <div className="flex justify-end">
                  <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs" style={{ wordWrap: 'break-word' }}>
                    <ul>
                      {c.game_name} <br />{c.comment_title}: {c.comment_content}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>


  )
}

export default Account;