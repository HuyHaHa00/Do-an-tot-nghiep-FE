import React from 'react'
import {Box, Typography, Stack} from '@mui/material'

import Logo from '../assets/images/Logo-1.png'

const Footer = () => {
  return (
    <Box sx={{backgroundColor: '#DE3A3A', color: '#fff', p: '20px', mt: '50px'}}>
      <Stack direction={{xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row'}} justifyContent="space-between" alignItems="center">
        <img src={Logo} alt="Logo" />
        <Typography variant="h6" sx={{mt: {xs: '20px', sm: '20px', md: '0', lg: '0', xl: '0'}}}>© 2022 GoldGym. All rights reserved.</Typography>
      </Stack>
    </Box>
  )
}

export default Footer