import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()

export const GET = async (req: NextRequest) => {
  console.log('---request 参数:', req.nextUrl.searchParams);
  const keyword = req.nextUrl.searchParams.get('keyword')
  try {
    const books = await prisma.book.findMany({
      where: {
        bookTitle: keyword as string
      }
    })

    if (!books) return new Response(JSON.stringify(
      {
        data: [],
        code: 0,
        message: "Book Not Found"
      }
    ), { status: 404 })

    // const book = {test: 123}

    return new Response(JSON.stringify({data: books,
      code: 0,
      message: "Successful"}), {
      status: 200
    })
  } catch (error) {
    return new Response("Failed to search book", { status: 500 })
  }
}