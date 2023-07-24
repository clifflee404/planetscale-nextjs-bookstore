"use client"

import Badge from "@/components/Badge"
import Image from "next/image"
import { useEffect, useState } from "react"
import { booksData } from "@/data/books"
import { Skeleton } from "@/components/ui/skeleton"
import BookSkeleton from "@/components/BookSkeleton"
import BackgroundClipPath from "@/components/BackgroundClipPath"
import { Button } from "@/components/ui/button"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { DialogEdit } from "@/components/DialogEdit"
import { IBook } from "@/types/book"
import { DialogDelete } from "@/components/DialogDelete"

const testImgUrl =
  "https://bkimg.cdn.bcebos.com/pic/79f0f736afc37931789dcce2e3c4b74542a91107?x-bce-process=image/resize,m_lfit,w_536,limit_1/format,f_auto"

const testImgUrl2 =
  "https://img9.doubanio.com/view/subject/s/public/s34099286.jpg"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<IBook[]>([])

  const fetchBookData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("response:", response)

      if (response.status !== 200) {
        console.log("Something went wrong")
      } else {
        console.log("Get books successfully!")
        const resJson = await response.json()
        console.log("resJson:", resJson)
        setList(resJson.data)
      }
    } catch (error) {
      console.error("There was an error when get books", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookData()
    // setList(booksData.data)
    // setLoading(false)
  }, [])

  // const handleEdit = (book: IBook) => {
  //   console.log('edit:',book);
  // }

  // const handleDelete = (book: IBook) => {
  //   console.log('delete:',book);
  // }

  const handleEditOk = (newBook: IBook) => {
    console.log("newBook:", newBook)
    // const targetIndex = list.findIndex(item => item.id === newBook.id)
    // const newList = list.splice(targetIndex, 1, newBook)
    // console.log(list);
    setList(
      list.map((item) => {
        if (item.id === newBook.id) {
          return {
            ...item,
            ...newBook,
          }
        } else {
          return item
        }
      })
    )
  }

  const handleDeleteOk = (book: IBook) => {
    console.log("delete ok", book)
    setList(list.filter((item) => item.id !== book.id))
  }

  return (
    <main className="w-full px-4 flex min-h-screen flex-col items-center pt-24 sm:max-w-4xl m-auto">
      <BackgroundClipPath />

      <div className="w-full  px-4 py-5 sm:px-6 lg:px-8 rounded-md border border-slate-900/10">
        <ul role="list" className="divide-y divide-gray-100">
          {/* {!list || (list && list.length === 0 && !loading) ? (
            <li>暂无书籍</li>
          ) : (
            ""
          )} */}
          {loading && (
            <>
              {Array.from({ length: 6 }, (v, i) => i).map((item) => (
                <BookSkeleton key={item} />
              ))}
            </>
          )}
          {!loading && list.length > 0
            ? list.map((book) => (
                <li key={book.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    <div className="relative w-20 h-24 shrink-0 shadow-sm">
                      {book.bookImageUrl && (
                        <Image
                          // width={120}
                          fill={true}
                          // height={'auto'}
                          src={book.bookImageUrl || testImgUrl}
                          className="object-contain"
                          alt={book.bookTitle}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {book.bookTitle}
                      </p>
                      <p className="mt-1 text-xs font-semibold leading-6 text-gray-600">
                        @{book.bookAuthor}
                      </p>
                      {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500"> */}
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {book.bookDescription}
                      </p>
                      <p className="mt-2">
                        <Badge>{book.bookTag}</Badge>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex sm:flex-row shrink-0 gap-2">
                    {/* <Button variant="outline">编辑</Button> */}
                    {/* <Button variant="ghost" size="icon" onClick={()=>handleEdit(book)}>
                      <PencilSquareIcon className="h-4 w-4" />
                    </Button> */}
                    {/* <Button variant="ghost" size="icon" onClick={() => handleDelete(book)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button> */}
                    <DialogEdit book={book} onOk={handleEditOk} />
                    <DialogDelete book={book} onOk={handleDeleteOk} />
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </main>
  )
}
