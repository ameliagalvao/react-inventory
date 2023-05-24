import React, {useState} from 'react'
import Card from '@mui/material/Card';
import AddProductPilot from './AddProductPilot'

const PilotList = ({pilots = []}) => {

  const [addProduct, setAddProduct] =useState(false)
  
  return (
   <div>
      <h3>Pilotos:</h3>
        <div>
          {pilots.map((item, index) => <Card sx={{ m: 2, p:2 }} key={`pilot-${index}`}>{item.name}</Card>)}
        </div>
     <div>
       {addProduct ? <AddProductPilot/> : (
     <button onClick={() => setAddProduct(true)}>Adicionar Novo Piloto</button>
       ) }
     </div>
    </div>
  )
}

export default PilotList