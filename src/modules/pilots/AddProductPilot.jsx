import React, {useRef, useState} from 'react';
import DOMPurify from 'dompurify';
import { Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { addNewPilot } from '../infra/queries';

const AddProductPilot = ({refreshPilotList}) => {

  const navigate = useNavigate();

  const pilot = {
    nameRef: useRef(),
    craftRef: useRef(),
    productionTimeRef: {
      hours: useRef(),
      minutes: useRef()
    },
    costRef: useRef(),
    error: ''
  };

  const [error, setError] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    pilot.name = DOMPurify.sanitize(pilot.nameRef.current.value);
    pilot.craft = DOMPurify.sanitize(pilot.craftRef.current.value);
    pilot.productionTime = {
      hours: parseInt(pilot.productionTimeRef.hours.current.value),
      minutes: parseInt(pilot.productionTimeRef.minutes.current.value)
    };
    pilot.cost = parseInt(pilot.costRef.current.value);

    if (!pilot.name || !pilot.craft || isNaN(pilot.productionTime.hours) ||
    isNaN(pilot.productionTime.minutes) ||
    isNaN(pilot.cost)) {
      setError('Por favor, preencha todos os campos.');
      return;
    } else {
      const newPilot = {
        cost: `${pilot.cost}`,
        name: `${pilot.name}`,
        craft: `${pilot.craft}`,
        productionTime: {
          hours: `${pilot.productionTime.hours}`,
          minutes: `${pilot.productionTime.minutes}`
        },
        userUID: 'chLXXnwefYbnZQ4pRuafV4o85vi2'
      };
      addNewPilot(newPilot);
      refreshPilotList();
      navigate('/');
    }
  }
  
  return (
   <Card sx={{ m: 2, p:2, width:300, textAlign: 'center'}}>
      <h3>Adicionar novo Piloto</h3>      
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Nome do piloto:</label>
        <br />
        <input type="text" name="name" ref={pilot.nameRef} />
        <br />
        <label htmlFor="craft">Técnica:</label>
        <br />
        <input type="text" name="craft" ref={pilot.craftRef} />
        <br />
        <label htmlFor="productionTime">Tempo para produzir:</label>
        <br />
        <div style={{display:'inline-flex'}}>
        <input style={{width:50}} type="number" min="0" name="productionTimeHours" ref={pilot.productionTimeRef.hours} placeholder='horas'/><span>h</span>
        <input style={{width:65}} type="number" min="0" name="productionTimeMinutes" ref={pilot.productionTimeRef.minutes} placeholder='minutos' /><span>m</span>
        </div>
        <br />
        <label htmlFor="cost">Custo:</label>
        <br />
        <input type="number" name="cost" ref={pilot.costRef} />
        <br />
        <input type="submit" value="Salvar" />
        <Link to={'/'}><button>Cancelar</button></Link>
      </form>
      {error && <p>{error}</p>}
    </Card>
  )
}

export default AddProductPilot