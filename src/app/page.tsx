"use client"
import { useEffect, useState } from "react"
import "../app/globals.css";
import { Card, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import Header from "@/components/Header";
import { Link } from "lucide-react";


interface Post{
    id : number
    title : string
    content : string
    createdAt : string

}

export default function Home(){
    const [posts, setPosts] = useState<Post[]>([]) //全部掲示板のリスト
    

    useEffect(()=>{
        fetchPosts()
    },[])
    
    //掲示板を取得
    const fetchPosts =async()=>{
        const response =await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
    }
 
    return(
        <div>
            <Header/>
            <div className="container mx-auto p-4">
              
             
              <div className="space-y-4">
                  <ul className="grid lg:grid-cols-3 px-4 py-4 gap-4">
                      {posts.map((post) => (
                          <li key={post.id} >
                              <Card className="mb-4 p-4 border rounded">
                                  <CardTitle className="text-xl font-bold">
                                      {post.title}
                                  </CardTitle>
                                  <CardContent className="text-sm text-gray-500">
                                  {post.content}
                                  </CardContent>
                                  <CardDescription className="text-gray-700">
                                    {new Date(post.createdAt).toLocaleString()}
                                  </CardDescription>
                              </Card>
                          </li>
                      ))}
                  </ul>
              </div>
            </div>
        </div>
    )

}