import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import axios, { fileApiAxios } from '@/config/axios-config'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/** 호텔 등록 */
const fetchRegisterHotel = async (formData) => {
  return await fileApiAxios.post('/api/v1/hotel/register', formData)
}

export const useRegisterHotel = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    mutate: submitRegister,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (formData) => {
      for (let [key, value] of formData.entries()) {
        console.log(key, value)
      }
      return fetchRegisterHotel(formData)
    },
    onSuccess: (res) => {
      console.log('호텔 등록 성공')
      console.log(res)

      if (!res.data.result) {
        toast.error('호텔 등록에 실패했습니다 🥲')
        return
      }

      toast.success('호텔이 성공적으로 등록되었습니다!')

      queryClient.invalidateQueries({ queryKey: ['hotels'] })
    },
    onError: (err) => {
      console.log('호텔 등록 실패')
      console.log(err)

      toast.error('호텔 등록에 실패했습니다 🥲')

      return err
    },
  })

  return { submitRegister, isPending, isError, error }
}

const fetchHotels = async (page) => {
  const { data } = await axios.get(`/api/v1/hotel/all?page=${page}`)

  console.log('fetchHotels')
  console.log(data)

  return data
}

export const useHotels = (page) => {
  const {
    data: hotels,
    isLoading,
    isFetching,
    isError,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['hotels', page],
    queryFn: () => fetchHotels(page),
    retry: 0,
    placeholderData: keepPreviousData,
  })

  return { hotels, isLoading, isFetching, isError, error, isPlaceholderData }
}
