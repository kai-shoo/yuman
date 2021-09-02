import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const ASPECT_RATIO_ISO = 1.586;

const PlasticLayout = styled(Grid).attrs(props => ({
  height: props.height || '207px',
  $aspectRatio: props.aspectRatio || ASPECT_RATIO_ISO,
}))`
  display: grid;
  grid-gap: 16px;
  grid-template-rows: repeat(3, 1fr) ;
  justify-content: stretch;
  align-content: space-between;
  padding: 16px;
  
  height: ${props => props.height};
  width: calc(${props => props.height} * ${props => props.$aspectRatio});
  background-color: ${props => props.bgc || 'black'};
  border-radius: calc(${props => props.height} * 0.06);
  box-shadow: 0 0 8px lightgrey;
`

export { PlasticLayout }