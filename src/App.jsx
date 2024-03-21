import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routing";
import AppContext from "./contexts/AppContext";
import userSession from "./Hooks/UserSession";

function App() {


  return <RouterProvider router={router} />
    
}
function WrappedApp(){

  const data = userSession();
  return(

  <AppContext.Provider value={data}>

   <App/>

  </AppContext.Provider>)
}

export default WrappedApp;