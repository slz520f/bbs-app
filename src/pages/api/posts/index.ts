import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

//掲示板を見るAPI
const prisma = new PrismaClient();
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method ==='GET'){
        const posts = await prisma.post.findMany({
            orderBy:{createdAt:'desc',},
        })
        res.status(200).json(posts)
    }else{
        res.status(450).json({message:'Method not allowed'})
    }
}