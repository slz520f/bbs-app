"use client";

import { useState } from "react";

interface EditButtonProps {
  postId: number;
  initialTitle: string;
  initialContent: string;
  onUpdate: () => void; // 投稿リスト更新用
}

export default function EditButton({ postId, initialTitle, initialContent, onUpdate }: EditButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleUpdate = async () => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setIsEditing(false);
      onUpdate(); // 投稿一覧を更新
    } else {
      alert("更新に失敗しました");
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="p-2 border rounded bg-gray-100">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 w-full mb-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-1 w-full mb-2"
          />
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
              保存
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded">
          編集
        </button>
      )}
    </div>
  );
}
