import { useEffect, useState } from "react"
import "../app/globals.css";

interface Post{
    id : number
    title : string
    content : string
    createdAt : string

}

export default function Home(){
    const [posts, setPosts] = useState<Post[]>([]) //全部掲示板のリスト
    const [title,setTitle] = useState("") //各掲示板のタイトル
    const [content,setContent] =useState("") //各掲示板の内容

    useEffect(()=>{
        fetchPosts()
    },[])
    
    //掲示板を取得
    const fetchPosts =async()=>{
        const response =await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
    }
    //掲示板作成
    const createPost = async()=>{
        const username = "Guest";
        const response = await fetch('/api/posts/create',{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({title,content,username}),
        })
        const data = await response.json()
        setPosts([data,...posts])
        setTitle("")
        setContent("")

    }
    return(
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">掲示板</h1>
            <div className="mb-6">
                <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="w-full p-2 border rounded mb-2"/>
                <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} className="w-full p-2 border rounded mb-2"/>
                <button onClick={createPost} className="bg-blue-500 text-white px-4 py-2 rounded">送信</button>
            </div>
            <div className="space-y-4">
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <div className="p-4 border rounded">
                                <h2 className="text-xl font-bold">{post.title}</h2>
                                <p className="text-gray-700">{post.content}</p>
                                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}