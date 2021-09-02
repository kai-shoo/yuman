import { Grid, FormControl, OutlinedInput, FormHelperText } from '@material-ui/core';
import { PaymentChip } from './PaymentChip';
import { PlasticLayout } from './PlasticLayout';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

const clearSpaces = (string) => string.replace(/ /g, '');
const addSpaces = (string) => string.replace(/(.{4})/g, '$1 ');
const formatDate = string => string.replace(/(.{2})/, '$1/');
const cleanDate = string => string.split('/').join('');
const getDigits = string => string.replace(/[^0-9]+/g, '');

function AddCardForm() {
  const [pan, setPan] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCvc] = useState('');
  const formattedPan = addSpaces(pan);
  const formattedDate = formatDate(date);
  ///////////
  const handlePanKeyDown = e => {

    const is4thChar = formattedPan.slice(-1) === ' ';
    if (e.code === 'Backspace' && is4thChar) {
      e.preventDefault();
      setPan(pan => pan.slice(0, -1));
    }
  }

  const handlePanChange = (e) => {
    const newPan = getDigits(clearSpaces(e.target.value))
    setPan(newPan)
  }
  //////////
  const handleDateKeyDown = (e) => {
    const is3thChar = formattedDate.slice(-1) === '/';
    if (e.code === 'Backspace' && is3thChar) {
      e.preventDefault();
      setDate(date => date.slice(0, -1));
    }
  }

  const handleDateChange = (e) => {
    const newDate = getDigits(clearSpaces(e.target.value));
    setDate(newDate)
  }

  const handleCvcChange = (e) => {
    const newCvc = getDigits(clearSpaces(e.target.value));
    setCvc(newCvc)
  }


  return <form>
    <PlasticLayout bgc="white" container>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
        <Grid item>
          <PaymentChip type="master" />
        </Grid>
        <Grid item>
          <PaymentChip type="visa" />
        </Grid>
        <Grid item mr={1}>
          <PaymentChip type="mir" />
        </Grid>
      </Grid>

      <TextField
        id="outlined-helperText"
        placeholder="Номер карты"
        size="small"
        variant="outlined"
        required
        onKeyDown={handlePanKeyDown}
        onChange={handlePanChange}
        value={formattedPan}

        inputProps={{ 'maxlength': '20', 'inputmode': 'decimal', 'pattern': 'd*' }}
      />

      <Grid item container justifyContent="space-between" alignItems="center" >
        <Grid item xs={4}>
          <TextField
            id="pan"
            placeholder="ММ/ГГ"
            size="small"
            variant="outlined"
            inputProps={{ 'maxlength': '5' }}
            inputMode='decimal'
            onKeyDown={handleDateKeyDown}
            onChange={handleDateChange}
            value={formattedDate}
          />
        </Grid>
        <Grid container item xs={7} direction="row">
          <FormControl
            size="small"
            variant="outlined">
            <Grid container justifyContent="space-between">
              <Grid item xs={7}>
                <FormHelperText>Три цифры на обороте</FormHelperText>
              </Grid>
              <Grid item xs={5}>
                <OutlinedInput
                  id="cvc"
                  placeholder="CVC"
                  inputProps={{ 'maxlength': '3' }}
                  onChange={handleCvcChange}
                  value={cvc}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </PlasticLayout>
  </form>
}

export { AddCardForm };