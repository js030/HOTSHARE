import AvatarMenu from './AvatarMenu'
import Link from 'next/link'

import CategoryMenu from '../CategoryMenu'

export default function DropdownMenu({ menu, setIsMenuOpen, login, setLogin }) {
  return (
    <ul
      tabIndex={0}
      className='menu menu-md dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52'>
      {menu === 'dropdown' ? (
        <>
          <CategoryMenu setIsMenuOpen={setIsMenuOpen} />
          <div
            style={{ height: '1px' }}
            className='bg-gray-300 block my-3'></div>
          {user ? (
            <li>
              <a>My</a>
              <ul className='p-2'>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link href='/products/cart'>장바구니</Link>
                </li>
                <AvatarMenu setIsMenuOpen={setIsMenuOpen} />
              </ul>
            </li>
          ) : (
            <Link href='/auth/signin'>
              <button className='btn ml-2'>로그인</button>
            </Link>
          )}
        </>
      ) : (
        <AvatarMenu setIsMenuOpen={setIsMenuOpen} setLogin={setLogin} />
      )}
    </ul>
  )
}
