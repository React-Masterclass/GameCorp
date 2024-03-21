import supabase from "../supabase/client"
import AppNavbar from "../components/AppNavbar";
import AppContext from "../contexts/AppContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


function Register() {

  const { signUp } = useContext(AppContext)
  const navigate = useNavigate();



  const handleRegister = async (event) => {
    event.preventDefault();
    const { username, email, password } = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    console.log(username, email, password)

    const { data, error } = await signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      alert(error.message)
    } else {
      navigate('/account');
    }

  }

  

  return (
    <div>
    <AppNavbar />
    <div className="h-screen flex justify-center bg-cyan-900 overflow-hidden relative">
  
      <div className="flex w-full lg:w-1/2 justify-center items-center space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24 relative z-10">
          <form className="bg-gray-100 rounded-md shadow-2xl p-5 border-gray-600 border-2" onSubmit={handleRegister}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">Welcome to Registrations</h1>
            <div className="grid grid-cols-2 gap-4">
  
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="username">Username</label>
              <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none border-gray-600 border-2" type="text" name="username" id="username" placeholder="Username" />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="email">Email</label>
              <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none border-gray-600 border-2" type="text" name="email" id="email" placeholder="Email" />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Password</label>
              <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none border-gray-600 border-2" type="password" name="password" id="password" placeholder="Password" />
            </div>
  
            
            <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans border-gray-600 border-2 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500">Register</button>
          
          </form>
          
        </div>
        
      </div>
  
      <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#020314] opacity-70 z-0"></div>
    </div>
  </div>)

}

export default Register;