import Header from "@/app/components/Header";
import { useState } from "react";
export default function CreatePost(){
    const [title, setTitle] = useState(""); // 投稿タイトルの状態
  const [content, setContent] = useState("");
  const createPost = async () => {
    const username = "Guest"; // 仮のユーザー名
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, username }),
    });

    if (response.ok) {
      const data = await response.json();
      // 成功した場合、投稿一覧を更新
      console.log('投稿が作成されました:', data);
      // 必要に応じてリダイレクトや他の状態更新を行います
    } else {
      console.error('投稿の作成に失敗しました');
    }

    // 投稿作成後、入力フォームをリセット
    setTitle("");
    setContent("");
  };

    return(
        <div>
          <Header/>
           <h1 className="text-3xl font-bold mb-6">掲示板</h1>
                <div className="mb-6">
                    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="w-full p-2 border rounded mb-2"/>
                  <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} className="w-full p-2 border rounded mb-2"/>
                  <button onClick={createPost} className="bg-blue-500 text-white px-4 py-2 rounded">送信</button>
              </div>
              </div>
    )
}