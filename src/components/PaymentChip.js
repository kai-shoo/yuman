import styled from 'styled-components';
import visaImage from '../img/visa-logo.svg';
import mastercardImage from '../img/mastercard-logo.svg';
import mirImage from '../img/mir-logo.svg';

const PaymentLogo = styled.img.attrs(props => {
  let image = '';
  switch (props.type) {
    case 'visa':
      image = visaImage
      break;
    case 'master':
      image = mastercardImage
      break;
    case 'mir':
      image = mirImage
      break;

    default:
      console.warn('[PaymentLogo] Unknown type of logo');
      break;
  }

  return ({
    height: props.height || "20",
    src: image,

  })
})`
  max-height: 100%;
  max-width: 100%;
`

const PaymentWrapper = styled.div.attrs(props => {
  let $backgroundColor = '';
  switch (props.type) {
    case 'visa':
      $backgroundColor = '#18236D'
      break;
    case 'master':
      $backgroundColor = 'black'
      break;
    case 'mir':
      $backgroundColor = '#006848'
      break;

    default:
      console.warn('[PaymentLogo] Unknown type of logo');
      break;
  }

  return ({
    $backgroundColor,
  })
})`
  display: flex;
  align-items: center;
  justify-content: center;;

  width: 30px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${props => props.$backgroundColor};
`

function PaymentChip({ type }) {
  return <PaymentWrapper type={type} ><PaymentLogo type={type} /></PaymentWrapper>;
}

export { PaymentChip };