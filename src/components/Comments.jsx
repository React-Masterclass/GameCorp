import { useEffect, useState } from 'react';
import supabase from '../supabase/client';


function Comments({ game }) {
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [displayedComments, setDisplayedComments] = useState(2);

  const handleShowAllClick = () => {
    setDisplayedComments(comments.length);
    setShowAll(true);
  };






  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile: profiles(username)')
        .eq('game_id', game.id);
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
    <div className="flex flex-col ml-6 max-w-96 max-h-80 mb-10">
    <div className="bg-cyan-900 p-4 text-white text-center">
      <h2>Review</h2>
    </div>
    <div className="flex-1 overflow-y-auto p-4 ">
      {comments.length === 0 ? (
        <div className="flex justify-center text-gray-400">No comments yet.</div>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="bg-gray-800 rounded-lg p-4 mt-4">
            <div className="flex justify-end">
              <div className="bg-cyan-900 text-white p-2 rounded-lg max-w-xs">
                <ul>
                  {c.game_name} <br />{c.comment_title}: {c.comment_content}
                </ul>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  
  );
}

export default Comments;