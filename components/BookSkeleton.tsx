import React from "react"
import { Skeleton } from "./ui/skeleton"

const BookSkeleton = () => {
  return (
    <li className="w-full flex items-center space-x-4 py-5">
      <Skeleton className="bg-border h-24 w-20 " />
      <div className="w-full space-y-2">
        <Skeleton className="bg-border h-6 w-[200px]" />
        <Skeleton className="bg-border h-6 w-full" />
        <Skeleton className="bg-border h-6 w-[300px]" />
      </div>
    </li>
  )
}

export default BookSkeleton
