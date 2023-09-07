import { Posttype } from '@/type'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
type Props = {
  post:Posttype;
};

const Post = (props:Props) => {
  const {post}=props;
  return (
    <div>
      <div className="bg-white shadow-md rounded p-4 mb-4">
  <div className="mb-4">
    <div className="flex items-center mb-2">
      <Link href={`/profile/${post.authorId}`}>
      <img
        className="w-10 h-10 rounded-full mr-2"
        src="{post.author.profile?.profileImageUrl}"
        alt="User Avatar"
      />
      </Link>
      <div>
        <h2 className="font-semibold text-md">{post.author?.username}</h2>
        <p className="text-gray-500 text-sm">{post.createdAt}</p>
      </div>
    </div>
    <p className="text-gray-700">{post.content}</p>
  </div>
</div>
    </div>
  )
}

export default Post
