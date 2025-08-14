import { prisma } from './prisma'

const GetOwnPosts = async (userId: string) => {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
    },
    orderBy: {
        createdAt: "desc",
    },
  })
}
export default GetOwnPosts
