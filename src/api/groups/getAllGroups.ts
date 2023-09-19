import { toast } from 'react-toastify'
import axios from '../../utils/axios'
import { IGroup } from '../../layouts/AuthContext'

export const getAllGroups = async (): Promise<IGroup[] | undefined> => {
  let response

  try {
    const { data } = await axios.get('/groups')

    response = data
  } catch (e: any) {
    toast.info(e.response.data.message)
  }

  return response
}
