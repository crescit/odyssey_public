import React from 'react';
import { H2 } from '../../../library/atoms/H2';

const Welcome = ({ name }) => { 
    return (
        <div>
        {name && <H2>Welcome, {name}</H2>}
        </div>
    )
}

export default Welcome;