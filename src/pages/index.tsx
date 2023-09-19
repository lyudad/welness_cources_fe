import ApexChartWrapper from '../@core/styles/libs/react-apexcharts'
import UserLayout from '../layouts/UserLayout'
import { useQuery } from '@tanstack/react-query'
import { getAllGroups } from '../api/groups/getAllGroups'
import CardInfluencer from '../views/cards/CardInfluencer'
import { Grid } from '@mui/material'

const Groups = () => {
  const { data: allGroups } = useQuery(['getAllGroups'], getAllGroups)

  return (
    <ApexChartWrapper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={6}>
        {allGroups?.map(group => (
          <Grid key={group.id} item xs={12} sm={6} md={4}>
            <CardInfluencer title={group.name} body={group.description} link={`/groups/${group.id}`} />
          </Grid>
        ))}
      </Grid>
    </ApexChartWrapper>
  )
}

Groups.getLayout = (page: React.ReactElement) => <UserLayout> {page} </UserLayout>

export default Groups
