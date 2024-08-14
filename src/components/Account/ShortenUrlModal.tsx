import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface IShortenUrlModalProps {
  handleClose: () => void;
  createLink: (name: string, longUrl: string) => Promise<void>;
}

const ShortenUrlModal: React.FC<IShortenUrlModalProps> = ({
  handleClose,
  createLink,
}) => {
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    longUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldForm) => ({
      ...oldForm,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async () => {
    const errors: { [key: string]: string } = {};
    const tName = form.name.trim();
    const tLongUrl = form.longUrl.trim();

    const expression =
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if (tName.length >= 3 || tName.length <= 15) {
      errors.name = "The name should be min 3 and max 15 char long";
    }

    if (!regex.test(tLongUrl)) {
      errors.longUrl = "Invalid URL";
    }

    if (Object.keys(errors).length > 0)
      return setErrors(
        errors as React.SetStateAction<{ name: string; longUrl: string }>
      );

    setLoading(true);

    try {
      await createLink(tName, tLongUrl);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Shorten URL
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            value={form.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="filled"
            label="name"
          />
        </Box>
        <TextField
          error={!!errors.longUrl}
          helperText={errors.longUrl}
          value={form.longUrl}
          name="longUrl"
          onChange={handleChange}
          fullWidth
          variant="filled"
          label="Long Url"
        />
      </DialogContent>
      <DialogActions>
        <Box mr={2} my={1}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Shorten URL"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenUrlModal;
