'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import {
  FaHome,
  FaBuilding,
  FaCaravan,
  FaHotel,
  FaCampground,
  FaTree,
  FaHouseUser,
  FaShippingFast,
  FaArrowRight,
} from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { hotelTypeState } from '@/util/hotelState'

export default function HotelType() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState('')
  const [hotelType, setHotelType] = useRecoilState(hotelTypeState) // Recoil 상태 사용
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSelectType = (type) => {
    setHotelType(type)
    setSelectedType(type)
  }

  const handleNext = (e) => {
    e.preventDefault()
    router.push('/hotel/register/location')
  }

  const isTypeSelected = (type) => selectedType === type

  return (
    <div
      className={`flex flex-col justify-center items-center transition-all duration-1000 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}>
      <div className='flex flex-col'>
        <div className='flex justify-center mb-5'>
          <p>숙소의 유형을 선택해주세요.</p>
        </div>
        <div>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
            {[
              '주택',
              '아파트',
              '캠핑카',
              '호텔',
              '텐트',
              '통나무집',
              '게스트용 별채',
              '컨테이너 하우스',
            ].map((type, index) => (
              <Button
                key={index}
                className={`bg-amber-500 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded ${
                  isTypeSelected(type) ? 'bg-amber-400 border-white' : ''
                }`}
                startContent={getIconForType(type)}
                onClick={() => handleSelectType(type)}>
                {type}
              </Button>
            ))}
            <div className='flex justify-center mt-20'>
              <Button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleNext} // 다음 단계로 넘어가는 함수
              >
                <span className='mr-2'>다음</span>
                <FaArrowRight />{' '}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getIconForType(type) {
  switch (type) {
    case '주택':
      return <FaHome />
    case '아파트':
      return <FaBuilding />
    case '캠핑카':
      return <FaCaravan />
    case '호텔':
      return <FaHotel />
    case '텐트':
      return <FaCampground />
    case '통나무집':
      return <FaTree />
    case '게스트용 별채':
      return <FaHouseUser />
    case '컨테이너 하우스':
      return <FaShippingFast />
    default:
      return null
  }
}
