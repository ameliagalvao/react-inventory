import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';

const Header = () => {
  return (
    <Grid2 container spacing={1} sx={{padding:2}}>
      <Grid2 xs={4}>
        <Typography gutterBottom variant="h5" component="span" sx={{paddingLeft: 1, color: '#E63A60', fontWeight:'700'}}>Nome do Projeto</Typography>
      </Grid2>
      <Grid2 xs={8}>
        <span>Login</span>
      </Grid2>
    </Grid2>
  )
}

export default Header