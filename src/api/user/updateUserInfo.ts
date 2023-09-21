import { toast } from 'react-toastify'
import axios from '../../utils/axios'
import { IUser } from '../../layouts/AuthContext'

interface UpdateUserInfoProps {
  firstName?: string
  lastName?: string
}

export const updateUserInfo = async ({ firstName, lastName }: UpdateUserInfoProps): Promise<{ data: IUser } | void> => {
  try {
    return await axios.patch('/users/update/', { firstName, lastName })
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
