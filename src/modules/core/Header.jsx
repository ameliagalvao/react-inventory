import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{padding:2}}>
    <Typography gutterBottom variant="h5" component="span" sx={{paddingLeft: 1, color: '#E63A60', fontWeight:'700'}}>Nome do Projeto</Typography>
    </Box>
  )
}

export default Header