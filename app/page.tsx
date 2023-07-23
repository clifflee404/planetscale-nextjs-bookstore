"use client"

import Badge from "@/components/Badge"
import Image from "next/image"
import { useEffect, useState } from "react"

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
    fetchBookData()
  }, [])

  return (
    <main className=" flex min-h-screen flex-col items-center pt-24 max-w-4xl m-auto">
      {/* <h3 className="text-xl font-bold mb-8">书籍列表</h3> */}
      <div className="mx-4 bg-white px-4 py-5 sm:px-6 lg:px-8 rounded-md border border-slate-900/10">
        <ul role="list" className="divide-y divide-gray-100">
          {!list || (list && list.length === 0 && !loading) ? (
            <li>暂无书籍</li>
          ) : (
            ""
          )}
          {loading && <li>Loading...</li>}
          {!loading && list.length > 0
            ? list.map((book) => (
                <li key={book.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={book.imageUrl} alt="" /> */}
                    <div className="relative w-20 h-20 shrink-0">
                      <Image
                        // width={120}
                        fill={true}
                        // height={'auto'}
                        src={testImgUrl}
                        className="object-contain "
                        alt={book.bookTitle}
                      />
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
