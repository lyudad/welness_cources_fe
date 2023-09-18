import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useAuthContext } from './useAuthContext'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }: AuthGuardProps) => {
  const router = useRouter()

  const { isInitialized, isAuthenticated, accessToken } = useAuthContext()

  useEffect(() => {
    if (!isInitialized) return

    if (!isAuthenticated || !accessToken) {
      router.push('/pages/login')

      toast.warning('Unauthorized')
    }
  }, [accessToken, isAuthenticated, router])

  return <> {children} </>
}
