'use client'

import Link from 'next/link'
import { useState } from 'react'
import Dropdown from './ui/navbar-menu/Dropdown'
import CategoryMenu from './ui/navbar-menu/CategoryMenu'
import NavbarIconBtn from './ui/navbar-menu/NavbarIconBtn'
import SearchIcon from './ui/icon/SearchIcon'
import SaleIcon from './ui/icon/SaleIcon'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  return (
    <div className='navbar flex bg-transparent'>
      <div className='flex flex-1 gap-2'>
        <Link
          href='/'
          className='font-semibold text-2xl flex justify-center items-center px-3 text-sage-750 dark:text-coral-500'>
          HOT6
        </Link>
        <div className='hidden lg:flex'>
          <ul className='flex mt-2 gap-2 px-1 text-sage-700 dark:text-cream text-sm font-semibold tracking-widest'>
            <CategoryMenu />
          </ul>
        </div>
      </div>
      <div className='flex-none gap-1'>
        <div className='lg:hidden flex gap-1'>
          <NavbarIconBtn menu='search' />
          <NavbarIconBtn menu='write' />
        </div>
        <div className='hidden lg:flex flex-none gap-10 h-full items-center'>
          <div className='relative bg-zinc-100 rounded-full flex items-center h-10'>
            <div className='absolute flex items-center inset-y-0 left-0 pl-3 pointer-events-none'>
              <button>
                <SearchIcon />
              </button>
            </div>
            <input
              type='text'
              placeholder='Search'
              className='bg-transparent pl-10 pr-5 focus:outline-none text-sm text-neutral-800'
            />
          </div>

          <div className='flex gap-4'>
            <Link
              href='/hotel/register'
              className='text-sm flex items-center justify-center gap-1'>
              <SaleIcon />
              숙소 등록
            </Link>

            <Link href='/auth/signin'>
              <button className='bg-sage-600 text-sm font-semibold py-3 px-4'>
                로그인
              </button>
            </Link>
            <Link href='/auth/signup'>
              <button className='bg-sage-600 text-sm font-semibold py-3 px-4'>
                회원가입
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
