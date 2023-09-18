import { toast } from 'react-toastify'
import axios from '../../utils/axios'

interface CreateGroupWithTrainerProps {
  userId: number
  groupName: string
}

export const createGroupWithTrainer = async ({
  userId,
  groupName
}: CreateGroupWithTrainerProps): Promise<{ data: boolean } | void> => {
  try {
    return await axios.post(`/groups/user/${userId}`, {
      name: groupName
    })
  } catch (e: any) {
    toast.info(e.response.data.message)
  }
}
