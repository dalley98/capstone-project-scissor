import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { set } from "date-fns";

interface IAuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<IAuthModalProps> = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldForm) => ({
      ...oldForm,
      [e.target.name]: e.target.value,
    }));

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid Email");
          break;
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/wrong-password":
          setError("Wrong Password");
          break;
        case "auth/email-already-in-use":
          setError("Email already in use");
          break;
        default:
          setError("Something went wrong");
          break;
      }
      setLoading(false);
    }
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {isSignIn ? "Sign in" : "Sign up"}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginBottom: "1.5rem" }}
          variant="filled"
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          variant="filled"
          fullWidth
          value={form.password}
          name="password"
          onChange={handleChange}
          type="password"
          label="Password"
        />
        <DialogActions>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            mr={-1}
            mt={2}
          >
            <Typography
              onClick={() => setIsSignIn((o) => !o)}
              ml={-2}
              style={{ cursor: "pointer" }}
            >
              {isSignIn ? "Don't have an account" : "Already have an account"}
            </Typography>
            <Button disableElevation variant="contained" color="secondary" onClick={handleAuth} disabled={loading}>
              {loading ? (
                <CircularProgress color="primary" size={22}/>
              ) : isSignIn ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </Button>
          </Box>
        </DialogActions>

        {error && <Typography color="red">{error}</Typography>}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
