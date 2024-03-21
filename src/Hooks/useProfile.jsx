import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/client';
import AppContext from '../contexts/AppContext';


function useProfile() {
  const { session } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let ignore = false;
    async function getProfile() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`*, favorites: favorites(*)`)
          .eq('id', session.user.id)
          .single();


        if (error) {
          console.warn(error);
        } else if (data) {
          setProfile(data);
        }
      }catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getProfile();
    return () => {
      ignore = true;
    };
  }, [session]); 

  return{profile,loading}

}

export default useProfile;