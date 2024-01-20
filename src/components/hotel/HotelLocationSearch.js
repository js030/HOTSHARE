'use client'

import React, { useState, useEffect } from 'react'
import DaumPostcode from '@actbase/react-daum-postcode'
import { useRouter } from 'next/navigation'

export default function HotelLocationInput() {
  const router = useRouter()
  const [isOpenPost, setIsOpenPost] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleOpenPost = (e) => {
    e.preventDefault()
    setIsOpenPost(true)
  }

  const handleAddress = (data) => {
    let fullAddress = data.address
    let extraAddress = ''
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    router.push(`/hotel/register/location/map?address=${fullAddress}`)
  }

  return (
    <div>
      <div
        className={`flex justify-center items-center transition-all duration-1000 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
        <div className='flex flex-col space-y-4'>
          <p>주소를 검색해주세요.</p>
          <button
            onClick={handleOpenPost}
            className='px-4 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none'>
            주소 검색
          </button>
        </div>
      </div>
      {isOpenPost && (
        <DaumPostcode
          jsOptions={{ animation: true }}
          onSelected={handleAddress}
        />
      )}
    </div>
  )
}
