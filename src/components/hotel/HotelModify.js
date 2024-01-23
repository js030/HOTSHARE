'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiXCircle } from 'react-icons/fi'
import {
  FaAddressBook,
  FaHome,
  FaBuilding,
  FaCaravan,
  FaHotel,
  FaCampground,
  FaTree,
  FaHouseUser,
  FaShippingFast,
} from 'react-icons/fa'
import {
  MdRemove,
  MdAdd,
  MdAddHome,
  MdDone,
  MdWifi,
  MdTv,
  MdKitchen,
  MdLocalParking,
  MdFitnessCenter,
  MdPool,
  MdFreeBreakfast,
  MdOutdoorGrill,
  MdDeck,
  MdLocalLaundryService,
  MdAcUnit,
} from 'react-icons/md'
import { Button } from '@nextui-org/react'
import { useHotelDetail, useModifyHotel } from '@/hooks/useHotel'
import { Input, Textarea } from '@nextui-org/react'

export default function HotelModify({ id }) {
  const { hotel, isLoading, isError, error } = useHotelDetail(id)
  const [images, setImages] = useState([])
  const [deletedImages, setDeletedImages] = useState([])
  const [newImages, setnewImages] = useState([])
  const [selectedType, setSelectedType] = useState('')
  const [roomDetails, setRoomDetails] = useState({
    hotelName: '',
    hotelDescription: '',
    numberOfBedrooms: 1,
    numberOfBeds: 1,
    numberOfBathrooms: 1,
    maximumGuests: 1,
    hotelAddress: '',
    hotelDetailAddress: '',
    hotelPricePerNight: 0,
    hotelType: '',
    hotelAmenities: [],
  })

  const {
    submitModify,
    isPending,
    isError: isModifyError,
    error: modifyError,
  } = useModifyHotel()

  const amenitiesOptions = [
    { type: 'WiFi', icon: <MdWifi /> },
    { type: 'TV', icon: <MdTv /> },
    { type: '주방', icon: <MdKitchen /> },
    { type: '건물 내 무료 주차', icon: <MdLocalParking /> },
    { type: '건물 내 유료 주차', icon: <MdLocalParking /> },
    { type: '세탁기', icon: <MdLocalLaundryService /> },
    { type: '에어컨', icon: <MdAcUnit /> },
    { type: '주차장', icon: <MdLocalParking /> },
    { type: '헬스장', icon: <MdFitnessCenter /> },
    { type: '수영장', icon: <MdPool /> },
    { type: '조식 제공', icon: <MdFreeBreakfast /> },
    { type: '바베큐 그릴', icon: <MdOutdoorGrill /> },
    { type: '야외 식사 공간', icon: <MdDeck /> },
  ]

  const isFile = (image) => image instanceof File
  const isTypeSelected = (type) => roomDetails.hotelType === type

  // hotel 객체가 변경될 때만 images 상태를 업데이트합니다.
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.body.appendChild(script)

    if (hotel?.imagesResponse?.imageUrl) {
      setImages(hotel.imagesResponse.imageUrl)
    }
    setRoomDetails({
      numberOfBedrooms: hotel?.roomCnt,
      numberOfBeds: hotel?.bedCnt,
      numberOfBathrooms: hotel?.bathroomCnt,
      maximumGuests: hotel?.maxPeople,
      hotelAddress: hotel?.address,
      hotelDetailAddress: hotel?.addressDetail,
      hotelName: hotel?.nickname,
      hotelDescription: hotel?.description,
      hotelPricePerNight: hotel?.price,
      hotelType: hotel?.hotelType,
      hotelAmenities: Array.isArray(hotel?.facility) ? hotel.facility : [],
    })
  }, [hotel])

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles])
    setnewImages((prevImages) => [...prevImages, ...acceptedFiles])
  }, [])

  console.log(hotel)
  console.log(hotel?.facility)
  console.log(newImages)
  console.log(deletedImages)

  const handleIncrement = (field) => () =>
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      [field]: prevDetails[field] + 1,
    }))

  const handleDecrement = (field) => () =>
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      [field]: prevDetails[field] > 1 ? prevDetails[field] - 1 : 1,
    }))

  const handleChange = (e) => {
    setRoomDetails({
      ...roomDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleAmenityClick = (amenity) => {
    setRoomDetails((prevDetails) => {
      // 현재 편의시설 목록에서 선택된 편의시설이 이미 있는지 확인
      const isAmenitySelected = prevDetails.hotelAmenities?.includes(
        amenity.type
      )

      // 선택된 편의시설이 이미 있다면 제거, 없다면 추가
      const updatedAmenities = isAmenitySelected
        ? prevDetails?.hotelAmenities.filter((item) => item !== amenity.type)
        : [...prevDetails?.hotelAmenities, amenity.type]

      // 새로운 편의시설 목록으로 상태 업데이트
      return {
        ...prevDetails,
        hotelAmenities: updatedAmenities,
      }
    })
  }

  const modifySubmitHandler = (e) => {
    e.preventDefault()

    console.log(roomDetails)
    console.log(newImages)
    console.log(deletedImages)

    const formData = new FormData()

    formData.append(
      'hotelInfo',
      new Blob([JSON.stringify(roomDetails)], { type: 'application/json' })
    )

    if (newImages.length > 0) {
      // 이미지 파일 추가
      newImages.forEach((image, index) => {
        console.log(image)
        formData.append('files', image)
      })
    }

    if (deletedImages.length > 0) {
      formData.append('deletedImages', deletedImages)
    }

    console.log(formData)

    submitModify({ hotelId: id, formData })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const removeImage = (index) => {
    const imageToRemove = images[index]

    setImages((prevImages) => prevImages.filter((_, i) => i !== index))

    // newImages에서도 동일한 이미지를 찾아서 삭제합니다.
    if (isFile(imageToRemove)) {
      setnewImages((prevImages) =>
        prevImages.filter((image) => image !== imageToRemove)
      )
    } else {
      // 이미지가 File 객체가 아니라면, 원래부터 있던 이미지입니다.
      // 이 경우, deletedImages에 추가합니다.
      setDeletedImages((prevDeletedImages) => [
        ...prevDeletedImages,
        imageToRemove,
      ])
    }
  }

  const handleSearchAddress = (e) => {
    e.preventDefault()
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          setRoomDetails({ ...roomDetails, ['address']: data.address })
        },
      }).open()
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const handleSelectType = (type) => {
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      hotelType: type,
    }))
    setSelectedType(type)
  }

  if (isLoading) return <div></div>

  return (
    <div>
      <h1 className='text-2xl text-center mb-12 text-stone-400'>
        숙소 정보 수정
      </h1>{' '}
      <p className='flex justify-center text-lg'>
        숙소 사진을 첨부해주세요. (최소 5장)
      </p>
      <div className='border-t-2 border-gray-200 mt-4 pt-4'></div>
      <div
        {...getRootProps()}
        className='border-dashed border-4 border-gray-200 p-4 text-center cursor-pointer'>
        <input {...getInputProps()} />
        <p>여기에 사진을 드래그 앤 드랍하거나 클릭하여 선택하세요</p>
      </div>
      <div className='flex flex-wrap mt-4'>
        {images.map((image, index) => (
          <div key={index} className='w-1/5 p-1 border'>
            <div className='relative'>
              <img
                src={isFile(image) ? URL.createObjectURL(image) : image}
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
      <div className='flex flex-col mx-auto w-full mt-10 '>
        <p className='flex justify-center text-lg'>숙소 주소를 수정해주세요.</p>
        <div className='border-t-2 border-gray-200 mt-4 pt-4'></div>
        <div className='flex justify-center items-center space-x-3'>
          <FaAddressBook className='min-w-fit' size={20} />
          <input
            className='flex w-1/2 border border-gray-300 rounded py-2 pl-8 mb-3'
            type='text'
            name='hotelAddress'
            placeholder='주소'
            value={roomDetails.hotelAddress}
            onChange={handleChange}
          />
          <button
            onClick={handleSearchAddress}
            className='px-5 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none'>
            검색
          </button>
        </div>

        <div className='flex justify-center items-center space-x-3'>
          <MdAddHome className='min-w-fit' size={20} />
          <input
            className='flex border border-gray-300 rounded py-2 pl-8'
            type='text'
            value={roomDetails.hotelDetailAddress}
            name='hotelDetailAddress'
            placeholder='상세주소'
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='mt-10'>
        <p className='flex justify-center text-lg'>
          숙소 기본 정보를 수정해주세요.
        </p>
        <div className='border-t-2 border-gray-200 mt-4 pt-4'></div>
        <div className='flex flex-col'>
          <div className='flex justify-center items-center space-x-2 p-3   border-gray-200'>
            <p>침실의 개수:</p>
            <button
              className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-300 hover:bg-red-500 text-white'
              onClick={handleDecrement('numberOfBedrooms')}>
              <MdRemove />
            </button>
            <p>{roomDetails.numberOfBedrooms}</p>
            <button
              className='inline-flex  items-center justify-center w-6 h-6 rounded-full bg-blue-300 hover:bg-blue-500 text-white'
              onClick={handleIncrement('numberOfBedrooms')}>
              <MdAdd />
            </button>
          </div>
          <div className='flex justify-center items-center space-x-2 p-3    border-gray-200'>
            <p>침대의 개수:</p>
            <button
              className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-300 hover:bg-red-500 text-white'
              onClick={handleDecrement('numberOfBeds')}>
              <MdRemove />
            </button>
            <p>{roomDetails.numberOfBeds}</p>
            <button
              className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-300 hover:bg-blue-500 text-white'
              onClick={handleIncrement('numberOfBeds')}>
              <MdAdd />
            </button>
          </div>
          <div className='flex justify-center items-center space-x-2 p-3  border-gray-200'>
            <p>욕실의 개수:</p>
            <button
              className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-300 hover:bg-red-500 text-white'
              onClick={handleDecrement('numberOfBathrooms')}>
              <MdRemove />
            </button>
            <p>{roomDetails.numberOfBathrooms}</p>
            <button
              className='inline-flexitems-center justify-center w-6 h-6 rounded-full bg-blue-300 hover:bg-blue-500 text-white'
              onClick={handleIncrement('numberOfBathrooms')}>
              <MdAdd />
            </button>
          </div>
          <div className='flex justify-center items-center space-x-2 p-3  '>
            <p>최대 수용가능 인원:</p>
            <button
              className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-300  hover:bg-red-500 text-white'
              onClick={handleDecrement('maximumGuests')}>
              <MdRemove />
            </button>
            <p>{roomDetails.maximumGuests}</p>
            <button
              className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-300 hover:bg-blue-500 text-white'
              onClick={handleIncrement('maximumGuests')}>
              <MdAdd />
            </button>
          </div>
        </div>
        <div className='mt-10'>
          <p className='flex justify-center text-lg'>
            숙소 이름과 설명를 수정해주세요.
          </p>
          <div className='border-t-2 border-gray-200 mt-4 pt-4'></div>
          <div className='flex flex-col space-y-6 items-center'>
            <Input
              name='hotelName'
              style={{ height: '2rem' }}
              className='w-72'
              placeholder='숙소 이름'
              value={roomDetails.hotelName}
              onChange={handleChange}
            />
            <Textarea
              name='hotelDescription'
              style={{ height: '20rem' }}
              className='w-72'
              placeholder='숙소 설명'
              value={roomDetails.hotelDescription}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='mt-10'>
          <p className='flex justify-center text-lg'>
            숙소 하루 숙박비를 수정해주세요.
          </p>
          <div className='border-t-2 border-gray-200 mt-4 pt-4'></div>
          <div className='flex justify-center text-center'>
            <Input
              name='hotelPricePerNight'
              className='w-72'
              placeholder='숙박비를 입력하세요 (숫자만)'
              value={roomDetails.hotelPricePerNight}
              onChange={handleChange}
            />
            <p className='flex flex-col justify-center ml-3'>원</p>
          </div>
        </div>

        <div className='mt-10'>
          <p className='flex justify-center text-lg'>
            숙소 유형을 수정해주세요.
          </p>
          <div className='border-t-2 border-gray-200 mt-4 pt-4'></div>
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
                  isTypeSelected(type) ? 'bg-amber-800 border-white' : ''
                }`}
                startContent={getIconForType(type)}
                onClick={() => handleSelectType(type)}>
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <p className='flex justify-center text-lg'>
          숙소 편의시설을 수정해주세요.
        </p>
        <div className='border-t-2 border-gray-200 mt-4 pt-4'></div>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
          {amenitiesOptions.map((amenity) => (
            <Button
              name='hotelAmenities'
              key={amenity.type}
              color={
                roomDetails?.hotelAmenities?.includes(amenity.type)
                  ? 'primary'
                  : 'default'
              }
              onClick={() => handleAmenityClick(amenity)}>
              {amenity.icon} {amenity.type}{' '}
              {roomDetails?.hotelAmenities?.includes(amenity.type) && (
                <MdDone />
              )}
            </Button>
          ))}
        </div>
        <div className='flex justify-center mt-5'>
          선택된 편의 시설: {roomDetails?.hotelAmenities.join(', ')}
        </div>
      </div>
      <div className='w-full flex justify-center items-center mt-5 '>
        <Button onClick={modifySubmitHandler} className='bg-amber-400'>
          수정하기
        </Button>
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
