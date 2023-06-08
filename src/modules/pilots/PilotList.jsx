import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import {deletePilot} from '../infra/queries';
import { SelectedPilotContext } from '../context/SelectedPilotContext';
import { useContext, useState } from 'react';

const PilotList = ({pilots = [], refreshPilotList}) => {

  const { setSelectedPilotData } = useContext(SelectedPilotContext);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = (itemID) => {
    const confirmDeletion = window.confirm('Tem certeza que deseja deletar?')
    if (confirmDeletion) {
      deletePilot(itemID)
      refreshPilotList()
    } else {
      console.log('cancelado')
    }
  }

  const handleEdit = (item) => {
    setSelectedPilotData(item);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
   <>
      <Typography gutterBottom variant="h5" component="p" sx={{ fontWeight:'700'}}>Pilotos</Typography>
        <Grid2 container>
          {pilots.map((item, index) => <Card sx={{ margin: 2, p:2, backgroundColor:"#E63A60", 
          color:"white", fontWeight:"500", fontSize:'18px', textAlign:'center', width: 150 }} key={`pilot-${index}`}>
            <CardMedia
        component="img"
        sx={{ width: 150, borderRadius:2 }}
        image={item.photo ? item.photo : "https://cdn.folhape.com.br/upload/dn_arquivo/2020/11/whatsapp-image-2020-11-27-at-120817-pm.jpg"}
        alt="..."
      />
            <CardContent>
            {item.name}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={() => handleDelete(item.id)} aria-label="delete" title='Deletar'>
                <DeleteIcon />
              </IconButton>
              <Link to={'/edit-pilot'} onClick={() => handleEdit({id: item.id, ...item})}><IconButton aria-label="edit" title='Editar'>
                <EditIcon />
              </IconButton></Link>
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
                <Typography paragraph>Técnica: {item.craft || '-'}</Typography>
                <Typography paragraph>
                  Tempo de produção: {item.productionTime.hours && item.productionTime.minutes ? `${item.productionTime.hours}h${item.productionTime.minutes}m` : `${item.productionTime}h`}
                </Typography>
                <Typography paragraph>Custo: {item.cost ? `${item.cost} reais` : '-'}</Typography>
              </CardContent>
            </Collapse>
          </Card>)}
        </Grid2>
     <div>
        <Link to={'/add-new-pilot'}><button>Adicionar Novo Piloto</button></Link>
     </div>
    </>
  )
}

export default PilotList

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