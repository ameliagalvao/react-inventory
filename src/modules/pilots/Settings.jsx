import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Settings = () => {
  const [laborCost, setLaborCost] = useState('');
  const [profitMargin, setProfitMargin] = useState('');

  useEffect(() => {
    const storedLaborCost = localStorage.getItem('ValorMaoDeObra');
    if (storedLaborCost) {
      setLaborCost(storedLaborCost);
    } else {
      setLaborCost('6');
      localStorage.setItem('ValorMaoDeObra', '6');
    }

    const storedProfitMargin = localStorage.getItem('ProfitMargin');
    if (storedProfitMargin) {
      setProfitMargin(storedProfitMargin);
    } else {
      setProfitMargin('30');
      localStorage.setItem('ProfitMargin', '30');
    }
  }, []);

  const handleLaborCostChange = (event) => {
    const inputValue = event.target.value;
    if (parseInt(inputValue) >= 6) {
      setLaborCost(inputValue);
    } else {
      setLaborCost('6');
    }
  };

  const handleProfitMarginChange = (event) => {
    const inputValue = event.target.value;
    setProfitMargin(inputValue);
  };

  const handleSave = () => {
    localStorage.setItem('ValorMaoDeObra', laborCost);
    localStorage.setItem('ProfitMargin', profitMargin);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        id="valorMaoDeObra"
        label="Valor da Mão de Obra"
        type="number"
        value={laborCost}
        onChange={handleLaborCostChange}
        inputProps={{ min: '6' }}
      />
      <Typography variant="caption" color="error">
        O valor não pode ser inferior ao da hora do salário mínimo (R$ 6,00)
      </Typography>
      <TextField
        id="profitMargin"
        label="Margem de Lucro (%)"
        type="number"
        value={profitMargin}
        onChange={handleProfitMarginChange}
      />
      <Button variant="contained" onClick={handleSave} disabled={laborCost < 6}>
        Save
      </Button>
    </Box>
  );
};

export default Settings;
