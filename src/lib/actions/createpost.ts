"use server"

import { auth } from '@/auth';
import saveImage from '@/utils/image';
import postSchema from '@/validations/posts';
import { prisma } from '../prisma';
import { redirect } from 'next/navigation';

type ActionState = {
  errors: Record<string, string[]>;
  success: boolean;
}

const createPost = async (
    prevState: ActionState,
    formData: FormData
) : Promise<ActionState> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const topImageInput = formData.get("topImage");
  const topImage = topImageInput instanceof File ? topImageInput : null;    

  const validatedFields = postSchema.safeParse({title, content, topImage});

  if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const imageUrl = topImage ? await saveImage(topImage) : null;
  if(!imageUrl){
    return{success: false, errors: {topImage: ["画像の保存に失敗しました"]}}
  }

  const session = await auth();
  const userId = session?.user?.id;
  if(!userId){
    throw new Error("不正なリクエストです")
  }

  const post = await prisma.post.create({
    data: {
        title, 
        content, 
        topImage: imageUrl, 
        published: true, 
        authorId:userId
    }
 })

 redirect("/dashboard")
}

export default createPost