import {createTheme} from "@mui/material";

export default createTheme({
    palette: {
        primary:{
            main: '#88BDBC',
            contrastText: '#fff',
        },
        secondary:{
            main: '#254E58'
        }
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        button:{
            textTransform: 'capitalize',
            fontWeight: 600,
        },
        h3:{
            fontWeight: 600,
        },
        h4:{
            fontWeight: 600,
        },
    }       
})