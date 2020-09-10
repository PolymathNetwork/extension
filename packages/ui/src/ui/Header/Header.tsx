import styled from 'styled-components';
import { Box } from '../Box';

export const Header = styled(Box)({
  paddingTop: (({ theme }) => theme.space.m),
  paddingBottom: (({ theme }) => theme.space.m),
  backgroundImage: 'linear-gradient(to right, #170087, #1813E4)',
});