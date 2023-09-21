import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import { FC } from 'react'
import { Box } from '@mui/material'
import NextLink from 'next/link'

interface CardTwitterProps {
  title: string
  description: string | null
  link: string
}

const CardTwitter: FC<CardTwitterProps> = ({ title, description, link }) => {
  return (
    <NextLink href={link}>
      <Card
        sx={{
          border: 0,
          boxShadow: 3,
          color: 'common.white',
          backgroundColor: 'info.main',
          height: '100%',
          '&:hover': { cursor: 'pointer', boxShadow: 5 }
        }}
      >
        <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
          <Box display='flex' alignItems='center' justifyContent='space-between' mb={2.7}>
            <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', color: 'common.white' }}>
              {title}
            </Typography>
            <CatchingPokemonIcon />
          </Box>
          <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </NextLink>
  )
}

export default CardTwitter
