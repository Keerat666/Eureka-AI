import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1 }}>
          Vox Machina
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
