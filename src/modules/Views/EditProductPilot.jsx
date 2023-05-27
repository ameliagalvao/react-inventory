import React, {useRef, useContext, useState} from 'react';
import DOMPurify from 'dompurify';
import { Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { editPilot } from '../core/data/ProductPilots';
import { Context } from '../core/Context';

const EditProductPilot = ({refreshPilotList}) => {
  const navigate = useNavigate();
  const { selectedPilot } = useContext(Context);

  const pilot = {
    nameRef: useRef(),
    craftRef: useRef(),
    productionTimeRef: useRef(),
    costRef: useRef(),
    error: ''
  };

  const [error, setError] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    pilot.name = DOMPurify.sanitize(pilot.nameRef.current.value);
    pilot.craft = DOMPurify.sanitize(pilot.craftRef.current.value);
    pilot.productionTime = parseInt(pilot.productionTimeRef.current.value);
    pilot.cost = parseInt(pilot.costRef.current.value);

    if (!pilot.name || !pilot.craft || isNaN(pilot.productionTime) || isNaN(pilot.cost)) {
      setError('Por favor, preencha todos os campos.');
      return;
    } else {
      const newPilot = {
        cost: `${pilot.cost}`,
        name: `${pilot.name}`,
        craft: `${pilot.craft}`,
        productionTime: `${pilot.productionTime}`,
        userUID: 'chLXXnwefYbnZQ4pRuafV4o85vi2'
      };
      editPilot(selectedPilot.id, newPilot);
      refreshPilotList();
      navigate('/');
    }
  }
  
  return (
   <Card sx={{ m: 2, p:2, width:300, textAlign: 'center'}}>
      <h3>Editar {selectedPilot.name}</h3>      
      <form onSubmit={submitHandler}>
        <label htmlFor='name'>Nome do piloto:</label><br></br>
        <input type='text' name='name' ref={pilot.nameRef} placeholder={selectedPilot.name} />
        <br></br>
        <label htmlFor='craft'>Técnica:</label>
        <br></br>
        <input type='text' name='craft' ref={pilot.craftRef} placeholder={selectedPilot.craft}/>
        <br></br>
        <label htmlFor='productionTime'>Tempo para produzir:</label>
        <br></br>
        <input type='number' name='productionTime' ref={pilot.productionTimeRef} placeholder={selectedPilot.productionTime}/>
        <br></br>
        <label htmlFor='cost'>Custo:</label>
        <br></br>
        <input type='number' name='cost' ref={pilot.costRef} placeholder={selectedPilot.cost}/>
        <br></br>
        <input type='submit' value="Salvar"/>
        <Link to={'/'}><button>Cancelar</button></Link>
      </form>
      {error && <p>{error}</p>}
    </Card>
  )
}

export default EditProductPilot