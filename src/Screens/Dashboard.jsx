import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import { Link ,useNavigate} from 'react-router-dom';

export default function Dashboard() {
  const [auth, setAuth] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
    navigate('/');

  };



  return (
    <Box sx={{ flexGrow: 1,float:"right" ,color:'red'}}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch 
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'you are Login' : 'If you want to Logout'}
        />
      </FormGroup>

    </Box>
  );
}

