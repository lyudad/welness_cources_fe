import { toast } from 'react-toastify'
import axios from '../../utils/axios'

export const deleteAvatar = async (): Promise<{ data: boolean } | void> => {
  try {
    return await axios.delete('/users/avatar/')
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
