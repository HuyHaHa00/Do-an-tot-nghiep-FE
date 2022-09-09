import React from 'react'
import {Stack, Typography} from '@mui/material'

import Icon from '../assets/icons/gym.png';

const BodyPart = ({data, bodyPart, setBodyPart}) => {
  return (
    <Stack type="button" alignItems="center" justifyContent="center" className="bodyPart-card" 
      sx={{
          borderTop: bodyPart === data ? '3px solid #FF2625' : 'none',
          backgroundColor: '#F5F5F5',
          borderBottomLeftRadius: '20px',
          width: '270px',
          height: '280px',
          cursor: 'pointer',
          gap: '47px'
        }}
        onClick={() => {
                          setBodyPart(data);
                          window.scrollTo({top: 1800, left: 100, behavior: 'smooth'});
                        }

        }  
    > 
      <img src={Icon} alt="dumbbell" style={{width: '40px', height: '40px'}}/>
      <Typography fontSize="24px" fontWeight="bold" color="#3A1212"
      textTransform="capitalize">{data}</Typography> 
    </Stack>
  )
}

export default BodyPart