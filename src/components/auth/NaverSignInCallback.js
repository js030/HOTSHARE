'use client'

import { useNaverLoginUser } from '@/hooks/useUser'
import React, { useEffect } from 'react'

export default function NaverSignInCallback(code) {
  console.log(code.code)

  const { submitNaverLoginUser, isPending, isError, error } =
    useNaverLoginUser()

  useEffect(() => {
    submitNaverLoginUser(code.code)
  }, [])

  return <div>NaverSignInCallback</div>
}
