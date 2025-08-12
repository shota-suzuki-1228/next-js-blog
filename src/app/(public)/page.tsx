import PostCard from '@/components/post/postcard'
import { getPosts, searchPosts } from '@/lib/post'
import { Post } from '@/types/post'
import React from 'react'

type searchParams = {
  search? :string
}

const PostPage = async (
  {searchParams}:{searchParams:Promise<searchParams>}
) => {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.search || ""

  //const posts = await getPosts() as Post[]
  const posts = query
  ? await searchPosts(query)
  : await getPosts() as Post[]
  
  return (
    <>
     <div className='mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post) =>(
          <PostCard key={post.id} post={post}/>
        ))}
      </div>
     </div>
    </>
  )
}

export default PostPage