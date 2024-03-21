
import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/client';
import AppContext from '../contexts/AppContext';
import Avatar from '../components/Avatar';
import AppNavbar from '../components/AppNavbar';

export default function Settings() {
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

    async function updateProfile(event, avatarUrl) {
        event.preventDefault();

        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            // eslint-disable-next-line no-alert
            alert(error.message);
        } else {
            setAvatarUrl(avatarUrl);
        }
        setLoading(false);
    }

    return (
        
        <div>
        <AppNavbar />
        <div className="flex justify-center bg-cyan-900 overflow-hidden relative h-screen">
          <div className="container mx-auto  p-5 z-10 mb-10">
            <div className="md:flex flex-col items-center ">
              <div className="mb-8">
                <div className="image overflow-hidden">
                  <Avatar
                    url={avatar_url}
                    size={150}
                    onUpload={(event, url) => {
                      updateProfile(event, url);
                    }}
                  />
                </div>
              </div>
              <form className="w-full md:w-2/3 mx-auto bg-gray-800 p-3 border-t-4 border-green-400 shadow-lg rounded-lg" onSubmit={updateProfile}>
                <div className="bg-gray-800 p-3 shadow-sm rounded-sm">
                  <div className="text-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="first_name" className="block px-2 py-2 font-semibold border bg-blue-200  rounded-lg ">
                          First name:
                          <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="First name"
                            value={first_name || ''}
                            onChange={(e) => setfirstName(e.target.value)}
                            className="w-full bg-gray-100 px-2 py-2 rounded-lg focus:outline-none"
                          />
                        </label>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="last_name" className="block px-2 py-2 font-semibold border bg-blue-200  rounded-lg ">
                          Last Name:
                          <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Last name"
                            value={last_name || ''}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-gray-100 px-2 py-2 rounded-lg focus:outline-none"
                          />
                        </label>
                      </div>
                      <div className="col-span-2 md:col-span-1 ">
                        <label htmlFor="email" className="block px-2 py-2 font-semibold border bg-blue-200  rounded-lg ">
                          Email:
                          <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={session.user.email}
                            disabled
                            className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                          />
                        </label>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="username" className="block px-4 py-2 font-semibold border bg-blue-200  rounded-lg ">
                          Username:
                          <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg bg-blue-200 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Loading ...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#020314] opacity-70 z-0"></div>
        </div>
      </div>


    );
};