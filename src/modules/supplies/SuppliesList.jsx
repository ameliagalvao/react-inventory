import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

const SuppliesList = ({ supplies = [] }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleExpand = (itemIndex) => {
    setExpandedItem(itemIndex === expandedItem ? null : itemIndex);
  };

  return (
    <>
      <Typography gutterBottom variant="h5" component="p" sx={{ fontWeight: '700', marginBottom: 2 }}>
        Matérias Primas
      </Typography>
      <Grid container spacing={2}>
        {supplies.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={`supply-${index}`}>
            <Card
              sx={{
                backgroundColor: '#E63A60',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: '700', marginBottom: 1 }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontWeight: '500', fontSize: 16 }}>PREÇO: {item.price ? `${item.price} reais` : '-'}</Typography>
                <Divider variant="middle" sx={{ marginTop: 2, marginBottom: 2, backgroundColor: 'white' }} />
                <Typography variant="body2" sx={{ fontSize: 14, marginBottom: 1 }}>
                  FABRICANTE: {item.supplier}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore expand={index === expandedItem} onClick={() => handleExpand(index)} aria-expanded={index === expandedItem} aria-label="show more">
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={index === expandedItem} timeout="auto" unmountOnExit>
                <CardContent>
                  {item.variations && (
                    <>
                      <Typography variant="subtitle1" sx={{ fontWeight: '700', marginBottom: 1 }}>
                        VARIAÇÕES:
                      </Typography>
                      {item.variations.map((variation, variationIndex) => (
                        <Typography variant="body2" key={`variation-${variationIndex}`} sx={{ marginBottom: 0.5 }}>
                          {variation.name}: {variation.quantity}
                        </Typography>
                      ))}
                    </>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SuppliesList;

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
