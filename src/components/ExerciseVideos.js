import React from 'react'
import { Typography, Stack, Box } from '@mui/material'

const ExerciseVideos = ({exerciseVideos, name}) => {
  return (
    <Box sx={{ mt: { lg: '200px', xs: '20px' } }} p="20px">
      <Typography variant="h3" textTransform="capitalize"> 
        Watch <span style={{color: '#ff2625', textTransform: 'capitalize'}}>{name}</span> exercises videos
      </Typography>
      <Stack mt="20px" justifyContent="flex-start" flexWrap="wrap" alignItems="center" sx={{flexDirection: {lg: 'row'}, gap: { lg: '110px', xs: '0px'}}}>
        {exerciseVideos?.slice(1, 5).map((item, index) => (
          <a key={index} 
          className="exercise-video"
          href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
          target="_blank" 
          rel="noreferrer"
          >
            <img src={item.video.thumbnails[0].url} alt={item.video.title} style={{height: "193px"}} />
            <Box>
              <Typography variant="h5" color='#000'>  
                {item.video.title}
              </Typography>
              <Typography variant="h6" color='#000'>
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack> 
    </Box>

  )
}

export default ExerciseVideos