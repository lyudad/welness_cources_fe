import { toast } from 'react-toastify'
import axios from '../../utils/axios'
import { IRole } from '../../layouts/AuthContext'

export const becomeTrainer = async (): Promise<{ data: { newRole: IRole; token: string } } | void> => {
  try {
    return await axios.post('/users/become-trainer')
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
