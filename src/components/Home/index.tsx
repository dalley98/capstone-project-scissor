import {useState} from 'react';
import { Typography, Button, Box, Grid } from "@mui/material";
import AuthModal from "./AuthModal";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  return (
    <Box
      p={3}
      boxSizing="border-box"
      height="100vh"
      bgcolor="#88BDBC"
      color="#fff"
      display="flex"
      flexDirection="column"
    >
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)}/>}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Scissor</Typography>
        <Box display="flex" gap={2}>
          <Button onClick={() => setOpenAuthModal(true)} variant="outlined" color="inherit" disableElevation>
            Login/Signup
          </Button>
        </Box>
      </Box>
      <Box display="flex" flexGrow={1} alignItems="center">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Make Your URLs Memorable</Typography>
              <Box my={2}>
                <Typography>
                  Create custom short links that are easy to remember and share.
                  Ideal for branding and marketing campaigns.
                </Typography>
              </Box>
              <Button onClick={() => setOpenAuthModal(true)} variant="contained" color="secondary" disableElevation>
                Get Started
              </Button>
            </Box>
          </Grid>
          <Grid item sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <img
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              src="/assets/scissorImg.png"
              alt="Scissor mockup Image"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;

