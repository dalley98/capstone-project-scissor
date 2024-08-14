import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Account from "./components/Account";
import { ThemeProvider, CircularProgress, Box } from "@mui/material";
import theme from './theme'
import { auth } from "./firebase";
import {User} from "firebase/auth";
import LinkRedirect from "./components/LinkRedirect";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const {pathname} = useLocation();
  const [loading, setLoading] = useState(pathname === '/' || pathname === '/account' ? true : false);
  

  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
      setUser(user);
      setLoading(false);
      
    });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  

  return (
    <ThemeProvider theme={theme}>
    
        <Routes>
          <Route path="/" element={user ? <Navigate to={"/account"}/> : <Home/>} />
          <Route path="/account" element={ user ? <Account /> : <Navigate to={"/"}/> } />
          <Route path="/:shortCode" element={<LinkRedirect/>}/>
        </Routes>
      
    </ThemeProvider>
  );
};

export default App;
