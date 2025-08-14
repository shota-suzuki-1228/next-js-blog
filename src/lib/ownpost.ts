// lib/ownpost.ts の例
import { prisma } from "@/lib/prisma" // または適切なDB接続

const GetOwnPost = async (userId: string, postId: string) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: userId, // 自分の投稿のみ取得
      },
      include: {
        author: { // author情報も含める
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })
    
    return post
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error)
    return null
  }
}

export default GetOwnPost