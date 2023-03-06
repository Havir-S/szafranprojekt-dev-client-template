import Box from '@mui/material/Box';
import {Typography } from '@mui/material/'
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', width: '50%', mx: 1 }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" sx={{height: '15px'}} {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }