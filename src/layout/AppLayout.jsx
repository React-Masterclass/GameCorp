import { Outlet } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";

export default function AppLayout() {
   
   return (


<div className="relative  flex flex-col  bg-cyan-900 overflow-hidden ">
                <div className="flex justify-between">
                    <div className="basis-1/5 flex z-[1]">
                     <AppSidebar />
                    </div>
                    <div className="basis-3/5 relative z-[1] container m-auto sm:grid-cols-1">
                    <Outlet />
                    
                    </div>
                   
                </div>
                 <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#020314] opacity-70"></div>
            </div>
      

   )


}

