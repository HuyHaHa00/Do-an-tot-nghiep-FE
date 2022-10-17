import React from 'react'
import { Typography, Stack, Button } from '@mui/material'

import BodyPartImage from '../assets/icons/body-part.png'
import TargetImage from '../assets/icons/target.png'
import EquipmentImage from '../assets/icons/equipment.png'

const Detail = ({ exerciseDetail }) => {
  const { bpCoThe, urlanh, tenBaiTap, nhomCo, tbsuDung} = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bpCoThe,
    },
    {
      icon: TargetImage,
      name: nhomCo,
    },
    {
      icon: EquipmentImage,
      name: tbsuDung,
    },
  ]

  return (
    <Stack gap="60px" sx={{flexDirection: {lg: 'row'}, p: '20px', alignItems: 'center'}}>
        <img src={urlanh} alt={tenBaiTap} loading="lazy" className="detail-image"/>
        <Stack sx={{gap: { lg: '35px', xs: '20px' }}}>
          <Typography variant="h3" textTransform="capitalize">
            {tenBaiTap}
          </Typography>
          <Typography variant="h6">
            Exercises keep you strong. {tenBaiTap} {` `} 
            is a one of the best exercise to target your {nhomCo}. 
            It will help you
            improve your mood and gain energy.
          </Typography>
          {
            extraDetail.map((item) => (
              <Stack key={item.tenBaiTap} direction="row" gap="24px" alignItems="center">
                <Button sx={{ background: '#fff2bd', borderRadius: '50%', width: '100px', height: '100px'}}>
                  <img src={item.icon} alt={bpCoThe} style={{width: '50px', height: '50px'}} />
                </Button>
                <Typography variant="h5" textTransform="capitalize">
                  {item.tenBaiTap}
                </Typography>
              </Stack>  
          ))}
        </Stack>
    </Stack>
  )
}

export default Detail

