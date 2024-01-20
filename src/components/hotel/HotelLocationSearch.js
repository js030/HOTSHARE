'use client'

import React, { useState, useEffect } from 'react'
import DaumPostcode from '@actbase/react-daum-postcode'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function HotelLocationSearch() {
  const router = useRouter()

  const handleNext = () => {
    router.push('/hotel/register/location/map')
  }

  const handlePrevious = () => {
    router.push('/hotel/register')
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
      <div>
        <div className='flex justify-center items-center'>
          <div className='flex flex-col space-y-4'>
            <p>주소를 검색해주세요.</p>
          </div>
        </div>

        <DaumPostcode
          jsOptions={{ animation: true }}
          onSelected={handleAddress}
        />
      </div>
      <div className='flex justify-around mt-20'>
        <Button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5'
          onClick={handlePrevious} // 다음 단계로 넘어가는 함수
        >
          <span>이전</span>
          <FaArrowLeft />{' '}
        </Button>

        <Button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'
          onClick={handleNext} // 다음 단계로 넘어가는 함수
        >
          <span>다음</span>
          <FaArrowRight />{' '}
        </Button>
      </div>
    </div>
  )
}
