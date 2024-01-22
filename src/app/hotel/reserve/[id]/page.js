import HotelReservation from '@/components/hotel/HotelReservation'
import React from 'react'

export default function page({ params: { id } }) {
  return <HotelReservation id={id} />
}
