import React from 'react'
import HotelLocationMap from '@/components/hotel/HotelLocationMap'

export default function page({ searchParams }) {
  console.log(searchParams)
  return <HotelLocationMap address={searchParams.address} />
}
