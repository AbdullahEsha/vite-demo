import { Link } from "react-router-dom";
import { FC } from "react";
import { Typography, Button, Box } from "@mui/material";

const Home: FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h1" gutterBottom>
        Home
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the home page!
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/use-action-state"
        >
          Use Action State
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/use-form-status"
        >
          Use Form Status
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/use-optimistic"
        >
          Use Optimistic & Use Transition
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/context-and-use"
        >
          Context and Use
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
