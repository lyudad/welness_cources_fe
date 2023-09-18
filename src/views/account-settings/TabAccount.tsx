// ** React Imports
import { ChangeEvent, ElementType, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import { Avatar, useTheme } from '@mui/material'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { useAuthContext } from '../../layouts/useAuthContext'
import { uploadNewAvatar } from '../../api/user/uploadNewAvatar'
import { useMutation } from '@tanstack/react-query'
import { deleteAvatar } from '../../api/user/deleteAvatar'
import { updateUserInfo } from '../../api/user/updateUserInfo'

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  const theme = useTheme()
  const { user, setUser } = useAuthContext()

  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [firstName, setFirstName] = useState<string | undefined | null>(user?.firstName)
  const [lastName, setLastName] = useState<string | undefined | null>(user?.lastName)

  const { mutate: uploadNewAvatarMutation } = useMutation(uploadNewAvatar, {
    onSuccess: response => {
      if (!response?.data) return

      setUser(prev => {
        if (!prev) return null

        return { ...prev, avatar: response.data.avatar }
      })
    }
  })

  const { mutate: deleteAvatarMutation } = useMutation(deleteAvatar, {
    onSuccess: response => {
      if (!response?.data) return

      setUser(prev => {
        if (!prev) return null

        return { ...prev, avatar: null }
      })
    }
  })

  const { mutate: updateUserInfoMutation } = useMutation(updateUserInfo, {
    onSuccess: response => {
      if (!response?.data) return

      setUser(prev => {
        if (!prev) return null

        return { ...prev, ...response.data }
      })
    }
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return

    uploadNewAvatarMutation(e.target.files[0])
  }

  const handleDeleteAvatar = () => {
    deleteAvatarMutation()
  }

  const onResetInfoClick = () => {
    setFirstName(user?.firstName)
    setLastName(user?.lastName)
  }

  const onSaveInfoClick = () => {
    if ((firstName === user?.firstName && lastName === user?.lastName) || firstName === '' || lastName === '') return

    const requestData = { firstName: firstName || undefined, lastName: lastName || undefined }

    updateUserInfoMutation(requestData)
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={user?.avatar || undefined}
                alt='Profile Pic'
                sx={{
                  width: 120,
                  height: 120,
                  marginRight: theme.spacing(6.25),
                  borderRadius: theme.shape.borderRadius,
                  objectFit: 'cover'
                }}
              />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={handleDeleteAvatar}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 1MB.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='First name'
              placeholder='John'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Last name'
              placeholder='Doe'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              defaultValue={user?.email}
            />
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={onSaveInfoClick}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={onResetInfoClick}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
