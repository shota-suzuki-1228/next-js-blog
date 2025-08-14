import NotFound from "@/app/(public)/posts/[id]/not-found"
import { auth } from "@/auth"
import GetOwnPost from "@/lib/ownpost"
import EditPostForm from "./editpostform"

type Params = {
    params:Promise<{id:string}>
}

const EditPage = async({params}:Params) => {
    const session = await auth()
  const userId = session?.user?.id
  if(!session?.user?.email || !userId){
    throw new Error("不正なリクエストです")
  }

  const {id} = await params
  const post = await GetOwnPost(userId,id)

  if(!post){
    return <NotFound /> 
  }
  return (
    <EditPostForm post={post}/>
  )
}

export default EditPage