import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { PostCardProps } from "@/types/post"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import Image from "next/image"

const PostCard = ({post}:PostCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0">
      <Link href={`/posts/${post.id}`} className="block">
         {post.topImage && (
            <div className="relative w-full h-48">
                <Image
                 src={post.topImage}
                 alt={post.title}
                 fill 
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 className="object-cover"
                 priority
                 />
            </div>
         )}
         <div className="p-6">
             <CardTitle className="text-lg font-semibold mb-3 line-clamp-2 leading-tight">
               {post.title}
             </CardTitle>
             <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
               {post.content}
             </p>
             <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium">{post.author.name}</span>
                <time className="text-xs">
                  {formatDistanceToNow(
                    new Date(post.createdAt),
                    {addSuffix:true,locale:ja}
                  )}
                </time>
             </div>
         </div>
      </Link>
    </Card>
  )
}

export default PostCard