import React from 'react';
import { H2 } from '../../../library/atoms/H2';
import { H3 } from '../../../library/atoms/H3';
import {
  Save,
  Cancel,
  P,
  FormBusiness,
  Input,
  Textarea,
} from './Form.styled';
import Grid from '@material-ui/core/Grid';

class FormBusinessDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      businessDescription: '',
      businessWebsite: '',
      businesstype: '',
      businessNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
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
    // const {
    //   businessName,
    //   businessDescription,
    //   businessWebsite,
    //   businesstype,
    //   businessNumber,
    //   address,
    //   city,
    //   state,
    //   zipCode,
    // } = this.state;
    return (
      <FormBusiness id="business-onboarding-form">
        <H3>Welcome to OdysseyCommerce</H3>
        <H2
          style={{
            borderBottom: 'solid',
            borderColor: '#669999',
            paddingBottom: 15,
            paddingTop: 15,
            fontWeight: 'bold',
            outline: 'none',
          }}
        >
          Tell Us About Your Business
        </H2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <P>
              <label htmlFor='businessname'>
                <Input
                  type='text'
                  id='businessname'
                  name='businessName'
                  placeholder='Business Name'
                  required
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='businessdescription'>
                <Textarea
                  cols='20'
                  rows='3'
                  id='businessdescription'
                  name='businessDescription'
                  placeholder='Describe your Business in One Sentence'
                  maxLength='200'
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='businesswebsite'>
                <Input
                  type='url'
                  id='businesswebsite'
                  name='businessWebsite'
                  placeholder='Business Website'
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='businesstype'>
                <Input
                  type='text'
                  id='businesstype'
                  name='businessType'
                  placeholder='Type of Business'
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
          </Grid>
          <Grid item xs={12} md={6}>
            <P>
              <label htmlFor='businessnumber'>
                <Input
                  type='tel'
                  id='businessnumber'
                  name='businessNumber'
                  placeholder='Main Business Number'
                  required
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='address'>
                <Input
                  type='text'
                  id='address'
                  name='address'
                  placeholder='Street Address'
                  required
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='city'>
                <Input
                  type='text'
                  id='city'
                  name='city'
                  placeholder='City'
                  required
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='state'>
                <Input
                  type='text'
                  id='state'
                  name='state'
                  placeholder='State'
                  required
                  maxLength='2'
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
            <P>
              <label htmlFor='zipcode'>
                <Input
                  type='text'
                  id='zipcode'
                  name='zipCode'
                  placeholder='Zip Code'
                  required
                  onChange={this.handleInputChange}
                />
              </label>
            </P>
          </Grid>
        </Grid>
        <div>
          <div
            style={{
              textAlign: 'center',
              marginBottom: -15,
              fontSize: 20,
              outline: 'none',
            }}
          >
            Picture of Your Business
            <label htmlFor='file'>
              <input
                style={{
                  background: 'transparent',
                  border: 0,
                  padding: 10,
                  fontSize: 15,
                  outline: 'none',
                }}
                type='file'
                id='myFile'
                name='filename'
              />
            </label>
          </div>
        </div>
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
      </FormBusiness>
    );
  }
}

export default FormBusinessDetails;
