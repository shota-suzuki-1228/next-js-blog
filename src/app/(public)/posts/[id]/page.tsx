import { getPost } from "@/lib/post"
import NotFound from "./not-found"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

type Params = {
    params:Promise<{id:string}>
}

const PostPage = async ({params}: Params) => {
  const {id} = await params
  const post = await getPost(id)

  if(!post){
    return <NotFound /> 
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto overflow-hidden">
        {post.topImage && (
            <div className="relative w-full h-64 lg:h-96">
                <Image
                 src={post.topImage}
                 alt={post.title}
                 fill 
                 sizes="100vw"
                 className="object-cover"
                 priority
                 />
            </div>
         )}
            <CardHeader className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-500">
                        投稿者：{post.author.name}
                    </p>
                    <time className="text-sm text-gray-500">
                        {format(new Date(post.createdAt),"yyyy年MM月dd日",{locale:ja})}
                    </time>
                </div>
                <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="prose max-w-none">
                    {post.content}
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default PostPage