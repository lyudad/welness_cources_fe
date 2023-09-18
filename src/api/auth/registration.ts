import { toast } from 'react-toastify'
import axios from '../../utils/axios'

interface RegisterProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const registerQuery = async ({ email, password, firstName, lastName }: RegisterProps) => {
  try {
    return await axios.post('/auth/sign-up', { firstName, lastName, email, password })
  } catch (e: any) {
    const { message } = e.response.data

    toast.info(Array.isArray(message) ? message[0] : message)
  }
}
