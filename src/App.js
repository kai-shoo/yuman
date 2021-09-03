import { Container, Typography, Grid, Button, Box } from '@material-ui/core';
import { Section } from './components/Section'
import { PlasticCard } from './components/PlasticCard';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, grey, purple } from '@material-ui/core/colors';
import { AddCardForm } from './components/AddCardForm'
import { useRef, useState } from 'react';
import { SuccessDialog } from './components/SuccessDialog'

const theme = createTheme({
  palette: {
    success: {
      main: green[500],
    },
    secondary: {
      main: grey[500],
    },
    primary: {
      main: purple[600],
    }
  },
});

const MOCK = [
  {
    pan: '374245455400126',
    type: 'master'
  },
  {
    pan: '6011000991300009',
    type: 'master'
  },
  {
    pan: '5200533989557118',
    type: 'master'
  },
]


function App() {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState(MOCK);
  const isStored = (pan) => cards.find(card => card.pan === pan)
  const inputRef = useRef(null);
  const onClickHandler = (ref) => {
    inputRef.current.focus();
  }

  const addCard = (pan, type = 'master') => {
    setCards(cards => [...cards, { pan, type }])
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Section>
          <Typography variant="h2" gutterBottom>Мои карты</Typography>
          <Grid container spacing={2} justifyContent="flex-start">
            {cards.map(card =>
              <Grid item key={card.pan}>
                <PlasticCard type={card.type} pan={card.pan} hiddenPan />
              </Grid>)}
          </Grid>
          <Box my={4}>
            <Button variant="contained" color="primary" onClick={onClickHandler}>
              Привязать еще одну
            </Button>
          </Box>
        </Section>

        <Section>
          <Typography variant="h2" gutterBottom>Привязка банковской карты</Typography>
          <AddCardForm ref={inputRef} isStored={isStored} onSuccess={addCard} />
        </Section>

      </Container>
      <SuccessDialog open={open} onClose={handleClose} />
    </ThemeProvider >
  );
}

export default App;
