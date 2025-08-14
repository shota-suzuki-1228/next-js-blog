"use server"

import { saveImage } from '@/utils/image';
import postSchema from '@/validations/posts';
import { prisma } from '../prisma';
import { redirect } from 'next/navigation';

type ActionState = {
  errors: Record<string, string[]>;
  success: boolean;
}

const updatePost = async (
    prevState: ActionState,
    formData: FormData
) : Promise<ActionState> => {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const topImageInput = formData.get("topImage");
    const topImage = topImageInput instanceof File ? topImageInput : null;    
    const postId = formData.get("postId") as string;
    const published = formData.get("published") === "true";
    const oldImageUrl = formData.get("oldImageUrl") as string;

    // バリデーション
    const validatedFields = postSchema.safeParse({title, content, topImage});

    if(!validatedFields.success){
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      }
    }

    // 画像処理
    let imageUrl = oldImageUrl
    if(topImage instanceof File && topImage.size > 0 && topImage.name !== "undefined"){
      const newImageUrl = await saveImage(topImage);
      if(!newImageUrl){
        return{
          success: false, 
          errors: {topImage: ["画像の保存に失敗しました"]}
        }
      }
      imageUrl = newImageUrl;
    }

    // データベース更新
    const updatedPost = await prisma.post.update({
      where: {id: postId},
      data: {
          title, 
          content,  
          published,
          topImage: imageUrl
      }
    })

    if (!updatedPost) {
      return {
        success: false,
        errors: {general: ["記事の更新に失敗しました"]}
      }
    }

  } catch (error) {
    console.error("記事更新エラー:", error);
    return {
      success: false,
      errors: {general: ["予期しないエラーが発生しました"]}
    }
  }

  // try-catch ブロックの外でリダイレクト
  redirect("/dashboard")
}

export default updatePost