import Link from 'next/link'
import { navDefaultMenus } from '@/constants/navbar'

export default function CategoryMenu({ setIsMenuOpen }) {
  return (
    <>
      {navDefaultMenus.map((category) => (
        <li
          key={category.id}
          className='px-1 hover:text-coral-400'
          onClick={() =>
            typeof setIsMenuOpen === 'function' && setIsMenuOpen(false)
          }>
          <Link href={category.link}>{category.title}</Link>
        </li>
      ))}
    </>
  )
}
