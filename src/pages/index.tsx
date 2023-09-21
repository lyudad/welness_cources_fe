import Grid from '@mui/material/Grid'

import ApexChartWrapper from '../@core/styles/libs/react-apexcharts'

import Table from '../views/dashboard/Table'
import Trophy from '../views/dashboard/Trophy'
import UserLayout from '../layouts/UserLayout'
import { useAuthContext } from '../layouts/useAuthContext'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { becomeTrainer } from '../api/user/becomeTrainer'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createGroupWithTrainer } from '../api/groups/createGroupWithTrainer'
import { FormEvent, useState } from 'react'
import { getTrainingGroups } from '../api/groups/getTrainingGroups'

const Dashboard = () => {
  const [groupName, setGroupName] = useState<string>('')

  const { user, userRoles, setUserRoles, setNewToken } = useAuthContext()

  const { data: trainingGroups, refetch } = useQuery(['getTrainingGroups'], getTrainingGroups, {
    enabled: !!userRoles?.find(({ value }) => value === 'TRAINER')
  })

  const { mutate: becomeTrainerMutation } = useMutation(becomeTrainer, {
    onSuccess: response => {
      if (!response?.data) return

      setNewToken(response.data.token)

      setUserRoles(prev => {
        if (!prev?.length) return null

        return [...prev, response.data.newRole]
      })
    }
  })

  const { mutate: createGroupMutation } = useMutation(createGroupWithTrainer, {
    onSuccess: response => {
      if (!response?.data) return
      refetch()
    }
  })

  const isTrainer = !!userRoles?.find(({ value }) => value === 'TRAINER')

  const onBecomeTrainerClick = () => {
    becomeTrainerMutation()
  }

  const onCreateCourseClick = (e: FormEvent) => {
    e.preventDefault()

    if (!user?.id || !groupName.trim()) return

    createGroupMutation({ userId: user.id, groupName: groupName.trim() })
  }

  return (
    <ApexChartWrapper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {!isTrainer && (
        <Button variant='contained' size='large' onClick={onBecomeTrainerClick}>
          Become trainer
        </Button>
      )}

      {isTrainer &&
        (!!trainingGroups?.data?.length ? (
          <Stack rowGap={10} width='100%'>
            {trainingGroups?.data.map(group => {
              return (
                <Grid key={group.id} container spacing={6}>
                  <Grid item xs={12} md={4}>
                    <Trophy groupName={group.name} amountOfUsers={group.users?.length || 0} />
                  </Grid>

                  {!!group.users?.length ? (
                    <Grid item xs={10}>
                      <Table users={group.users} />
                    </Grid>
                  ) : (
                    <Grid item xs={10}>
                      <Typography>No one joined yet</Typography>
                    </Grid>
                  )}
                </Grid>
              )
            })}
          </Stack>
        ) : (
          <form style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
            <TextField label='Course name' value={groupName} onChange={e => setGroupName(e.target.value)} />
            <Button
              disabled={!groupName.trim()}
              type='submit'
              variant='contained'
              size='large'
              onClick={onCreateCourseClick}
            >
              Create your first course
            </Button>
          </form>
        ))}
    </ApexChartWrapper>
  )
}

Dashboard.getLayout = (page: React.ReactElement) => <UserLayout> {page} </UserLayout>

export default Dashboard
