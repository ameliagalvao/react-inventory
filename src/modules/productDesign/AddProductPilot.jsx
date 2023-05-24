import React, {useState} from 'react'
import DOMPurify from 'dompurify';

const AddProductPilot = ({databaseadd}) => {

  const [pilot, setPilot] = useState({
    name: "",
    craft: "",
    productionTime: 0,
    supplies: [""],
    userUID: '',
  })
  const [error, setError] = useState('')

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setPilot((prev) => ({...prev, [name]: DOMPurify.sanitize(value)}));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!pilot.name || !pilot.craft || !pilot.productionTime || !pilot.supplies ) {
      setError('Por favor, preencha todos os campos.');
      return;
    } else {
      databaseadd()
    }
  }
  
  return (
   <div>
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
        <label htmlFor='supplies'>Matéria prima:</label>
        <br></br>
        <input type='text' name='supplies' value={pilot.supplies} onChange={inputChangeHandler}/>
        <br></br>
        <input type='submit' value="Salvar"/>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default AddProductPilot