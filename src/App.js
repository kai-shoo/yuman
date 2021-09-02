import { Container, Typography, Grid, Button, Box } from '@material-ui/core';
import { Section } from './components/Section'
import { PlasticCard } from './components/PlasticCard';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey, purple } from '@material-ui/core/colors';
import { AddCardForm } from './components/AddCardForm'

const theme = createTheme({
  palette: {
    secondary: {
      main: grey[500],
    },

    primary: {
      main: purple[600],
    }
  },
});

const cards = [
  {
    pan: '313131331313133131313',
    type: 'master'
  },
  {
    pan: '313131331313133131313',
    type: 'master'
  },
  {
    pan: '31313133131313',
    type: 'master'
  },
]



function App() {
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
            <Button variant="contained" color="primary">
              Привязать еще одну
            </Button>
          </Box>
        </Section>

        <Section>
          <Typography variant="h2" gutterBottom>Перевод на кошелёк</Typography>
          <AddCardForm />
        </Section>

        <Section>
          <Typography variant="h2" gutterBottom>Привязка банковской карты</Typography>

        </Section>

      </Container>
    </ThemeProvider >
  );
}

export default App;
