import { toast } from 'react-toastify'
import axios from '../../utils/axios'

export const uploadNewAvatar = async (file: File): Promise<{ data: { avatar: string } } | void> => {
  try {
    const formData = new FormData()

    formData.append('file', file)

    return await axios.post('/users/avatar/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
