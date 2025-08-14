import { writeFile } from 'fs/promises';
import path from 'path';

const saveImage = async (file: File): Promise<string|null> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public/images');

  try{
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (error) {
    console.error("画像の保存に失敗しました", error);
    return null;
  }
}

export default saveImage;