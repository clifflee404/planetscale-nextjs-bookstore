import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (req:NextRequest, res: NextResponse) => {
  // return new Response(JSON.stringify({data: []}), { status: 200})
  return await readBooks()
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  // const reqBody = await req.json()
  // console.log('---post body:', reqBody);

  // return new Response(JSON.stringify({}), { status: 200 })
  return await addBook(req, res)
}

// 查询书籍
async function readBooks() {
  try {
    const books = await prisma.book.findMany()
    return new Response(JSON.stringify({data: books, code: 0}), { status: 200})
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({error:  'Error reading frome database', code: 1}), { status: 500})
  }
}

// 添加书籍
async function addBook(req:NextRequest , res: NextResponse){
  const reqBody = await req.json()
  console.log('---post body:', reqBody);
  try {
    const newEntry = await prisma.book.create({
      data: {
        bookTitle: reqBody.title,
        bookAuthor: reqBody.author,
        bookTag: reqBody.tag,
        bookDescription: reqBody.description,
      }
    })
    return new Response(JSON.stringify({success: true, data: newEntry}), { status: 200 })
  } catch (error) {
    console.error("Request error", error)
    return new Response(JSON.stringify({
      error: 'Error adding book'
    }), { status: 500 })
  }
}

async function editBook(req: NextRequest, res: NextResponse){

}

