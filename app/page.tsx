"use client"

import Badge from "@/components/Badge"
import Image from "next/image"
import { useEffect, useState } from "react"
import { booksData } from "@/data/books"
import { Skeleton } from "@/components/ui/skeleton"
import BookSkeleton from "@/components/BookSkeleton"

interface IBook {
  id: number
  bookTitle: string
  bookAuthor: string
  bookTag: string
  bookDescription: string
}

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
        setLoading(false)
      }
    } catch (error) {
      console.error("There was an error when get books", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    // fetchBookData()
    setList(booksData.data)
    setLoading(false)
  }, [])

  return (
    <main className="w-full px-4 flex min-h-screen flex-col items-center pt-24 sm:max-w-4xl m-auto">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="w-full  px-4 py-5 sm:px-6 lg:px-8 rounded-md border border-slate-900/10">
        <ul role="list" className="divide-y divide-gray-100">
          {!list || (list && list.length === 0 && !loading) ? (
            <li>暂无书籍</li>
          ) : (
            ""
          )}
          {loading && (
            <>
              {Array.from({ length: 6 }, (v, i) => i).map(item => (
                <BookSkeleton key={item}/>
              ))}
              
            </>
          )}
          {!loading && list.length > 0
            ? list.map((book) => (
                <li key={book.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={book.imageUrl} alt="" /> */}
                    <div className="relative w-20 h-24 shrink-0 bg-gray-200">
                      {/* <Image
                        // width={120}
                        fill={true}
                        // height={'auto'}
                        src={testImgUrl}
                        className="object-contain "
                        alt={book.bookTitle}
                      /> */}
                    </div>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {book.bookTitle}
                      </p>
                      {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500"> */}
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {book.bookDescription}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end shrink-0">
                    {/* <p className="text-sm leading-6 text-gray-900">{book.bookTag}</p> */}
                    <Badge>{book.bookTag}</Badge>
                    {/* {book.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={book.lastSeenDateTime}>{book.lastSeen}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )} */}
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </main>
  )
}
