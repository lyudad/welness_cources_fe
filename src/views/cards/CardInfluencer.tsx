import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { FC } from 'react'
import NextLink from 'next/link'
import StarIcon from '@mui/icons-material/Star'

interface CardInfluencerProps {
  title: string
  body: string | null
  link: string
}

const CardInfluencer: FC<CardInfluencerProps> = ({ title, body, link }) => {
  return (
    <Card>
      <CardHeader title={title} avatar={<StarIcon color='warning' />} />
      <CardContent>
        <Typography variant='body2' sx={{ marginBottom: 3.25 }}>
          {body}
        </Typography>
      </CardContent>
      <CardActions className='card-action-dense'>
        <NextLink href={link}>
          <Button>View group</Button>
        </NextLink>
      </CardActions>
    </Card>
  )
}

export default CardInfluencer
