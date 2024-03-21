import useProfile from '../Hooks/useProfile';
import AppContext from '../contexts/AppContext';
import { useContext, useEffect, useState, useRef } from 'react';
import supabase from '../supabase/client';

function Messages({ game }) {
    const { session } = useContext(AppContext);
    const { profile } = useProfile();
    const [chat, setChat] = useState([]);
    const chatRef = useRef(null);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputForm = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputForm));
        if (typeof message === 'string' && message.trim().length !== 0) {
            const { data, error } = await supabase
                .from('messages')
                .insert([
                    {
                        profile_id: profile.id,
                        game_id: game.id,
                        content: message,
                    },
                ])
                .select();
            if (error) {

                alert(error.message);
            } else {
                console.log(data);
            }
        }
    };

    const getMessages = async () => {

        const { data, error } = await supabase
            .from('messages')
            .select('*, profile: profiles(username)')
            .eq('game_id', game.id);
        if (error) {
            // eslint-disable-next-line no-alert
            alert(error.message);
        } else {
            setChat(data);
        }
    };

    useEffect(() => {
        getMessages();
        const subscription = supabase
            .channel('messages')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                },
                () => getMessages()
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chat]);

    return (

        <div className="max-h-96 flex flex-col max-w-lg mx-auto ">
            <div className="bg-cyan-900 p-4 text-white text-center">
                <h2>Real Time Chat</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4" ref={chatRef}>
                {chat.length === 0 ? (
                    <div className="flex justify-center text-gray-400">No messages yet.</div>
                ) : (
                    chat.map((message, index) => (
                        <div key={message.id} className={index !== 0 ? 'mt-4' : ''}>
                            <div className="flex justify-end">
                                <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs" style={{ wordWrap: 'break-word' }}>
                                    <ul>
                                        {message.profile.username} : {message.content}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <form onSubmit={handleMessageSubmit}>
                <div className="p-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                        name='message'
                    />
                    <button className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none" type='submit'></button>
                </div>
            </form>
        </div>

    )
}

export default Messages;