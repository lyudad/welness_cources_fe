// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

// ** Type import
import { VerticalNavItemsType } from '../../@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Groups',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Trainer dashboard',
      disabled: true,
      icon: HomeOutline,
      path: '/training-groups'
    }
  ]
}

export default navigation
