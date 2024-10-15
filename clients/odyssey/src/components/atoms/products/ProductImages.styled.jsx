import styled from 'styled-components'

// Images 
export const ImageWrapper = styled.div`
display: flex;
text-align: center;
max-height: 640px;
width: 60%;
max-width: 751px;
min-width: var(--width-mobile);
`;

export const SmallImageWraper = styled.div`
display: flex;
flex-direction: column;
width: 120px;
min-width: 90px;
overflow-y: scroll;
`;

export const SmallImage = styled.img`
width: 90px;
height: 90px;
object-position: center;
object-fit: cover;
border-radius: 8px;
`;

export const MainImage = styled.img`
width: calc(100% - 110px);
height: 500px;
object-position: top;
object-fit: contain;
border-radius: 8px;
`;
