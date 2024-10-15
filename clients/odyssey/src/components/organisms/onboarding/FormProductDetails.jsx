import React from 'react';
import { H2 } from '../../../library/atoms/H2';
import { PG } from '../../../library/atoms/PG';
import { Save, Cancel, DetailsField, Form } from './Form.styled';

class FormProductDetails extends React.Component {
  save = (e) => {
    e.preventDefault();
    // SEND DATA TO API
  };
  cancel = (e) => {
    e.preventDefault();
  };

  render() {
    // const { values, handleChange } = this.props;
    return (
      <Form action='/action_page.php'>
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
              What Are You Selling?
            </H2>
            <PG style={{ color: 'white', fontSize: 20, marginTop: 10 }}>
              Enter Your Shopify Store URL
            </PG>
            <p style={{ display: 'inline-block' }}>
              <label htmlFor='url'>
                <input
                  style={{
                    background: 'transparent',
                    border: 0,
                    padding: 10,
                    fontSize: 20,
                    color: 'white',
                  }}
                  type='url'
                  id='url'
                  name='url'
                  placeholder='https://myshopifystore.com'
                  required
                />
              </label>
            </p>
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

export default FormProductDetails;
