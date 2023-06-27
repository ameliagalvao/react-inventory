import React, { useState, useContext } from 'react';
import DOMPurify from 'dompurify';
import { Card, Typography, TextField, Button, Box, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { editPilot } from '../infra/queries';
import { SelectedPilotContext } from '../context/SelectedPilotContext';

const EditProductPilot = ({ refreshPilotList }) => {
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
    photo: selectedPilot.photo,
    userUID: 'teste',
    error: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPilot((prev) => ({ ...prev, [name]: DOMPurify.sanitize(value) }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setPilot((prev) => ({
      ...prev,
      productionTime: { ...prev.productionTime, [name]: parseInt(value) },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPilot((prev) => ({ ...prev, photo: file }));
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
  };

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Card sx={{ m: 2, p: 2, width: 300, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Editar {selectedPilot.name}
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            label="Nome do piloto"
            name="name"
            onChange={handleChange}
            value={pilot.name}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Técnica"
            name="craft"
            onChange={handleChange}
            value={pilot.craft}
            fullWidth
            required
            margin="normal"
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Tempo para produzir"
              type="number"
              name="hours"
              onChange={handleTimeChange}
              value={pilot.productionTime.hours}
              placeholder="horas"
              InputProps={{ inputProps: { min: 0 } }}
              style={{ marginRight: 10 }}
              required
            />
            <span>h</span>
            <TextField
              type="number"
              name="minutes"
              onChange={handleTimeChange}
              value={pilot.productionTime.minutes}
              placeholder="minutos"
              InputProps={{ inputProps: { min: 0 } }}
              style={{ marginLeft: 10 }}
              required
            />
            <span>m</span>
          </div>
          <TextField
            label="Custo dos materiais"
            type="number"
            name="cost"
            onChange={handleChange}
            value={pilot.cost}
            fullWidth
            required
            margin="normal"
          />
          <div style={{ marginTop: 10 }}>
            <input type="file" name="image" onChange={handleImageUpload} accept="image/*" />
          </div>
          <Stack spacing={1} sx={{ justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
            <Link to={'/'}>
              <Button variant="contained">Cancelar</Button>
            </Link>
          </Stack>
        </form>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default EditProductPilot;
