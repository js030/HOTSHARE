import { atom } from 'recoil'

export const hotelTypeState = atom({
  key: 'hotelTypeState',
  default: '', // 기본값을 적절히 설정하세요.
})

export const hotelAddressState = atom({
  key: 'hotelAddressState',
  default: '',
})

export const hotelDetailAddressState = atom({
  key: 'hotelDetailAddressState',
  default: '',
})

export const numberOfBedroomsState = atom({
  key: 'numberOfBedroomsState',
  default: 1,
})

export const numberOfBedsState = atom({
  key: 'numberOfBedsState',
  default: 1,
})

export const numberOfBathroomsState = atom({
  key: 'numberOfBathroomsState',
  default: 1,
})

export const maximumGuestsState = atom({
  key: 'maximumGuestsState',
  default: 1,
})

export const hotelAmenitiesState = atom({
  key: 'hotelAmenitiesState',
  default: [], // 편의시설은 배열로 관리
})

export const hotelNameState = atom({
  key: 'hotelNameState',
  default: '',
})

export const hotelDescriptionState = atom({
  key: 'hotelDescriptionState',
  default: '',
})

export const hotelPricePerNightState = atom({
  key: 'hotelPricePerNightState',
  default: 0,
})

export const hotelImagesState = atom({
  key: 'hotelImagesState',
  default: [], // 이미지는 배열로 관리
})
