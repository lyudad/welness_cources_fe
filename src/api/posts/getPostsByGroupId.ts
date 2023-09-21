import axios from '../../utils/axios'
import { IPost } from '../../layouts/AuthContext'
import { toast } from 'react-toastify'

interface GgetPostsByGroupIdProps {
  groupId: number
}

export const getPostsByGroupId = async ({ groupId }: GgetPostsByGroupIdProps): Promise<IPost[] | undefined> => {
  let response

  try {
    const { data } = await axios.get(`/posts/group/${groupId}`)

    response = data
  } catch (e: any) {
    toast.info(e.response.data.message)
  }

  return response
}
