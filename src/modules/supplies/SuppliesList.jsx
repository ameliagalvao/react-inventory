import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';

const SuppliesList = ({supplies = []}) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
   <>
      <Typography gutterBottom variant="h5" component="p" sx={{ fontWeight:'700'}}>Matérias Primas</Typography>
        <Grid2 container>
          {supplies.map((item, index) => <Card sx={{ margin: 2, p:2, backgroundColor:"#E63A60", 
          color:"white", fontWeight:"500", fontSize:'18px', textAlign:'center', width: 150 }} key={`supplie-${index}`}>
            <CardContent>
            {item.name}
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
          expand={expanded}
          onClick={handleExpand}
          aria-expanded={expanded}
          aria-label="show more"
          title='Mais informações'
        >
          <ExpandMoreIcon />
        </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
               ...
              </CardContent>
            </Collapse>
          </Card>)}
        </Grid2>
    </>
  )
}

export default SuppliesList

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));