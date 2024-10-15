import { createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const DetailsField = styled.div`
  text-align: center;
`;

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

export const Form = styled.form`
  width: auto;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
  padding: 5px;
`;

export const FormBusiness = styled.form`
  display: flex; 
  justify-content: center;
  flex-direction: column;
  width: auto;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
  padding: 20px 10px;
`;

export const P = styled.p`
  display: block;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 0px;
`;

export const Input = styled.input`
  background: transparent;
  border: 0px;
  border-bottom: 1px solid white;
  padding: 10px;
  font-size: 20px;
  outline: none;
`;

export const Textarea = styled.textarea`
  background: transparent;
  border: 0px;
  border-bottom: 1px solid white;
  padding: 10px;
  font-size: 20px;
  outline: none;
`;

export const Save = styled.button`
  font-size: 20px;
  padding: 5px 25px 5px 25px;
  color: white;
  background-color: #000000;
  border-color: #000000;
  border-radius: 10px;
  font-weight: 'bold';
  margin-top: 20px;
  cursor: pointer;
  box-shadow: 0 2px 2px #669999;
  text-transform: uppercase;
  &:hover {
    background-color: #1a1a1a;
    border-color: #1a1a1a;
  }
  &:active {
    outline: none;
    border: none;
  }
`;

export const Cancel = styled.button`
  font-size: 20px;
  padding: 5px 25px 5px 25px;
  color: #000000;
  background-color: #ffffff;
  border-color: #ffffff;
  border-radius: 10px;
  font-weight: 'bold';
  margin-top: 20px;
  cursor: pointer;
  box-shadow: 0 2px 2px lightgray;
  text-transform: uppercase;
  &:hover {
    background-color: #cccccc;
    border-color: #cccccc;
  }
  &:active {
    outline: none;
    border: none;
  }
`;