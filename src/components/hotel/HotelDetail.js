'use client'

import React from 'react'
import { useHotelDetail } from '@/hooks/useHotel'

export default function HotelDetail({ id }) {
  const { hotel, isLoading, isError, error } = useHotelDetail(Number(id))

  console.log(hotel)

  return <div>HotelDetail</div>
}
