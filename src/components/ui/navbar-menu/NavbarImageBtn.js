import Image from 'next/image'

export default function NavbarImageBtn() {
  const defaultImageUrl =
    'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800' // 기본 이미지 URL을 설정합니다.
  const imageUrl = defaultImageUrl // 사용자의 프로필 이미지가 없을 경우 기본 이미지를 사용합니다.

  return (
    <div className='w-10 rounded-full'>
      <Image
        alt='Tailwind CSS Navbar component'
        src={imageUrl}
        className='object-cover rounded-full'
        width={40}
        height={40}
      />
    </div>
  )
}
