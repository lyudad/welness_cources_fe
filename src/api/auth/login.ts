import { toast } from 'react-toastify'
import axios from '../../utils/axios'
import { IUser } from '../../layouts/AuthContext'

interface LoginProps {
  email: string
  password: string
}

export const loginQuery = async ({
  email,
  password
}: LoginProps): Promise<{ data: { user: IUser; token: string } } | void> => {
  try {
    return await axios.post('/auth/login', { email, password })
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
