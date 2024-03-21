import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

function useAuth() {
  const [session, setSession] = useState(null);
  const signUp = async (email, password) => await supabase.auth.signUp(email, password);

  const signIn = async (email, password) => await supabase.auth.signInWithPassword(email, password);

  const signOut = async () => await supabase.auth.signOut();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


  const [userSession, setUserSession] = useState(null)

  useEffect(() => {
    const getUserSession = async () => {

     const { data: { session } } = await supabase.auth.getSession()
     if (session) {
      const { user } = session
      setUserSession(user ?? null)
     }
    }

    getUserSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange( async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // fai qualcosa...
      } else if (event === 'USER_UPDATED') {
        setUserSession(() => session.user)
      } else if (event === 'SIGNED_IN') {
        setUserSession(() => session.user)
      } else if (event === 'SIGNED_OUT') {
        setUserSession(() => null)
      }
    })

    return () => subscription.unsubscribe()
  }, []);

  return {
    session,
    signIn,
    signUp,
    signOut
  };
}

export default useAuth;