import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import './index.css'
const Footer = () => {
  return (
    <Box mt={8} display="flex" justifyContent="center">
      <Typography variant="body2" color="#4350AF" align="center">    
        <Link href="https://github.com/Keerat666" target="_blank" rel="noopener noreferrer">
        © 2024 Keerat
        </Link>

      </Typography>
    </Box>
  );
};

export default Footer;
