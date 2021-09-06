import { Grid, FormControl, OutlinedInput, FormHelperText, Button, Box, InputLabel } from '@material-ui/core';
import { PaymentChip } from './PaymentChip';
import { PlasticLayout } from './PlasticLayout';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  clearSpaces, addSpaces, formatDate, cleanDate, getDigits, formatCvc, validateCvc, validatePan, validateDate,
} from '../utils/form';
import { useRef } from 'react';


const FormHelperWrapper = styled(FormHelperText)`
  position: absolute;
  left: 0;
  bottom: -20px;
  width: 400px;
`

const InputLabelWrapper = styled(InputLabel)`
  position: static;
  transform: initial;
`


const AddCardForm = forwardRef(({ isStored, onSuccess }, ref) => {
  const [pan, setPan] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCvc] = useState('');

  const formattedPan = addSpaces(pan);
  const formattedDate = formatDate(date);
  const formattedCvc = formatCvc(cvc);
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
    panSelection.current = e.target.selectionStart;
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
    const newDate = getDigits(cleanDate(e.target.value));
    dateSelection.current = e.target.selectionStart;
    setDate(newDate)
  }

  const handleCvcChange = (e) => {
    const newLength = e.target.value.length;
    const newDigit = e.target.value.slice(-1);
    if (newLength > cvc.length) {
      setCvc(cvc => cvc + newDigit)
    }

    if (newLength < cvc.length) {
      setCvc(cvc => cvc.slice(0, -1))
    }

    cvcSelection.current = e.target.selectionStart;
  }

  const clearError = () => {
    setErrorPan('');
    setErrorCvc('');
    setErrorDate('');
  }

  const clearForm = () => {
    setDate('')
    setCvc('')
    setPan('')
  }

  const onCLickResetHandler = (e) => {
    e.preventDefault();
    clearForm();
  }

  const [errorPan, setErrorPan] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorCvc, setErrorCvc] = useState('');

  const validateForm = useCallback(() => {
    const errorMessagePan = validatePan(pan, isStored);
    clearError();
    setErrorPan(errorMessagePan);
    if (Boolean(errorMessagePan)) return false;

    const errorMessageDate = validateDate(date);
    clearError();
    setErrorDate(errorMessageDate);
    if (Boolean(errorMessageDate)) return false;

    const errorMessageCvc = validateCvc(cvc)
    clearError();
    setErrorCvc(errorMessageCvc);
    if (Boolean(errorMessageCvc)) return false;

    return true;
  }, [setErrorPan, setErrorDate, setErrorCvc, cvc, date, isStored, pan])

  const handleSumbit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSuccess(pan);
      clearForm();
    }
  }

  useEffect(() => {
    const wasFailedAttempt = Boolean(errorCvc) || Boolean(errorDate) || Boolean(errorPan);
    if (wasFailedAttempt) validateForm();
  }, [errorCvc, errorDate, errorPan, validateForm]);

  const dateDom = useRef(null);
  const cvcDom = useRef(null);

  const panSelection = useRef(0);
  const dateSelection = useRef(0);
  const cvcSelection = useRef(0);

  useEffect(() => {
    if (ref.current.selectionStart % 5 === 0) {
      ref.current.selectionStart = panSelection.current + 1;
      ref.current.selectionEnd = panSelection.current + 1;
    } else {
      ref.current.selectionStart = panSelection.current;
      ref.current.selectionEnd = panSelection.current;
    }

    if (dateDom.current.selectionStart % 5 === 0) {
      dateDom.current.selectionStart = dateSelection.current + 1;
      dateDom.current.selectionEnd = dateSelection.current + 1;
    } else {
      dateDom.current.selectionStart = dateSelection.current;
      dateDom.current.selectionEnd = dateSelection.current;
    }

    if (ref.current.selectionStart % 5 === 0) {
      cvcDom.current.selectionStart = cvcSelection.current + 1;
      cvcDom.current.selectionEnd = cvcSelection.current + 1;
    } else {
      cvcDom.current.selectionStart = cvcSelection.current;
      cvcDom.current.selectionEnd = cvcSelection.current;
    }

  }, [pan, cvc, date, ref]);

  return <form onSubmit={handleSumbit} noValidate>
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
      <FormControl
        error={Boolean(errorPan)}
        size="small"
      >
        <OutlinedInput
          inputRef={ref}
          id="pan"
          name="pan"
          placeholder="Номер карты"
          variant="outlined"
          required
          key="focus"
          onKeyDown={handlePanKeyDown}
          onChange={handlePanChange}
          value={formattedPan}
          inputProps={{ 'maxLength': '20', 'inputMode': 'decimal' }}
        />
        <FormHelperWrapper>{errorPan}</FormHelperWrapper>

      </FormControl>

      <Grid item container justifyContent="space-between" alignItems="center" >
        <Grid item xs={4}
        >
          <FormControl
            size="small"
            variant="outlined"
            error={Boolean(errorDate)}
          >
            <OutlinedInput
              inputRef={dateDom}
              id="date"
              name="date"
              placeholder="ММ/ГГ"
              size="small"
              required
              inputProps={{ 'maxLength': '5', 'inputMode': 'decimal', }}
              onKeyDown={handleDateKeyDown}
              onChange={handleDateChange}
              value={formattedDate}
            />
            <FormHelperWrapper>{errorDate}</FormHelperWrapper>
          </FormControl>
        </Grid>
        <Grid container item xs={7} direction="row">
          <FormControl
            variant="outlined"
            error={Boolean(errorCvc)}
            size="small">
            <Grid container justifyContent="space-between">
              <Grid item xs={7}>
                <InputLabelWrapper variant='standard' shrink={false} htmlFor="cvc" disableAnimation disabled>Три цифры на обороте</InputLabelWrapper >
              </Grid>
              <Grid item xs={5}>
                <OutlinedInput
                  inputRef={cvcDom}
                  id="cvc"
                  name="cvc"
                  required
                  placeholder="CVC"
                  inputProps={{ 'maxLength': '3', 'inputMode': 'decimal', }}
                  onChange={handleCvcChange}
                  value={formattedCvc}
                />
                <FormHelperWrapper>{errorCvc}</FormHelperWrapper>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </PlasticLayout>
    <Box mt={4}>
      <Grid container spacing={10}>
        <Grid item>
          <Button variant="contained" onClick={onCLickResetHandler}>
            Отменить
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" type='submit'>
            Продолжить
          </Button>
        </Grid>
      </Grid>
    </Box>

  </form >
})

export { AddCardForm };