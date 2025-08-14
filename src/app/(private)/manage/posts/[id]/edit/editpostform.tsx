"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ReactMarkdown from "react-markdown";
import { useActionState, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import updatePost from "@/lib/actions/updatepost";

type EditPostFormProps = {
    post:{
        id:string;
        title:string;
        content:string;
        topImage?:string | null;
        published:boolean;
    }
}

const EditPostForm = ({post}:EditPostFormProps) => {
    const [content, setContent] = useState(post.content) 
    const [contentLength, setContentLength] = useState(post.content.length) 
    const [preview, setPreview] = useState(false)
    const [title,setTitle] = useState(post.title)
    const [published,setPublished] = useState(post.published)
    const [imagePreview,setImagePreview] = useState(post.topImage)

    const [state,formAction] = useActionState(updatePost,{
        success:false,errors:{}
    })

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        setContentLength(value.length);
    };

    const handleImageChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file){
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    useEffect(() => {
        return () => {
            if(imagePreview && imagePreview !== post.topImage){
                URL.revokeObjectURL(imagePreview)
            }
        }
    },[imagePreview,post.topImage])

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4">記事編集(Markdown対応)</h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <Input 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="タイトルを入力してください"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {state.errors.title && (
                        <p className='text-red-500 text-sm mt-1'>{state.errors.title.join(",")}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="topImage">トップ画像</Label>
                    <Input
                        type="file"
                        id="topImage"
                        accept="image/*"
                        name="topImage"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <Image
                                src={imagePreview}
                                alt={title || "プレビュー画像"}
                                width={0}
                                height={0}
                                sizes="200px"
                                className="w-[200px] h-auto rounded"
                                priority
                            />
                        </div>
                    )}
                    {state.errors.topImage && (
                        <p className='text-red-500 text-sm mt-1'>{state.errors.topImage.join(",")}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="content">内容(Markdown)</Label>
                    <TextareaAutosize
                        id="content" 
                        name="content" 
                        className="w-full border p-2 rounded"
                        placeholder="Markdown形式で入力してください"
                        minRows={8} 
                        value={content} 
                        onChange={handleContentChange}
                    />
                    {state.errors.content && (
                        <p className='text-red-500 text-sm mt-1'>{state.errors.content.join(",")}</p>
                    )}
                </div>

                <div className="text-sm text-gray-600">
                    文字数: {contentLength}
                </div>

                <div>
                    <Button type="button" onClick={() => setPreview(!preview)} variant="outline">
                        {preview ? "プレビューを閉じる" : "プレビューを表示"}
                    </Button>
                </div>

                {preview && (
                    <div className="border p-4 bg-gray-50 prose max-w-none rounded">
                        <h3 className="text-lg font-semibold mb-2">プレビュー:</h3>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            skipHtml={false} 
                            unwrapDisallowed={true} 
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}

                <div>
                    <Label className="text-base font-medium">公開設定</Label>
                    <RadioGroup 
                        value={published.toString()} 
                        onValueChange={(value) => setPublished(value === "true")}
                        className="mt-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="published-true"/>
                            <Label htmlFor="published-true">公開</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="published-false"/>
                            <Label htmlFor="published-false">非公開</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="pt-6 border-t border-gray-200">
                    <Button type="submit" className="w-full">
                        記事を更新する
                    </Button>
                </div>

                {/* Hidden inputs */}
                <input type="hidden" name="postId" value={post.id}/>
                <input type="hidden" name="oldImageUrl" value={post.topImage || ""}/>
                <input type="hidden" name="published" value={published.toString()}/>
            </form>

            {/* 成功メッセージ */}
            {state.success && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                    記事が正常に更新されました！
                </div>
            )}
        </div>
    )
}

export default EditPostForm