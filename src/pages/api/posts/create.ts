import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

//掲示板作成するAPI
const prisma = new PrismaClient()

export default async function handler( req:NextApiRequest,res:NextApiResponse){
    if(req.method==='POST'){
        const {title,content,username} = req.body
        const post = await prisma.post.create({
            data:{title,content,username,}
        })
        res.status(200).json(post)
    }else{
        res.status(405).json({message:'Method not allowed'})
    }
}
