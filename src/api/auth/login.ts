import { toast } from 'react-toastify'
import axios from '../../utils/axios'

interface LoginProps {
  email: string
  password: string
}

export const loginQuery = async ({ email, password }: LoginProps) => {
  try {
    return await axios.post('/auth/login', { email, password })
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
