import React ,{useState,useEffect}from 'react'
import Post from './Post'
import backendapi from '@/lib/apiClient';
import { Posttype } from '@/styles/type';

const Timeline = () => {
  const [posttext,setPosttext]=useState<string>("");
  const [latestPost,setLatestPosts]=useState<Posttype[]>([]);

  const userposthandler = async (e:React.FormEvent<HTMLFormElement>)=>{ //新規登録をするためにapiを投げる //formに着けるものは、この型になる。
    e.preventDefault();
    try{
      
      const res = await backendapi.post("posts/post",{ //
        content:posttext,
      }
      );
      
      setLatestPosts((prevPost)=>[res.data,...prevPost]);
      setPosttext("");

    
    }catch(err){
      alert("ログインしてください")
    }
  };

  useEffect(()=>{
   
    const fetctLatest = async() =>{
      try{
        const res = await backendapi.get("/posts/get_latest_post");
        setLatestPosts(res.data);
      }catch(err){
        console.log(err)
      }
    };
    fetctLatest();
}
    ,[]);



  return (
    <div>
      <div className="min-h-screen bg-gray-100">
  <main className="container mx-auto py-4">
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <form onSubmit={userposthandler}>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="What's on your mind?"
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
            setPosttext(e.target.value)
          }}
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
        >
          投稿
        </button>
      </form>
    </div>
    {latestPost.map((post:Posttype)=>(
      <Post key={post.id} post={post} />
    ))}
  </main>
</div>
    </div>
  )
}


export default Timeline
