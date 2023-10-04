import RadioButtonUnChecked from '@mui/icons-material/RadioButtonUnchecked';
import Done from '@mui/icons-material/Done';
import { Chip } from '@mui/material';
import { useState } from 'react';

export function SingleGenre({ id, name, setSelectedGenres, selectedGenres }) {
  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((sel) => !sel);

    if (selectedGenres.indexOf(id) === -1) {
      setSelectedGenres((set) => [...set, id]);
    } else {
      setSelectedGenres(selectedGenres.filter((item) => item !== id));
    }

    console.log(selectedGenres);
  }

  return (
    <Chip
      label={name}
      clickable
      variant="outlined"
      sx={{
        margin: '0.75rem 0',
        color: '#999',
        width: 150, // Fix szélesség
        overflow: 'hidden', // A túlcsorduló tartalom elrejtése
        textOverflow: 'ellipsis', // A túlcsorduló szöveg "..."-ként való megjelenítése
        whiteSpace: 'nowrap', // A szöveg ne tördelődjön új sorba
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      onClick={handleClick}
      icon={selected ? <Done /> : <RadioButtonUnChecked />}
    />
  );
}
