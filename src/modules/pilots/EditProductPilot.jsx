import React, {useState, useContext} from 'react';
import DOMPurify from 'dompurify';
import { Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { editPilot } from '../infra/queries';
import { SelectedPilotContext } from '../context/SelectedPilotContext';

const EditProductPilot = ({refreshPilotList}) => {
  const navigate = useNavigate();
  const { selectedPilot } = useContext(SelectedPilotContext);

  const [pilot, setPilot] = useState({
    name: selectedPilot.name,
    craft: selectedPilot.craft,
    productionTime: {
      hours: selectedPilot.productionTime.hours ? selectedPilot.productionTime.hours : selectedPilot.productionTime,
      minutes: selectedPilot.productionTime.minutes ? selectedPilot.productionTime.minutes : 0,
    },
    cost: selectedPilot.cost,
    userUID: 'teste',
    error: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPilot((prev) => ({ ...prev, [name]: DOMPurify.sanitize(value) }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!pilot.name || !pilot.craft || !pilot.productionTime || !pilot.cost) {
      setError('Por favor, preencha todos os campos.');
      return;
    } else {
      editPilot(selectedPilot.id, pilot);
      refreshPilotList();
      navigate('/');
    }
  }
  
  return (
  <div style={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
   <Card sx={{ m: 2, p:2, width:300, textAlign: 'center'}}>
      <h3>Editar {selectedPilot.name}</h3>      
      <form onSubmit={submitHandler}>
        <label htmlFor='name'>Nome do piloto:</label><br></br>
        <input type='text' name='name' onChange={handleChange} value={pilot.name} />
        <br></br>
        <label htmlFor='craft'>Técnica:</label>
        <br></br>
        <input type='text' name='craft' onChange={handleChange} value={pilot.craft} />
        <br></br>
        <label htmlFor='productionTime'>Tempo para produzir:</label>
        <br></br>
        <div style={{display:'inline-flex'}}>
        <input style={{width:50}} type="number" min="0" name="productionTimeHours" onChange={handleChange} value={pilot.productionTime.hours} placeholder='horas'/><span>h</span>
        <input style={{width:65}} type="number" min="0" name="productionTimeMinutes" onChange={handleChange} value={pilot.productionTime.minutes} placeholder='minutos' /><span>m</span>
        </div>
        <br></br>
        <label htmlFor='cost'>Custo:</label>
        <br></br>
        <input type='number' name='cost' onChange={handleChange} value={pilot.cost} />
        <br></br>
        <input type='submit' value="Salvar"/>
        <Link to={'/'}><button>Cancelar</button></Link>
      </form>
      {error && <p>{error}</p>}
    </Card>
    </div>
  )
}

export default EditProductPilot