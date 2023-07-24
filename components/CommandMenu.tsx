"use client"

import React, { useCallback, useEffect, useState } from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Loader2,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { IBook } from "@/types/book"
import { useDebounceValue } from "@/hooks/useDebounceValue"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<IBook[]>([])

  const searchQuery = useDebounceValue(keyword, 900)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = (keyword: string) => {
    console.log("---搜索:", keyword)
  }

  useEffect(() => {
    console.log("---searchQuery:", searchQuery)
    handleSearch(searchQuery)
  }, [searchQuery])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      {/* <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 mr-auto bg-transparent border-slate-900/10 mb-6"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">搜索书籍...</span>
        <span className="inline-flex lg:hidden">搜索...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button> */}
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Search className="h-4 w-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="输入书名或作者搜索..."
          value={keyword}
          onValueChange={setKeyword}
        />
        <CommandList>
          {!loading && keyword ? (
            <CommandEmpty>
              没有找到关于 “{keyword}” 的书，换个搜索词试试吧
            </CommandEmpty>
          ) : null}
          {loading && (
            <CommandItem>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              查询中...
            </CommandItem>
          )}

          {result.map((item) => (
            <CommandItem key={item.id}>
              <span>{item.bookTitle}</span>
              {/* <span>{item.bookAuthor}</span> */}
            </CommandItem>
          ))}
          {/*
          <CommandGroup heading="书籍">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>书名</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>作者</span>
            </CommandItem>
          </CommandGroup>
           <CommandSeparator />
          <CommandGroup heading="操作">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>新建图书</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  )
}
