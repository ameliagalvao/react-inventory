import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import { deletePilot } from '../infra/queries';
import { SelectedPilotContext } from '../context/SelectedPilotContext';
import { useContext } from 'react';

const PilotList = ({ pilots = [], refreshPilotList }) => {
  const { setSelectedPilotData } = useContext(SelectedPilotContext);
  const [expandedItem, setExpandedItem] = useState(null);
  const laborCostPerHour = parseFloat(localStorage.getItem('ValorMaoDeObra')) || 6;
  const profitMargin = parseFloat(localStorage.getItem('ProfitMargin')) || 30;

  const handleDelete = (itemID) => {
    const confirmDeletion = window.confirm('Tem certeza que deseja deletar?');
    if (confirmDeletion) {
      deletePilot(itemID);
      refreshPilotList();
    } else {
      console.log('cancelado');
    }
  };

  const handleEdit = (item) => {
    setSelectedPilotData(item);
  };

  const handleExpand = (itemIndex) => {
    setExpandedItem(itemIndex === expandedItem ? null : itemIndex);
  };

  const calculateLaborCost = (productionTime) => {
    const { hours, minutes } = productionTime;
    const totalMinutes = parseInt(hours * 60) + parseInt(minutes);
    const laborCost = parseFloat((totalMinutes / 60) * laborCostPerHour).toFixed(2);
    return laborCost;
  };

  const calculateTotalCost = (productionTime, materialCost) => {
    const laborCost = calculateLaborCost(productionTime);
    const totalCost = parseFloat(laborCost) + parseFloat(materialCost);
    return totalCost.toFixed(2);
  };

  const calculateFinalValue = (productionTime, materialCost) => {
    const totalCost = calculateTotalCost(productionTime, materialCost);
    const profitValue = parseFloat((totalCost * profitMargin) / 100).toFixed(2);
    const finalValue = parseFloat(totalCost) + parseFloat(profitValue);
    return finalValue.toFixed(2);
  };

  return (
    <>
      <Typography gutterBottom variant="h3" component="p" sx={{ fontWeight: '700' }}>
        Pilotos
      </Typography>
      <Grid container spacing={2}>
        {pilots.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={`pilot-${index}`}>
            <Card
              sx={{
                backgroundColor: '#F3F3F3',
                color: 'black',
                textAlign: 'center',
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 300, height: 150, borderRadius: 2, margin: '20px auto 0' }}
                image={item.photo ? item.photo : 'https://cdn.folhape.com.br/upload/dn_arquivo/2020/11/whatsapp-image-2020-11-27-at-120817-pm.jpg'}
                alt="..."
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="p" sx={{ fontWeight: '700' }}>
                  {item.name}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton onClick={() => handleDelete(item.id)} aria-label="delete" title="Deletar">
                  <DeleteIcon />
                </IconButton>
                <Link to="/edit-pilot" onClick={() => handleEdit({ id: item.id, ...item })}>
                  <IconButton aria-label="edit" title="Editar">
                    <EditIcon />
                  </IconButton>
                </Link>
                <ExpandMore
                  expand={index === expandedItem}
                  onClick={() => handleExpand(index)}
                  aria-expanded={index === expandedItem}
                  aria-label="show more"
                  title="Mais informações"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={index === expandedItem} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography sx={{ fontWeight: '700' }}>TEMPO DE PRODUÇÃO:</Typography>
                  <Typography>
                    {item.productionTime.hours && item.productionTime.minutes
                      ? `${item.productionTime.hours}h${item.productionTime.minutes}m`
                      : `${item.productionTime}h`}
                  </Typography>
                  <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                  <Typography sx={{ fontWeight: '700' }}>CUSTO DOS MATERIAIS:</Typography>
                  <Typography>{item.cost ? `${item.cost} reais` : '-'}</Typography>
                  <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                  <Typography sx={{ fontWeight: '700' }}>CUSTO DA MÃO DE OBRA:</Typography>
                  <Typography>{`${calculateLaborCost(item.productionTime)} reais`}</Typography>
                  <Divider variant="middle" sx={{ marginTop: 3, marginBottom: 1, backgroundColor: 'white' }} />
                  <Typography sx={{ fontWeight: '700', fontSize: 20 }}>CUSTO TOTAL:</Typography>
                  <Typography sx={{ fontSize: 18 }}>{`${calculateTotalCost(item.productionTime, item.cost)} reais`}</Typography>
                  <Divider sx={{ marginTop: 3, marginBottom: 1, backgroundColor: 'white' }} />
                  <Typography sx={{ fontWeight: '700', fontSize: 20 }}>VALOR FINAL:</Typography>
                  <Typography sx={{ fontSize: 18 }}>{`${calculateFinalValue(item.productionTime, item.cost)} reais`}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ position: 'fixed', bottom: '16px', right: '16px' }}>
        <Link to="/add-new-pilot">
          <Fab color="primary" sx={{ backgroundColor: '#D11C44', '&:hover': { backgroundColor: '#026C7C' } }}  aria-label="add" variant="extended">
            Adicionar Novo Piloto
          </Fab>
        </Link>
      </div>
    </>
  );
};

export default PilotList;

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
