import { toast } from 'react-toastify'
import axios from '../../utils/axios'

interface ChangePasswordProps {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const changePassword = async ({
  currentPassword,
  newPassword,
  confirmPassword
}: ChangePasswordProps): Promise<{ data: boolean } | void> => {
  try {
    return await axios.patch('/auth/password/change/', {
      currentPassword,
      newPassword,
      confirmPassword
    })
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
