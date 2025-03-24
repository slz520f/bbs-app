"use client"
import Header from "@/components/Header";
import { useRouter } from "next/navigation";  // 修正

import { useState } from "react";
export default function CreatePost(){
    const [title, setTitle] = useState(""); // 投稿タイトルの状態
    const [content, setContent] = useState("");
    const router = useRouter();

    const createPost = async () => {
      const username = "Guest"; // 仮のユーザー名
      const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, username }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push('/')
      
    } else {
      console.error('投稿の作成に失敗しました');
    }

    
    setTitle("");
    setContent("");
    };

    return(
        <div>
          <Header/>
           <h1 className="text-3xl font-bold mb-6">掲示板</h1>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-6">title</h2>
                  <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="w-full p-2 border rounded mb-2"/>
                  <h2 className="text-3xl font-bold mb-6">content</h2>
                  <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} className="w-full p-2 border rounded mb-2"/>
                  <button onClick={createPost} className="bg-blue-500 text-white px-4 py-2 rounded">送信</button>
              </div>
              </div>
    )
}