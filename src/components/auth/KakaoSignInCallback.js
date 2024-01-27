'use client'

import React, { useEffect } from 'react'
import axios from '../../config/axios-config'
import { useKakaoLoginUser } from '@/hooks/useUser'

export default function KakaoSignInCallback({ code }) {
  const { submitKakaoLoginUser, isPending, isError, error } =
    useKakaoLoginUser()

  useEffect(() => {
    submitKakaoLoginUser(code)
  }, [])

  return (
    <div>
      <p>카카오 로그인 처리 중...</p>
    </div>
  )
}
