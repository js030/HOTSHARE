'use client'

import React, { useState } from 'react'
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
} from 'react-icons/fa'

export default function HotelType() {
  const [selectedType, setSelectedType] = useState('')

  const handleSelectType = (type) => {
    setSelectedType(type)
  }

  const isTypeSelected = (type) => selectedType === type

  return (
    <div className='flex flex-col justify-center items-center'>
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
