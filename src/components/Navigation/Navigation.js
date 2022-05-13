import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(null);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
      history.push('/');
    } else if (value === 1) {
      history.push('/movies');
    } else if (value === 2) {
      history.push('/series');
    } else if (value === 3) {
      history.push('/search')
    }
  }, [value])
  

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        style={{background: '#2d313a'}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} style={{color: 'whitesmoke'}}/>
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} style={{color: 'whitesmoke'}}/>
        <BottomNavigationAction label="TV Series" icon={<TvIcon />} style={{color: 'whitesmoke'}}/>
        <BottomNavigationAction label="Search" icon={<SearchIcon />} style={{color: 'whitesmoke'}}/>
      </BottomNavigation>
    </Box>
  );
}