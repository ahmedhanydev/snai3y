"use client";
import Image from "next/image"
import Link from "next/link"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from "react"


const navigation = [
    { name: 'الرئيسية', href: '/', current: true },
    { name: 'الخدمات', href: '/services', current: false },
    { name: 'كيف نعمل', href: '/how-it-work', current: false },
    { name: 'نبـذه عنا', href: '/about', current: false },
  ]

function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {

const [isLogged, setIsLogged]=useState(false)



  return (
    <Disclosure as="nav" className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-20 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
          </DisclosureButton>
        </div>
        <div className="flex flex-1 items-center justify-center  sm:justify-between ">
          <div className="flex shrink-0 items-center  ">
            {/* <Image 
              width={100}
              height={100}
              alt="Your Company"
              src="/images/logo.png"
              className="h-8 w-auto"
            /> */}
            <Link href={'/'} className="text-white text-2xl pe-40 md:text-3xl font-bold logo">Snai3y</Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex  w-full">
            <div className="flex space-x-4 justify-center  w-full">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-200 text-gray-900' : 'text-white hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm  font-semibold',
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        

          {/* Profile dropdown */}
          {isLogged ?   <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full"
                />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute font-semibold right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                 حسابي
                </a>
              </MenuItem>
              {/* <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  الاعدادات
                </a>
              </MenuItem> */}
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  تسجيل خروج
                </a>
              </MenuItem>
            </MenuItems>
          </Menu> : <div className="flex gap-2">
  <Link href={'/login'} className="border-2 text-white text-sm md:text-base rounded-lg px-2 md:px-3 py-2">تسجيل الدخول</Link>
  <Link href={'/register'} className="bg-white  text-gray-900 text-sm md:text-base rounded-lg px-4 md:px-6 py-2"> سجل</Link>

          </div> } 
        
        </div>
      </div>
    </div>


    <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
    </DisclosurePanel>
  </Disclosure>)}

/* <nav className="bg-white shadow-sm fixed top-0   w-full z-10">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-16">
<div className="flex items-center">
<div className="flex-shrink-0 flex items-center">
<span className="text-blue-800 text-xl font-bold">CraftsmenConnect</span>
</div>
</div>
<div className="hidden md:flex items-center justify-center flex-1">
<div className="flex space-x-8">
<a href="#" className="text-blue-800 font-medium hover:text-blue-600 px-3 py-2 cursor-pointer">Home</a>
<a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer">Services</a>
<a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer">How it Works</a>
<a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer">About Us</a>
</div>
</div>
<div className="hidden md:flex items-center">
<Link href={'/login'} className="border-2  p-2 rounded-lg mr-3 cursor-pointer !rounded-button whitespace-nowrap">
تسجيل الدخول
</Link>
<Link href={'/register'} className=" bg-blue-800 hover:bg-blue-700 text-white cursor-pointer !rounded-button whitespace-nowrap">
سجل
</Link>
</div>
<div className="flex items-center md:hidden">
<button className="text-gray-700 hover:text-blue-600 cursor-pointer">
<i className="fas fa-bars text-xl"></i>
</button>
</div>
</div>
</div>
</nav>
  )
} */
