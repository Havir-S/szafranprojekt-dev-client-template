import {Navbar, MainScreen} from './containers'
import { Box } from "@mui/material"

function App() {
  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <Navbar />
      <MainScreen />
    </Box>
  );
}

export default App;
