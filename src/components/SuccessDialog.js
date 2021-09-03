import { Button, Box, Grid, Dialog, DialogTitle, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import styled from 'styled-components';

const CheckCircleOutlineIconWrapper = styled(CheckCircleOutlineIcon)`
width: 200px;
height:200px;
margin-right: auto;
margin-left: auto;
color: green;
`

function SuccessDialog({ onClose, open }) {
  return (
    <Dialog onClose={onClose} aria-labelledby="success-title" open={open}>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <DialogTitle align="center" id="success-title">Привязка банковской карты</DialogTitle>
        <CheckCircleOutlineIconWrapper fontSize="large" />
        <Typography align="center" variant="h4" gutterBottom>Вы великолепны</Typography>
        <Typography align="center" gutterBottom paragraph>Через минуту ваша карта появиться в кошельке — вы увидите её в разделе банковские карты</Typography>
        <Box mb={2}>
          <Button variant="contained" onClick={onClose}>
            Обратно к картам
          </Button>
        </Box>
      </Grid>
    </Dialog>
  );
}

export { SuccessDialog };