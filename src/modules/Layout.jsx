import Grid2 from '@mui/material/Unstable_Grid2';
import UserWidget from './UserWidget';
import { Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Layout = () => {

  return (
    <Grid2 container spacing={1}>
      <Grid2 container xs={12} sx={{padding:2, backgroundColor:'#D11C44', color:'#F3F3F3'}}>
        <Grid2 xs={4} sx={{p:2}}>
           <Typography gutterBottom variant="h5" component="span" sx={{ fontWeight:'700'}}>Controle de Produção App</Typography>
        </Grid2>
        <Grid2 xs={8} sx={{display:'flex', justifyContent:'end'}}>
          <UserWidget/>
        </Grid2>
      </Grid2>
    <Grid2  xs={12} sx={{padding:3}}>
      <Outlet />
    </Grid2>
    </Grid2>
  )
}

export default Layout