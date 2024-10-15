import React from 'react';
import { H2 } from '../../../library/atoms/H2';
import { Save, Cancel, DetailsField, P, Form, Input } from './Form.styled';

class FormPersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    };
  }
  save = (e) => {
    e.preventDefault();
    // SEND DATA TO API
  };
  cancel = (e) => {
    e.preventDefault();
  };
  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    // const { firstName, lastName, email, phoneNumber } = this.state;
    return (
      <Form>
        <section>
          <DetailsField>
            <H2
              style={{
                color: 'white',
                borderBottom: 'solid',
                borderColor: '#669999',
                paddingBottom: 15,
                paddingTop: 15,
                fontWeight: 'bold',
              }}
            >
              Enter User Details
            </H2>
            <P>
              <label htmlFor='firstname'>
                <Input
                  type='text'
                  id='firstname'
                  name='firstName'
                  placeholder='First Name'
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='lastname'>
                <Input
                  type='text'
                  id='lastname'
                  name='lastName'
                  placeholder='Last Name'
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='email'>
                <Input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Email'
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='phonenumber'>
                <Input
                  type='tel'
                  id='phonenumber'
                  name='phoneNumber'
                  placeholder='Phone Number'
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <p style={{ display: 'inline-block', marginRight: 20 }}>
              <Save type='button' onClick={this.save}>
                Save
              </Save>
            </p>
            <p style={{ display: 'inline-block' }}>
              <Cancel type='button' onClick={this.cancel}>
                Cancel
              </Cancel>
            </p>
          </DetailsField>
        </section>
      </Form>
    );
  }
}

export default FormPersonalDetails;
