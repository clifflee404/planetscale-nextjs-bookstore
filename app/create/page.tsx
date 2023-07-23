/* eslint-disable react/no-unescaped-entities */
'use client';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import BackgroundClipPath from '@/components/BackgroundClipPath';


const DEFAULT_DATA = {
  title: '',
  author: '',
  tag: '',
  description: ''
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function AddBook() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(DEFAULT_DATA)
  const { toast } = useToast()

  
  const { title, author, tag, description } = formData

  const handleChange = (e: any) => {
    const { name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })

      if(response.status !== 200){
        console.log('Something went wrong')
        setLoading(false)
      }else{
        resetForm()
        console.log('Form submitted successfully!')
        setLoading(false)
        toast({
          title: `🎊《${formData.title}》 已添加成功`,
          // description: "",
        })
      }
    } catch (error) {
      console.error('There was an error when add book ', error);
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(DEFAULT_DATA)
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <BackgroundClipPath/>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">📚 风居小屋图书馆</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          由 Next.js 13 + PlanetScale + Tailwind CSS 搭建
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
              标题
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="title"
                // id="book-title"
                autoComplete="title"
                value={title}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-semibold leading-6 text-gray-900">
              作者
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="author"
                value={author}
                onChange={handleChange}
                // id="author"
                autoComplete="author"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="tag" className="block text-sm font-semibold leading-6 text-gray-900">
              类别
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="tag"
                value={tag}
                onChange={handleChange}
                // id="tag"
                autoComplete="tag"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
              介绍
            </label>
            <div className="mt-2.5">
              <textarea
                name="description"
                // id="description"
                value={description}
                onChange={handleChange}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // defaultValue={''}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            disabled={loading}
            type="submit"
            className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading && 'bg-indigo-200 hover:bg-indigo-200'}`}
          >
            {loading ? '添加中...' : '添加书籍'}
          </button>

          {/* <Button className='w-full bg-indigo-600'>Click me</Button> */}
        </div>
      </form>
    </div>
  )
}

export default AddBook