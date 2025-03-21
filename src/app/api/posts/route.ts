import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export  async function GET(){
    const posts = await prisma.post.findMany({orderBy:{createdAt:"desc"}})
    return NextResponse.json(posts)
}

export async function POST(req:Request){
    const {title,content} = await req.json();
    const newPost = await prisma.post.create({data:{title,content,username:"test-user"}});
    return NextResponse.json(newPost)
}