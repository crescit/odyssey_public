import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    buttonpress: {
      fontWeight: 'bold',
      fontSize: 15,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 40,
      paddingRight: 40,
      backgroundColor: '#669999',
      color: '#ffffff',
      '&:hover': {
          backgroundColor: '#0033cc'
      }
    },
  }));

  // ShopifyOnboarding
export const Div = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 30px;
padding: 0px 2px;
left: calc(50% - 956px / 2);
background: #ffffff;
`;

export const Divheading = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
padding: 0px;
position: static;
left: 311px;
top: 58px;
flex: none;
flex-grow: 0;
margin: 0px 30px;
// border: solid red 1px;
`;

export const Heading = styled.p`
font-size: 20px;

font-weight: 500;
line-height: 24px;
letter-spacing: 0.15px;
font-style: normal;
display: 'flex';
color: var(--title);
margin: 0px 5px;
`;

export const Subheading = styled.p`
min-width: 260px;
max-width: 334px;
height: 80px;
font-size: var(sml-size);
font-family: var(--font);
font-style: normal;
font-weight: normal;
line-height: 20px;
letter-spacing: 0.25px;
color: var(--body);
margin: 5px;
`;

//General
export const DivFormSection = styled.div`
padding: 0px;
position: static;
width: 80%;
max-width: 956px;
flex-grow: 0;
margin: 0 auto;
`;

export const Field = styled.label`
text-align: start;
font-style: normal;
font-weight: 600;
font-size: var(--lgmid-size);
line-height: 24px;
letter-spacing: 0.15px;
width: 165px;
color: var(--title);
position: static;
`;

export const FieldInput = styled.input`
font-family: var(--font);
font-size: var(--lgmid-size);
color: var(--title);
height: 42px;
border: 1px solid var(--border);
border-radius: 4px;
padding: 9px 12px;
box-sizing: border-box;
background: #ffffff;
width: 75%;
min-width: 240px;
`;

export const FieldWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
padding: 0px;
position: static;
flex: none;
flex-grow: 0;
margin: 16px 0 30px;
`;

export const InputFile = styled.input`
height: 76px;
font-style: normal;
font-weight: normal;
font-size: var(--lgmid-size);
line-height: 24px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.5px;
color: var(--body);
flex: none;
flex-grow: 0;
padding: 9px 12px;
box-sizing: border-box;
border: 1px solid var(--border);
border-radius: 4px;
`;

export const InputList = styled.select`
cursor: pointer;
font-family: var(--font);
font-size: var(--lgmid-size) normal 400;
letter-spacing: 0.5px;
color: var(--title);
height: 42px;
border: 1px solid var(--border);
border-radius: 4px;
padding: 9px 12px;
box-sizing: border-box;
background: #ffffff;
width: 75%;
min-width: 240px;
`;

export const InputTextbox = styled.textarea`
font-family: var(--font);
font-size: var(--sml-size);
height: 114px;
border: 1px solid var(--border);
border-radius: 4px;
position: static;
box-sizing: border-box;
background: #ffffff;
width: 75%;
min-width: 240px;
resize: none;
`;

export const Line = styled.hr`
background-color: var(--border);
border: 1px solid var(--border);
margin: 19px auto;
width: 80%;
height: 2px;
positon: static;
flex-grow: 0;
`;

export const Subfield = styled.label`
font-style: normal;
font-weight: normal;
font-size: var(--lgmid-size);
line-height: 24px;
letter-spacing: 0.5px;
color: var(--title);
margin: 0 4px 0 0;
text-align: left;
`;
