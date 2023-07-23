
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()

export const GET = async (request: NextRequest, { params }: any) => {
  console.log('GET params.id:', params.id)
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: +params.id
      }
    })

    if (!book) return new Response("Book Not Found", { status: 404 })

    return new Response(JSON.stringify(book), {
      status: 200
    })
  } catch (error) {
    return new Response("Failed to fetch book", { status: 500 })
  }
}

export const PATCH = async (req: NextRequest, { params }: any) => {
  const reqBody = await req.json()

  try {
    const updateBook = await prisma.book.update({
      where: {
        id: +params.id,
      },
      data: {
        bookTitle: reqBody.title,
        bookAuthor: reqBody.author,
        bookTag: reqBody.tag,
        bookDescription: reqBody.description,
        bookImageUrl: reqBody.imageUrl,
      },
    })

    return new Response(
      JSON.stringify({
        success: true,
        data: updateBook
      }),
      {
        status: 200
      }
    )
  } catch (error) {
    console.error("Update Book Error:", error)
    return new Response(JSON.stringify({
      error: 'Error updating book'
    }), { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: any) => {
  console.log('params.id:', params.id)
  try {
    const deleteBook = await prisma.book.delete({
      where: {
        id: +params.id
      }
    })
    return new Response(JSON.stringify({ success: true, message: 'Deleted Successfully', data: deleteBook }), { status: 200 })
  } catch (error) {
    console.error("Delete error:", error)
    return new Response(JSON.stringify({
      error: 'Error deleting book'
    }), { status: 500 })
  }
}
