import { Avatar } from '@mui/material'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

interface DashboardTableProps {
  isEmail?: boolean
  users:
    | null
    | {
        id: number
        firstName: string | null
        lastName: string | null
        email: string
        avatar: string | null
      }[]
}

const DashboardTable = ({ users, isEmail }: DashboardTableProps) => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 200 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell width={5} />
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              {isEmail && <TableCell sx={{ textAlign: 'right' }}>Email</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map(({ id, firstName, lastName, email, avatar }) => (
              <TableRow hover key={id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell width={5}>
                  <Avatar alt='avatar' src={avatar || undefined} />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{firstName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{lastName}</Typography>
                </TableCell>
                {isEmail && <TableCell sx={{ textAlign: 'right' }}>{email}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
