import React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
export const sportsType = [
  {
    id: 0,
    icon: <SportsTennisIcon sx={{ fontSize: 35 }} />,
    label: "Tennis",
  },
  {
    id: 1,
    icon: <SportsBasketballOutlinedIcon sx={{ fontSize: 35 }} />,
    label: "Basketball",
  },
  {
    id: 2,
    icon: <FitnessCenterIcon sx={{ fontSize: 35 }} />,
    label: "Gym",
  }
]