import React from 'react';
import { H2 } from '../../../library/atoms/H2';
import {
  Save,
  Cancel,
  DetailsField,
  P,
  FormBusiness,
  Input,
} from './Form.styled';
import Grid from '@material-ui/core/Grid';

class FormHoursDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysOpen: '',
      hoursOpen: '',
      hoursClosed: ','
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
    //   daysOpen,
    //   hoursOpen,
    //   hoursClosed
    // } = this.state;
    return (
      <FormBusiness style={{marginTop: 15}}>
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
                outline: 'none',
              }}
            >
              When Are You Open?
            </H2>
            <Grid container spacing={2} style={{padding: 15}}>
              <Grid item xs={12} md={12}>
                <P>
                  <label htmlFor='daysopen'>
                    <Input
                      type='checkbox'
                      id='daysopen'
                      name='daysOpen'
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor='Sunday'>Sunday</label>
                    <Input
                      type='checkbox'
                      id='daysopen'
                      name='daysOpen'
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor='Monday'>Monday</label>
                    <Input
                      type='checkbox'
                      id='daysopen'
                      name='daysOpen'
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor='Tuesday'>Tuesday</label>
                    <Input
                      type='checkbox'
                      id='daysopen'
                      name='daysOpen'
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor='Wednesday'>Wednesday</label>
                    <Input
                      type='checkbox'
                      id='daysopen'
                      name='daysOpen'
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor='Thursday'>Thursday</label>
                    <Input
                      type='checkbox'
                      id='daysopen'
                      name='daysOpen'
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor='Friday'>Friday</label>
                    <Input
                      type='checkbox'
                      id='daysopen'
                      name='daysOpen'
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor='Saturday'>Saturday</label>
                  </label>
                </P>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{padding: 15}}>
              <Grid item xs={12} md={12}>
                <h3 style={{marginBottom: 0, marginTop: 0}}>When do you Open?</h3>
                </Grid> 
              </Grid>
            <Grid container spacing={2} style={{padding: 15}}>
              <Grid item xs={12} md={12}>
              <input type="time" id="hoursopen" name="hoursOpen"
       min="09:00" max="18:00" />
       <input type="time" id="hoursopen" name="hoursOpen"
       min="09:00" max="18:00" />
       <input type="time" id="hoursopen" name="hoursOpen"
       min="09:00" max="18:00" />
       <input type="time" id="hoursopen" name="hoursOpen"
       min="09:00" max="18:00" />
       <input type="time" id="hoursopen" name="hoursOpen"
       min="09:00" max="18:00" />
       <input type="time" id="hoursopen" name="hoursOpen"
       min="09:00" max="18:00" />
       <input type="time" id="hoursopen" name="hoursOpen"
       min="09:00" max="18:00" />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{padding: 15}}>
              <Grid item xs={12} md={12}>
                <h3 style={{marginBottom: 0, marginTop: 0}}>When do you Close?</h3>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{padding: 15}}>
              <Grid item xs={12} md={12}>
              <input type="time" id="hoursclosed" name="hoursClosed"
       min="09:00" max="18:00" />
       <input type="time" id="hoursclosed" name="hoursClosed"
       min="09:00" max="18:00" />
       <input type="time" id="hoursclosed" name="hoursClosed"
       min="09:00" max="18:00" />
       <input type="time" id="hoursclosed" name="hoursClosed"
       min="09:00" max="18:00" />
       <input type="time" id="hoursclosed" name="hoursClosed"
       min="09:00" max="18:00" />
       <input type="time" id="hoursclosed" name="hoursClosed"
       min="09:00" max="18:00" />
       <input type="time" id="hoursclosed" name="hoursClosed"
       min="09:00" max="18:00" />
                </Grid>
              </Grid>
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
      </FormBusiness>
    );
  }
}

export default FormHoursDetails;
