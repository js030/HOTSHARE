'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@nextui-org/react'
import { FiXCircle } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useRegisterHotel } from '@/hooks/useHotel'
import {
  hotelTypeState,
  hotelAddressState,
  hotelDetailAddressState,
  numberOfBedroomsState,
  numberOfBedsState,
  numberOfBathroomsState,
  maximumGuestsState,
  hotelAmenitiesState,
  hotelNameState,
  hotelDescriptionState,
  hotelPricePerNightState,
  hotelImagesState,
} from '@/util/hotelState'

export default function HotelImage() {
  const [images, setImages] = useRecoilState(hotelImagesState)
  const [hotelType] = useRecoilState(hotelTypeState)
  const [hotelAddress] = useRecoilState(hotelAddressState)
  const [hotelDetailAddress] = useRecoilState(hotelDetailAddressState)
  const [numberOfBedrooms] = useRecoilState(numberOfBedroomsState)
  const [numberOfBeds] = useRecoilState(numberOfBedsState)
  const [numberOfBathrooms] = useRecoilState(numberOfBathroomsState)
  const [maximumGuests] = useRecoilState(maximumGuestsState)
  const [hotelAmenities] = useRecoilState(hotelAmenitiesState)
  const [hotelName] = useRecoilState(hotelNameState)
  const [hotelDescription] = useRecoilState(hotelDescriptionState)
  const [hotelPricePerNight] = useRecoilState(hotelPricePerNightState)

  const { submitRegister, isPending, isError, error } = useRegisterHotel()

  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleComplete = () => {
    const formData = new FormData()

    const hotelInfo = {
      hotelType: hotelType,
      hotelAddress: hotelAddress,
      hotelDetailAddress: hotelDetailAddress,
      numberOfBedrooms: numberOfBedrooms,
      numberOfBeds: numberOfBeds,
      numberOfBathrooms: numberOfBathrooms,
      maximumGuests: maximumGuests,
      hotelAmenities: hotelAmenities,
      hotelName: hotelName,
      hotelDescription: hotelDescription,
      hotelPricePerNight: hotelPricePerNight,
    }

    formData.append(
      'hotelInfo',
      new Blob([JSON.stringify(hotelInfo)], { type: 'application/json' })
    )

    // 이미지 파일 추가
    images.forEach((image, index) => {
      console.log(image)
      formData.append('files', image)
    })

    submitRegister(formData)
    router.push('/hotel')
  }

  const handlePrevious = () => {
    router.push('/hotel/register/price')
  }

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div
      className={`container mx-auto p-4 space-y-8 transition-all duration-1000 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}>
      <p className='flex justify-center mb-5'>
        숙소의 사진을 첨부해주세요. (최소 5장)
      </p>
      <div
        {...getRootProps()}
        className='border-dashed border-4 border-gray-200 p-4 text-center cursor-pointer'>
        <input {...getInputProps()} />
        <p>여기에 사진을 드래그 앤 드랍하거나 클릭하여 선택하세요</p>
      </div>
      <div className='flex flex-wrap mt-4'>
        {images.map((file, index) => (
          <div key={index} className='w-1/5 p-1 border'>
            <div className='relative'>
              <img
                src={URL.createObjectURL(file)}
                alt={`미리보기 ${index}`}
                className='w-full h-auto'
              />
              <Button
                auto
                flat
                color='error'
                className='absolute top-0 right-0'
                onClick={() => removeImage(index)}>
                <FiXCircle />
              </Button>
            </div>
          </div>
        ))}
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
          onClick={handleComplete} // 다음 단계로 넘어가는 함수
        >
          <span>등록 완료</span>
          <FaArrowRight />{' '}
        </Button>
      </div>
    </div>
  )
}
