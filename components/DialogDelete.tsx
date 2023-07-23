"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { IBook } from "@/types/book"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "./ui/use-toast"

export function DialogDelete({ book, onOk }: { book: IBook, onOk: (book: IBook) => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    console.log("delete:", book)
    setLoading(true)

    try {
      const response = await fetch(`/api/book/${book.id}`, {
        method:'DELETE',
      })
      if (response.status !== 200) {
        console.log("删除失败，请稍后再试")
      } else {
        console.log("Form submitted successfully!")
        toast({
          title: `🎊《${book.bookTitle}》 已成功删除`,
          duration: 4000,
        })
        onOk(book)
        setOpen(false)
      }
    } catch (error) {
      console.error("There was an error when delete book ", error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {/* <Button variant="destructive">Show Dialog</Button> */}
        <Button variant="ghost" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>是否确认删除《{book.bookTitle}》?</AlertDialogTitle>
          <AlertDialogDescription>
            此操作无法撤消，这将从我们的服务器中永久删除本书籍，请谨慎操作
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          {loading ? (
            <Button disabled variant="destructive">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              删除中...
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleDelete}>
              确认删除
            </Button>
          )}
          {/* <AlertDialogAction onClick={handleDelete}>确认删除</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
