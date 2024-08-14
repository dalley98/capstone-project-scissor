import { memo } from "react";
import { Typography, Button, Box } from "@mui/material";
import { BarChart as ChartIcon } from "@mui/icons-material";
import { format } from "date-fns";

interface ILinkCardProps {
  id: string;
  createdAt: Date;
  name: string;
  longUrl: string;
  shortCode: string;
  totalClicks: number;
  deleteLink: (id: string) => void;
  copyLink: (link: string) => void;
}

const LinkCard: React.FC<ILinkCardProps> = ({
  id,
  createdAt,
  name,
  longUrl,
  shortCode,
  totalClicks,
  deleteLink,
  copyLink,
}) => {
  const shortUrl = `${window.location.host}/${shortCode}`;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box width="50%">
        <Typography color="textSecondary" variant="overline">
          Created at {format(createdAt, "d MMM, HH:mm")}
        </Typography>
        <Box my={1}>
          <Typography style={{ marginBottom: "5px" }} variant="h5">
            {name}
          </Typography>
          <Typography style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {longUrl}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ mr: { xs: "0.5rem", sm: "3rem" } }}>
            <Typography color="primary">{shortUrl}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Button
              onClick={() => copyLink(shortUrl)}
              color="primary"
              size="small"
              variant="contained"
              disableElevation
            >
              copy
            </Button>

            <Button
              onClick={() => deleteLink(id)}
              color="secondary"
              size="small"
              variant="outlined"
              disableElevation
            >
              delete
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box display="flex" justifyContent="center">
          <Typography>{totalClicks}</Typography>
          <ChartIcon />
        </Box>
        <Typography
          variant="overline"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Total Clicks
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(LinkCard);
