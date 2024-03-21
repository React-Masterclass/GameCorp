import { useState } from 'react';
import { useLoaderData,Link} from 'react-router-dom';
import supabase from '../supabase/client';
import AppNavbar from '../components/AppNavbar';

function CommentPage() {
  const game = useLoaderData();
  const [success, setSuccess] = useState(false);
 

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentForm = event.currentTarget;
    const { title, content } = Object.fromEntries(new FormData(commentForm));
    if (
      typeof title === 'string' &&
      typeof content === 'string' &&
      title.trim().length !== 0 &&
      content.trim().length !== 0
    ) {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            game_id: game.id,
            game_name: game.name,
            comment_title: title,
            comment_content: content,
          },
        ])
        .select();
      if (error) {
      
        alert(error.message);
      } else {
        commentForm.reset();
        setSuccess(true);
       
      }
    }
  };

  return (


    <div className="bg-gray-900 min-h-screen relative">
  
  <AppNavbar />
  <div className="flex mx-auto shadow-lg mb-4 max-w-lg bg-white rounded-lg px-4 pt-2 mt-10 z-10 ">
    <form className="w-full max-w-xl" onSubmit={handleCommentSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg w-full">Add a new comment to:</h2>
        <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg w-full">{game.name}</h2>
        <label htmlFor="title" className="w-full md:w-full px-3 mb-2 mt-2">
          <textarea className="bg-gray-100 rounded border border-gray-400 h-10 resize-none w-full py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" id="title" name="title" placeholder='Title' type="text" required></textarea>
        </label>
        <label htmlFor="content" className="w-full md:w-full px-3 mb-2 mt-2">
          <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" id="content" name="content" placeholder='Type Your Comment' type="text" required></textarea>
        </label>
        <div className="w-full flex items-start md:w-full px-3">
          <div className="-mr-1">
           <Link to={`/game/${game.id}`}>
            <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment' />
          </Link></div>
        </div>
      </div>
    </form>
  </div>
</div>

      

  )
}
export default CommentPage;