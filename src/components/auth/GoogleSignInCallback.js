'use client'

import { useGoogleLoginUser } from '@/hooks/useUser'
import React, { useEffect } from 'react'

export default function GoogleSignInCallback(code) {
  console.log(code.code)
  const { submitGoogleLoginUser, isPending, isError, error } =
    useGoogleLoginUser()
  useEffect(() => {
    submitGoogleLoginUser(code.code)
  }, [])
  return <div>GoogleSignInCallback</div>
}
