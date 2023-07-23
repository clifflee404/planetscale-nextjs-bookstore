"use client"
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IBook } from "@/types/book"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"

export function DialogEdit({
  book,
  onOk,
}: {
  book: IBook
  onOk: (newBook: IBook) => void
}) {
  const [open, setOpen] = useState(false)
  const { bookTitle, bookAuthor, bookDescription, bookTag, id, bookImageUrl } = book
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: bookTitle,
    author: bookAuthor,
    tag: bookTag,
    description: bookDescription,
    imageUrl: bookImageUrl,
  })

  const { toast } = useToast()

  const { title, author, tag, description, imageUrl } = formData

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    console.log("---book:", book)
    console.log("---formData:", formData)
    if (!book.id) {
      toast({
        variant: "destructive",
        title: "书籍 ID 不正确, 请稍后再试",
        description: "There was a problem with your request.",
        duration: 4000,
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return
    }
    try {
      const response = await fetch(`/api/book/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.status !== 200) {
        console.log("Something went wrong")
      } else {
        setOpen(false)
        console.log("Form submitted successfully!")
        toast({
          title: `🎊《${formData.title}》 已修改成功`,
          duration: 4000,
          // description: "",
        })
        onOk({
          ...book,
          bookTitle: formData.title,
          bookAuthor: formData.author,
          bookTag: formData.tag,
          bookDescription: formData.description,
          bookImageUrl: formData.imageUrl,
        })
      }
    } catch (error) {
      console.error("There was an error when update book ", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit</Button> */}
        <Button variant="ghost" size="icon">
          <PencilSquareIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>编辑书籍</DialogTitle>
            <DialogDescription>点击确认按钮保存</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-center">
                标题
              </Label>
              <Input
                id="name"
                name="title"
                value={title}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-center">
                作者
              </Label>
              <Input
                id="author"
                name="author"
                value={author}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag" className="text-center">
                类别
              </Label>
              <Input
                id="tag"
                name="tag"
                value={tag}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-center">
                类别
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-center">
                介绍
              </Label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button disabled type="submit">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                请稍后
              </Button>
            ) : (
              <Button type="submit">确认</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
