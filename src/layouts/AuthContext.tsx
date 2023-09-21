import { useMutation } from '@tanstack/react-query'
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { getUserByIdQuery } from '../api/user/getUserById'

export interface IGroup {
  id: number
  name: string
  users:
    | {
        id: number
        firstName: string | null
        lastName: string | null
        email: string
        avatar: string | null
      }[]
    | null
  trainer: IUser
  trainerId: number | null
  createdAt?: string
  updatedAt?: string
}

export interface IRole {
  id: number
  value: string
}

export interface IUser {
  id: number
  firstName: string | null
  lastName: string | null
  email: string
  avatar: string | null
  roles: IRole[]
  group: IGroup
}

export interface AuthContextType {
  isInitialized: boolean
  isAuthenticated: boolean
  accessToken: string | null
  userRoles: IRole[] | null
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
  setUserRoles: Dispatch<SetStateAction<IRole[] | null>>
  setNewToken: (token: string) => void
  onAuth: (user: IUser, token: string) => void
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

  const setNewToken = useCallback((token?: string) => {
    if (token) {
      setAccessToken(token)
      Cookie.set('accessToken', token)
    }
  }, [])

  const removeToken = () => {
    setAccessToken(null)
    Cookie.remove('accessToken')
  }

  const logout = useCallback(async () => {
    setIsAuthenticated(false)
    setUserRoles(null)
    setUser(null)

    removeToken()

    router.push('/pages/login')
  }, [router])

  const onAuth = useCallback((user: IUser, token?: string) => {
    setIsAuthenticated(true)
    setUser(user)
    setUserRoles(user.roles)

    setNewToken(token)
  }, [])

  const { mutate } = useMutation(getUserByIdQuery, {
    onSuccess: response => {
      if (!response?.data) return

      onAuth(response.data)

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
    if (!accessTokenFromCookie) {
      logout()

      return
    }

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
      setUser,
      setUserRoles,
      setNewToken,
      onAuth,
      logout
    }),
    [isInitialized, isAuthenticated, logout, userRoles, onAuth, user, setUser, setUserRoles, setNewToken, accessToken]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
