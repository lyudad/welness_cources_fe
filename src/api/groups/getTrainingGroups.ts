import { toast } from 'react-toastify'
import axios from '../../utils/axios'
import { IGroup } from '../../layouts/AuthContext'

export const getTrainingGroups = async (): Promise<{ data: IGroup[] | undefined }> => {
  try {
    return await axios.get('/groups/training')
  } catch (e: any) {
    toast.info(e.response.data.message)

    return { data: undefined }
  }
}
