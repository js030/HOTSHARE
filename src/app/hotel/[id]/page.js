import React from 'react'
import HotelDetail from '@/components/hotel/HotelDetail'

export default function page({ params: { id } }) {
  return <HotelDetail id={id} />
}
