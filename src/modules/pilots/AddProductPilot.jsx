import React, { useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { Card, Typography, TextField, Button, Box, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { addNewPilot, uploadImageToFirestorage } from '../infra/queries';
import { useAuthContext } from '../user/hooks/useAuthContext';

const AddProductPilot = ({ refreshPilotList }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const pilot = {
    nameRef: useRef(),
    craftRef: useRef(),
    productionTimeRef: {
      hours: useRef(),
      minutes: useRef(),
    },
    costRef: useRef(),
    photo: '',
    error: '',
  };

  const [error, setError] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    pilot.name = DOMPurify.sanitize(pilot.nameRef.current.value);
    pilot.craft = DOMPurify.sanitize(pilot.craftRef.current.value);
    pilot.productionTime = {
      hours: parseInt(pilot.productionTimeRef.hours.current.value),
      minutes: parseInt(pilot.productionTimeRef.minutes.current.value),
    };
    pilot.cost = parseInt(pilot.costRef.current.value);

    if (
      !pilot.name ||
      !pilot.craft ||
      isNaN(pilot.productionTime.hours) ||
      isNaN(pilot.productionTime.minutes) ||
      isNaN(pilot.cost) ||
      !image
    ) {
      setError('Por favor, preencha todos os campos.');
      return;
    } else {
      const url = await uploadImageToFirestorage(image);
      const newPilot = {
        cost: `${pilot.cost}`,
        name: `${pilot.name}`,
        craft: `${pilot.craft}`,
        productionTime: {
          hours: `${pilot.productionTime.hours}`,
          minutes: `${pilot.productionTime.minutes}`,
        },
        userUID: user.uid,
        photo: url,
      };
      addNewPilot(newPilot);
      refreshPilotList();
      navigate('/');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ m: 2, p: 2, width: 300, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Adicionar novo Piloto
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            label="Nome do piloto"
            inputRef={pilot.nameRef}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Técnica"
            inputRef={pilot.craftRef}
            fullWidth
            required
            margin="normal"
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Tempo para produzir"
              type="number"
              inputRef={pilot.productionTimeRef.hours}
              placeholder="horas"
              InputProps={{ inputProps: { min: 0 } }}
              style={{ marginRight: 10 }}
              required
            />
            <span>h</span>
            <TextField
              type="number"
              inputRef={pilot.productionTimeRef.minutes}
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
            inputRef={pilot.costRef}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Foto do Piloto"
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleImageUpload}
            fullWidth
            required
            margin="normal"
          />
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
            <Link to={'/'}>
              <Button variant="contained" sx={{backgroundColor:'red'}}>Cancelar</Button>
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

export default AddProductPilot;
