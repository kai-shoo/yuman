import { Container, Typography, Grid } from '@material-ui/core';
import { Section } from './components/Section'
import { PlasticCard } from './components/PlasticCard';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    secondary: {
      main: grey[500],
    },
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
              <Grid item >
                <PlasticCard type={card.type} pan={card.pan} hiddenPan />
              </Grid>)}
          </Grid>
        </Section>

        <Section>
          <Typography variant="h2" gutterBottom>Перевод на кошелёк</Typography>

        </Section>

        <Section>
          <Typography variant="h2" gutterBottom>Привязка банковской карты</Typography>

        </Section>

      </Container>
    </ThemeProvider >
  );
}

export default App;
