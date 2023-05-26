import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import { Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { addNewPilot } from '../core/data/ProductPilots';

const AddProductPilot = ({refreshPilotList}) => {

  const [pilot, setPilot] = useState({
    name: "",
    craft: "",
    productionTime: 0,
    userUID: '',
    cost: 0,
  })
  const [error, setError] = useState('')

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setPilot((prev) => ({...prev, [name]: DOMPurify.sanitize(value)}));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!pilot.name || !pilot.craft || !pilot.productionTime || !pilot.cost ) {
      setError('Por favor, preencha todos os campos.');
      return;
    } else {
      const newPilot = {cost:`${pilot.cost}`, name:`${pilot.name}`, craft:`${pilot.craft}`, productionTime:`${pilot.productionTime}`, userUID: 'chLXXnwefYbnZQ4pRuafV4o85vi2'}
      addNewPilot(newPilot)
      refreshPilotList()
    }
  }
  
  return (
   <Card sx={{ m: 2, p:2, width:300, textAlign: 'center'}}>
      <h3>Adicionar novo Piloto</h3>      
      <form onSubmit={submitHandler}>
        <label htmlFor='name'>Nome do piloto:</label><br></br>
        <input type='text' name='name' value={pilot.name} onChange={inputChangeHandler}/>
        <br></br>
        <label htmlFor='craft'>Técnica:</label>
        <br></br>
        <input type='text' name='craft' value={pilot.craft} onChange={inputChangeHandler}/>
        <br></br>
        <label htmlFor='productionTime'>Tempo para produzir:</label>
        <br></br>
        <input type='number' name='productionTime' value={pilot.productionTime} onChange={inputChangeHandler}/>
        <br></br>
        <label htmlFor='cost'>Custo:</label>
        <br></br>
        <input type='number' name='cost' value={pilot.cost} onChange={inputChangeHandler}/>
        <br></br>
        <input type='submit' value="Salvar"/>
        <Link to={'/'}><button>Cancelar</button></Link>
      </form>
      {error && <p>{error}</p>}
    </Card>
  )
}

export default AddProductPilot