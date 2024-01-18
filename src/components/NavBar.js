'use client'

import Link from 'next/link'
import CategoryMenu from './ui/navbar-menu/CategoryMenu'
import HotelIcon from './ui/icon/HotelIcon'
import Dropdown from './ui/navbar-menu/Dropdown'

export default function Navbar() {
    return (
        <div className='navbar flex bg-transparent'>
            <div className='flex flex-1 gap-2'>
                <Link
                    href='/'
                    className='font-semibold text-2xl flex justify-center items-center px-3 text-sage-750 dark:text-coral-500'>
                    HOTSIX
                </Link>
                <div className='hidden lg:flex'>
                    <ul className='flex items-center gap-2 px-1 text-sage-700 dark:text-cream text-sm font-semibold tracking-widest'>
                        <CategoryMenu/>
                    </ul>
                </div>
            </div>
            <div className='flex-none gap-1'>
                <div className='lg:hidden flex gap-1'></div>
                <div className='hidden lg:flex flex-none gap-10 h-full items-center'>
                    <div className='flex gap-4'>
                        <Link
                            href='/hotel/register'
                            className='text-sm flex items-center justify-center gap-1'>
                            <HotelIcon/>
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
            <Dropdown menu='dropdown'/>
        </div>
    )
}
