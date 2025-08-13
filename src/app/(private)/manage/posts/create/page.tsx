"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ReactMarkdown from "react-markdown";
import { useActionState, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const CreatePage = () => {
    const [content, setContent] = useState("") 
    const [contentLength, setContentLength] = useState(0) 
    const [preview, setPreview] = useState(false)

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        setContentLength(value.length);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4">新規記事投稿(Markdown対応)</h1>
            <form className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <Input type="text" id="title" name="title" placeholder="タイトルを入力してください"/>
                </div>
                <div>
                    <Label htmlFor="content">内容(Markdown)</Label>
                    <TextareaAutosize
                        id="content" 
                        name="content" 
                        className="w-full border p-2"
                        placeholder="Markdown形式で入力してください"
                        minRows={8} 
                        value={content} 
                        onChange={handleContentChange}
                    />
                </div>
                <div>
                    文字数: {contentLength}
                </div>
                <div>
                    <Button type="button" onClick={() => setPreview(!preview)}>
                        {preview ? "プレビューを閉じる" : "プレビューを表示"}
                    </Button>
                </div>
                {preview && (
                    <div className="border p-4 bg-gray-50 prose max-w-none">
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
                
                <div className="pt-6 border-t border-gray-200">
                    <Button type="submit" className="w-full">投稿する</Button>
                </div>
            </form>
        </div>
    )
}

export default CreatePage