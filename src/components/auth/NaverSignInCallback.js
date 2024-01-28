'use client'

import { useNaverLoginUser } from '@/hooks/useUser'
import React, { useEffect } from 'react'

export default function NaverSignInCallback(params) {
  const { submitNaverLoginUser, isPending, isError, error } =
    useNaverLoginUser()

  useEffect(() => {
    submitNaverLoginUser(params)
  }, [])

  return <div>네이버 로그인 중입니다...</div>
}
