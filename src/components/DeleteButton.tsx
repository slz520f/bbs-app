"use client";

import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  postId: number;
  onDelete: () => void; // 投稿リスト更新用
}

export default function DeleteButton({ postId, onDelete }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onDelete(); // 投稿一覧を更新
      } else {
        alert("削除に失敗しました");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
      削除
    </button>
  );
}
