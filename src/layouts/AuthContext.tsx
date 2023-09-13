import { useMutation } from '@tanstack/react-query'
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { getUserByIdQuery } from '../api/user/getUserById'

interface IRole {
  id: number
  value: string
}

interface IUser {
  id: number
  firstName: string | null
  lastName: string | null
  email: string
  roles: IRole[]
  group: string | null
}

export interface AuthContextType {
  isInitialized: boolean
  isAuthenticated: boolean
  accessToken: string | null
  userRoles: IRole[] | null
  user: IUser | null
  onAuth: (data: { user: IUser; token: string }) => void
  logout: VoidFunction
}

export interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter()

  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userRoles, setUserRoles] = useState<IRole[] | null>(null)
  const [user, setUser] = useState<IUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const logout = useCallback(async () => {
    setIsAuthenticated(false)
    setUserRoles(null)
    setUser(null)

    Cookie.remove('accessToken')

    router.push('/pages/login')
  }, [router])

  const onAuth = useCallback((data: { user: IUser; token: string }) => {
    setIsAuthenticated(true)
    setAccessToken(data.token)
    setUser(data.user)
    setUserRoles(data.roles)

    if (data.token) {
      Cookie.set('accessToken', data.token)
    }
  }, [])

  const { mutate } = useMutation(getUserByIdQuery, {
    onSuccess: data => {
      onAuth(data.data)
      router.push('/')
    },
    onError: () => {
      setIsInitialized(true)
      logout()
    }
  })

  useEffect(() => {
    if (isInitialized) return

    const accessTokenFromCookie = Cookie.get('accessToken')

    if (!accessTokenFromCookie) return setIsInitialized(true)

    try {
      const decodedToken: {
        email: string
        id: number
        roles: IRole[]
      } = jwt_decode(accessTokenFromCookie)

      if (!decodedToken) return setIsInitialized(true)

      mutate(decodedToken.id)
    } catch (e) {
      console.error(e)
      logout()
    }
  }, [isInitialized])

  const memoizedValue = useMemo(
    () => ({
      isInitialized,
      isAuthenticated,
      accessToken,
      userRoles,
      user,
      onAuth,
      logout
    }),
    [isInitialized, isAuthenticated, logout, userRoles, onAuth, user, accessToken]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
