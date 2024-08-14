import { Typography, AppBar, Toolbar, Box, Button } from "@mui/material";
import {auth} from "../../firebase";


const NavBar =() =>{
    return(
        <AppBar elevation={0} color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6">Scissor</Typography>
          <Box ml="auto">
            <Button color="inherit">Links</Button>
            <Button onClick={() => auth.signOut()} color="inherit">Log Out</Button>
          </Box>
        </Toolbar>
      </AppBar>
    )

};

export default NavBar;