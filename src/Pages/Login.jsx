import AppNavbar from "../components/AppNavbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client"

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(loginForm));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoginWithDiscord = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: 'http://localhost:5173/settings',
        },
      });
      console.log(data, error);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div>
  <AppNavbar />
  <div className="h-screen flex justify-center bg-cyan-900 overflow-hidden relative">

    <div className="flex w-full lg:w-1/2 justify-center items-center space-y-8">
      <div className="w-full px-8 md:px-32 lg:px-24 relative z-10">
        <form className="bg-gray-100 rounded-md shadow-2xl p-5 border-gray-600 border-2" onSubmit={handleLogin}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
          <div className="flex items-center border-gray-600 border-2 mb-8 py-2 px-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input id="email" className="pl-2 w-full outline-none border-none bg-gray-100" type="email" name="email" placeholder="Email Address" />
          </div>
          <div className="flex items-center border-gray-600 border-2 mb-12 py-2 px-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <input className="pl-2 w-full outline-none border-none bg-gray-100" type="password" name="password" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2 border-gray-600 border-2">Login</button>
 
        
        </form>
     
      </div>
    </div>

    <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#020314] opacity-70 z-0"></div>
  </div>
</div>



  );
}

export default Login