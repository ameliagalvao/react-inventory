import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const PilotList = ({pilots = [], navigateToAddNewPilot}) => {

  const handleClick = () => {
    navigateToAddNewPilot();
  };
  
  return (
   <Box sx={{ p:3, width:'400px' }}>
      <Typography gutterBottom variant="h5" component="p" sx={{ fontWeight:'700'}}>Pilotos</Typography>
        <Box sx={{ p:1}}>
          {pilots.map((item, index) => <Card sx={{ marginBottom: 2, p:2, backgroundColor:"#E63A60", color:"white", fontWeight:"500", fontSize:'18px' }} key={`pilot-${index}`}>{item.name}</Card>)}
        </Box>
     <div>
        <button onClick={handleClick}>Adicionar Novo Piloto</button>
     </div>
    </Box>
  )
}

export default PilotList