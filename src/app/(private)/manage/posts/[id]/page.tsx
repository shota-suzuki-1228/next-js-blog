import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import NotFound from "@/app/(public)/posts/[id]/not-found"
import GetOwnPost from "@/lib/ownpost"
import { auth } from "@/auth"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

type Params = {
    params:Promise<{id:string}>
}

const ShowPage = async ({params}: Params) => {
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
                <div className="border p-4 bg-gray-50 prose max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        skipHtml={false} 
                        unwrapDisallowed={true} 
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default ShowPage