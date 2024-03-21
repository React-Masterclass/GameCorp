import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProfile from '../Hooks/useProfile';
import AppContext from '../contexts/AppContext';
import supabase from '../supabase/client';



export default function AppNavbar() {
    const { session } = useContext(AppContext);
    const { profile } = useProfile();
    const navigate = useNavigate();



    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };




    return (

        <nav className="relative flex flex-col items-center bg-cyan-700 p-5 max-h-30 container ">
  <div className="flex flex-col lg:flex-row justify-between container mx-auto">
    <div className="basis-1/5 mb-4 lg:mb-0 text-center lg:text-left">
      <h1 className="text-3xl text-cyan-50">
        <Link to={'/'}>GAMECORP</Link>
      </h1>
    </div>
    <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end lg:order-2">
      {session && session.user ? (
        
        <select
          className="outline-none focus:outline-none p-2 bg-white rounded-3xl"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "account") {
              navigate("/account");
            } else if (value === "settings") {
              navigate("/settings");
            } else if (value === "signout") {
              handleSignOut();
            }
          }}
          value={profile &&
            ( profile.username||session.user.email )}
        >
          <option disabled>{profile &&
                  ( profile.username|| session.user.email)}</option>
          <option value="account">Account page</option>
          <option value="settings">Settings page</option>
          <option value="signout">Sign Out</option>
        </select>
      ) : (
        <ul className="flex justify-center lg:justify-end">
          <li className="text-1xl text-cyan-50 lg:ml-0"><Link to={'/login'}>Login</Link></li>
          <li className="ml-4 text-1xl text-cyan-50 lg:ml-4"><Link to={'/register'}>Register</Link></li>
        </ul>
      )}
    </div>
  </div>
</nav>


    );
}








