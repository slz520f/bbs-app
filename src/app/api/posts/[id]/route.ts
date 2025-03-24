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
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const postId = Number(params.id);
    await prisma.post.delete({ where: { id: postId } });
    return NextResponse.json({ message: "Post deleted" });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const postId = Number(params.id);
    const { title, content } = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
    return NextResponse.json(updatedPost);
  }