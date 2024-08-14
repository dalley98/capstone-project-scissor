import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {db} from "../../firebase";
import {getDoc, doc, updateDoc, increment} from "firebase/firestore";
import { CircularProgress, Box, Typography } from "@mui/material";

interface ILinkRedirectProps {}


const LinkRedirect: React.FC<ILinkRedirectProps> = () => {
    const {shortCode} = useParams<{shortCode: string}>();
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
      const fetchLink = async () =>{
        if(shortCode?.length !== 6){
          return setLoading(false)
        }
        try {
          if (shortCode) {
              const linkDoc = doc(db, 'links', shortCode);
              const docSnap = await getDoc(linkDoc);
              if (docSnap.exists()) {
                  const {longUrl, linkId, userUid} = docSnap.data();
                  const userDoc = doc(db, 'users',userUid, 'links', linkId );
                  await updateDoc(userDoc, {totalClicks: increment(1)} )
                 
                  window.location.href = longUrl;
              } else {
                  setLoading(false);
              }
          }
      } catch (error) {
          console.error('Error fetching document: ', error);
      }

      }
      fetchLink();
    }, [shortCode]);
    
    if(loading){
      return (
        <Box mt={10} textAlign="center">
          <CircularProgress/>
          <Typography>Redirecting to the link</Typography>
        </Box>
      )
    }else{
      return(
        <Box mt={10} textAlign="center">
          <Typography>Link is not valid</Typography>
        </Box>
      )
    }
};

export default LinkRedirect;