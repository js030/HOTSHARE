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

          <li>
            <a>My</a>
            <ul className='p-2'>
              <li onClick={() => setIsMenuOpen(false)}></li>
              <AvatarMenu setIsMenuOpen={setIsMenuOpen} />
            </ul>
          </li>

          <Link href='/auth/signin'></Link>
        </>
      ) : (
        <AvatarMenu setIsMenuOpen={setIsMenuOpen} setLogin={setLogin} />
      )}
    </ul>
  )
}
