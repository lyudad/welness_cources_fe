import axios from '../../utils/axios'
import { IGroup } from '../../layouts/AuthContext'
import { toast } from 'react-toastify'

interface GetGroupByIdProps {
  groupId: number
}

export const getGroupById = async ({ groupId }: GetGroupByIdProps): Promise<IGroup | undefined> => {
  let response

  try {
    const { data } = await axios.get(`/groups/${groupId}`)

    response = data
  } catch (e: any) {
    toast.info(e.response.data.message)
  }

  return response
}
