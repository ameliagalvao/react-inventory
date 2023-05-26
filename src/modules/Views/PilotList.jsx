import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardMedia from '@mui/material/CardMedia';

const PilotList = ({pilots = [], deleteSinglePost , editPost}) => {

  const handleDelete = () => {
    deleteSinglePost()
  }

  const handleEdit = () => {
    editPost()
  }

  return (
   <>
      <Typography gutterBottom variant="h5" component="p" sx={{ fontWeight:'700'}}>Pilotos</Typography>
        <Grid2 container>
          {pilots.map((item, index) => <Card sx={{ margin: 2, p:2, backgroundColor:"#E63A60", 
          color:"white", fontWeight:"500", fontSize:'18px', textAlign:'center', width: 150 }} key={`pilot-${index}`}>
            <CardMedia
        component="img"
        sx={{ width: 150, borderRadius:2 }}
        image="https://cdn.folhape.com.br/upload/dn_arquivo/2020/11/whatsapp-image-2020-11-27-at-120817-pm.jpg"
        alt="..."
      />
            <CardContent>
            {item.name}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={handleDelete} aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={handleEdit} aria-label="edit">
                <EditIcon />
              </IconButton>
            </CardActions>
          </Card>)}
        </Grid2>
     <div>
        <Link to={'/add-new-pilot'}><button>Adicionar Novo Piloto</button></Link>
     </div>
    </>
  )
}

export default PilotList