import { useState, Fragment, useEffect, useCallback } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import NavBar from "./NavBar";
import LinkCard from "./LinkCard";
import ShortenUrlModal from "./ShortenUrlModal";
import { db, auth } from "../../firebase";
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";

interface ILink {
  id: string;
  name: string;
  longUrl: string;
  createdAt: Date;
  shortCode: string;
  totalClicks: number;
}

interface IAccountProps {}

const Account: React.FC<IAccountProps> = () => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [copyLinkToastr, setCopyLinkToastr] = useState(false);
  const [fetchingLinks, setFetchingLinks] = useState(true);

  const handleCreateLink = async (name: string, longUrl: string) => {
    if (auth.currentUser) {
      try {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        const linksCollection = collection(userDoc, "links");

        const link = {
          name,
          longUrl:
            longUrl.includes("http://") || longUrl.includes("https://")
              ? longUrl
              : `http://${longUrl}`,
          createdAt: Timestamp.fromDate(new Date()),
          shortCode: nanoid(6),
          totalClicks: 0,
        };
        await addDoc(linksCollection, link);

        setLinks((links) => [
          ...links,
          { ...link, createdAt: new Date(), id: userDoc.id },
        ]);

        setOpenModal(false);
      } catch (error) {
        console.error("Error adding user to Firestore: ", error);
      }
    } else {
      console.error("No user is authenticated");
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        const linksCollection = collection(userDoc, "links");
        const linksSnapshot = await getDocs(linksCollection);

        const tempLinks: ILink[] = [];
        linksSnapshot.forEach((doc) =>
          tempLinks.push({
            ...doc.data(),
            id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
          } as ILink)
        );

        setLinks(tempLinks);
      }
    };

    fetchLinks();
    setFetchingLinks(false);
  }, []);

  const handleDeleteLink = useCallback(async (linkDocId: string) => {
    if (auth.currentUser) {
      try {
        if (window.confirm("Are you sure you want to delete this link?")) {
          const userDoc = doc(db, "users", auth.currentUser.uid);
          const linkDoc = doc(userDoc, "links", linkDocId);
          await deleteDoc(linkDoc);

          setLinks((oldLinks) =>
            oldLinks.filter((link) => link.id !== linkDocId)
          );
        }
      } catch (error) {
        console.error("Error deleting link: ", error);
      }
    }
  }, []);

  const handleCopyLink = useCallback((shortUrl: string) => {
    copy(shortUrl);
    setCopyLinkToastr(true);
  }, []);

  return (
    <>
      <Snackbar
        open={copyLinkToastr}
        autoHideDuration={2000}
        onClose={() => setCopyLinkToastr(false)}
        message="Link copied to the clipboard"
      />
      {openModal && (
        <ShortenUrlModal
          createLink={handleCreateLink}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <NavBar />
      <Box mt={{xs:3, sm:5}} p={{xs: 2, sm:0}}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOpenModal(true)}
                disableElevation
                variant="contained"
                color="primary"
              >
                Create new
              </Button>
            </Box>
            <Box>
              {fetchingLinks ? (
                <Box textAlign="center">
                  <CircularProgress />
                </Box>
              ) : !links.length ? (
                <Box textAlign="center">
                  <img
                    src="/assets/empty.svg"
                    alt="no links"
                    style={{
                      width: "225px",
                      height: "auto",
                      marginBottom: "1.5rem",
                    }}
                  />
                  <Typography>You've not shortened any links</Typography>
                </Box>
              ) : (
                links
                  .sort(
                    (prevLink, nextLink) =>
                      nextLink.createdAt.getTime() -
                      prevLink.createdAt.getTime()
                  )
                  .map((link, i) => (
                    <Fragment key={link.shortCode}>
                      <LinkCard
                        {...link}
                        deleteLink={handleDeleteLink}
                        copyLink={handleCopyLink}
                      />
                      {i !== links.length - 1 && (
                        <Box my={4}>
                          <Divider />
                        </Box>
                      )}
                    </Fragment>
                  ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
