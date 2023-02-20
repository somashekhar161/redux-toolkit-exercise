import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { counterActions, nameActions, incrementAsync } from "./store";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  styled,
  colors,
} from "@mui/material";
import { useRef, useEffect } from "react";

function App() {
  const counter = useSelector((state) => state.counter.value);
  const name = useSelector((state) => state.name.name);
  const loading = useSelector((state) => state.counter.isLoaded);
  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const incrementHold = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      dispatch(counterActions.increment());
    }, 200);
  };
  const decrementHold = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      dispatch(counterActions.decrement());
    }, 200);
  };

  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  const add = () => {
    dispatch(counterActions.addby(10));
  };

  const addAsync = () => {
    dispatch(incrementAsync(10));
  };

  function handleChange(e) {
    const re = /^[a-zA-Z ]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      dispatch(nameActions.onChange(e.target.value));
    }
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: colors.grey[50],
    backgroundColor: colors.grey[500],
    "&:hover": {
      backgroundColor: colors.grey[700],
    },
    margin: "0 5px",
  }));

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          borderRadius: "16px",
          boxShadow: "10px 10px 25px 7.5px grey;",
        }}
        mt={20}
      >
        <Typography variant="h3" component="h3">
          Counter with toolkit
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="h2">
            Counter {counter}
            {loading ? "" : <CircularProgress size={20} />}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "10px 10px",
          }}
        >
          <ColorButton
          onClick={increment}
            onMouseDown={incrementHold}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
            variant="contained"
          >
            increment
          </ColorButton>
          <ColorButton
          onClick={decrement}
            onMouseDown={decrementHold}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
            variant="contained"
          >
            decrement
          </ColorButton>

          <ColorButton onClick={add} variant="contained">
            add
          </ColorButton>
          <ColorButton onClick={addAsync} variant="contained">
            addAsync
          </ColorButton>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "16px",
          boxShadow: "10px 10px 25px 7.5px grey;",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ paddingTop: "2rem", paddingBottom: ".8rem" }}
        >
          Text with toolkit
        </Typography>
        <TextField
          id="name"
          key="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleChange}
          size="large"
        />

        <Typography sx={{ padding: "1rem" }}>{name}</Typography>
      </Box>
    </Container>
  );
}

export default App;
