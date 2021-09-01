import { Grid, Box, Typography } from '@material-ui/core';
import { PlasticLayout } from './PlasticLayout';
import defaultLogo from '../img/tinkoff-logo.svg'
import { PlasticLogo } from './PlasticLogo';
import { PaymentChip } from './PaymentChip';


function PlasticCard({ logo = defaultLogo, logoAlt = 'Тинькофф Банк', type, pan, hiddenPan, ...restProps }) {
  let cardNumber = pan;
  if (hiddenPan) {
    cardNumber = `${pan.slice(0, 6)}${'*'.repeat(pan.slice(6, -4).length)}${pan.slice(-4)}`
  }

  const formattedNumber = cardNumber.trim().replace(/(.{4})/g, '$1 ');

  return (
    <div className="App">
      <PlasticLayout container direction="column" justifyContent="center" alignItems="center"  {...restProps} >
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item xs={5}>
            <Box px={2} >
              <PlasticLogo src={logo} alt={logoAlt} />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <PaymentChip type={type} />
          </Grid>
        </Grid>
        <Grid container item alignItems="center" >
          <Box px={2} >
            <Typography color="secondary" variant="h6" >{formattedNumber}</Typography>
          </Box>
        </Grid>
      </PlasticLayout>
    </div >
  );
}

export { PlasticCard };
