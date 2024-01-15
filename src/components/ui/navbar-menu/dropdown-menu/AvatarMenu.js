/** @format */

import Link from 'next/link'
import { navAvatarMenus } from '@/constants/navbar'

export default function AvatarMenu({ setIsMenuOpen }) {
  return (
    <>
      {/* {navAvatarMenus.map((menu) => (
        <li key={menu.id} onClick={() => setIsMenuOpen(false)}>
          <Link href={menu.link}>{menu.title}</Link>
        </li>
      ))} */}
      <li onClick={() => setIsMenuOpen(false)}>
        <Link href='/mypage'>마이페이지</Link>
      </li>
      <li onClick={() => setIsMenuOpen(false)}></li>
    </>
  )
}
