import styled from 'styled-components';
import { BtnText } from '../../../library/atoms/buttons';
import StoreBrowse from '../../atoms/stores/StoreBrowse';
import { B1Link } from '../../../library/atoms/B1Link'


export const ViewListOnlyButton = styled(B1Link)`
  justify-self: flex-end;
  &.selected { text-decoration: underline !important; }
  & > * { display: inherit; }
`;

export const ViewListAndMapButton = styled(B1Link)`
  justify-self: flex-end;
  padding-right: 0;
  &.selected { text-decoration: underline !important; }
  & > * { display: inherit; }
`;

export const StoreMapBrowse = styled(StoreBrowse)`

`;