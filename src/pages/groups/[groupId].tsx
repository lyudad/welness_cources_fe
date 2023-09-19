import React from 'react'
import UserLayout from '../../layouts/UserLayout'
import { getAllGroups } from '../../api/groups/getAllGroups'
import { ParsedUrlQuery } from 'querystring'
import { getGroupById } from '../../api/groups/getGroupById'
import { getPostsByGroupId } from '../../api/posts/getPostsByGroupId'
import { IGroup, IPost } from '../../layouts/AuthContext'
import ApexChartWrapper from '../../@core/styles/libs/react-apexcharts'
import Trophy from '../../views/dashboard/Trophy'
import { Grid, Stack, Typography } from '@mui/material'
import Table from '../../views/dashboard/Table'
import CardTwitter from '../../views/cards/CardTwitter'

export async function getStaticPaths() {
  const groups = await getAllGroups()

  const paths = groups?.map(group => ({
    params: { groupId: group.id.toString() }
  }))

  return { paths: paths, fallback: false }
}

export async function getStaticProps({ params }: { params: ParsedUrlQuery }) {
  const groupId = parseInt(params.groupId as string, 10)
  const group = await getGroupById({ groupId })
  const posts = await getPostsByGroupId({ groupId })

  return { props: { group, posts } }
}

interface GroupProps {
  group: IGroup
  posts: IPost[]
}

const Group = ({ group, posts }: GroupProps) => {
  return (
    <ApexChartWrapper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack width='100%' rowGap={10}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Trophy groupName={group.name} amountOfUsers={group.users?.length || 0} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Table users={group.users} />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          {posts.length ? (
            posts.map((post, index) => (
              <Grid key={post.id} item xs={12} md={4}>
                <CardTwitter
                  title={`${index + 1} - ${post.title}`}
                  description={post.description}
                  link={`/posts/${post.id}`}
                />
              </Grid>
            ))
          ) : (
            <Typography variant='h4' textAlign='center' width='100%'>
              No posts yet
            </Typography>
          )}
        </Grid>
      </Stack>
    </ApexChartWrapper>
  )
}

Group.getLayout = (page: React.ReactElement) => <UserLayout> {page} </UserLayout>

export default Group
