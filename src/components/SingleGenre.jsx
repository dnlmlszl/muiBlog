import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import { useState } from 'react';

export function SingleGenre({ name, setSelectedGenres, selectedGenres }) {
  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((sel) => !sel);

    if (selectedGenres.indexOf(name) === -1) {
      setSelectedGenres((set) => [...set, name]);
    } else {
      setSelectedGenres(selectedGenres.filter((item) => item !== name));
    }
  }

  return (
    <Chip
      label={name}
      clickable
      sx={{
        margin: '0.75rem 0',
        color: selected ? '#fff' : '#999',
        backgroundColor: selected ? '#4c6375' : 'transparent',
        border: `1px solid ${selected ? '#4caf50' : '#999'}`,
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 130,
        '&:hover': {
          backgroundColor: selected ? '#45a049' : '#eee',
        },
        '&:focus': {
          boxShadow: `0 0 0 0.2rem ${
            selected ? 'rgba(76, 175, 80, 0.5)' : 'rgba(153, 153, 153, 0.5)'
          }`,
        },
      }}
      onClick={handleClick}
      icon={selected ? <DoneIcon color="#fff" /> : <CloseIcon />}
    />
  );
}
