import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const ASPECT_RATIO_ISO = 1.586;

const PlasticLayout = styled(Grid).attrs(props => ({
  height: props.height || '207px',
  $aspectRatio: props.aspectRatio || ASPECT_RATIO_ISO,
}))`
  display: grid;
  grid-template-rows: 40% 40px 40%;
  justify-content: stretch;
  align-content: space-between;
  
  height: ${props => props.height};
  width: calc(${props => props.height} * ${props => props.$aspectRatio});
  background-color: lightgrey;
  border-radius: calc(${props => props.height} * 0.06);
`

export { PlasticLayout }