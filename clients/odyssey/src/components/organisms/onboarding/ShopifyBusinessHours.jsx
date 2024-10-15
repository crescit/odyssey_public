import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { timeZones, daysOfTheWeek, dayRank } from '../../../common/constants';
import { BtnText, BtnIcon } from '../../../library/atoms/buttons'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {
  DivFormSection,
  Field,
  FieldInput,
  FieldWrapper,
  InputList,
  Line,
  Subfield,
} from '../pages/ShopifyOnboardingPage.styled';

const ShopifyBusinessHours = ({meta, setMeta, style }) => {
  const hoursOpen = meta.hours; // hours: [{ order: '', day: '', from: '', to: ''}]
  const [newHours, setNewHours] = useState({ order: 0, day: '', from: '', to: ''});
  const hoursOpHasData = hoursOpen && hoursOpen.length > 1 ;
  let ampm = '';
  
  // eslint-disable-next-line
  hoursOpen.sort((a,b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    if (a.from < b.from) return -1;
    if (a.from > b.from) return 1;
    if (a.to < b.to) return -1;
    if (a.to >= b.to) return 1;
  });

  const ampmHour =(hrStr) => {
    const hr = parseInt(hrStr.substring(0,2));
    ampm = hr >= 12 ? 'pm' : 'am';
    const time = hr % 12 || 12;
    return time.toString() + hrStr.substring(2);
  };

  const setTimeZone = (value) => {
    setMeta(prevState => ({ ...prevState, timeZone: value }));
  }
  
  const handleAddNewHours = (e) => {
    e.preventDefault();
    const newHoursHasData = newHours.day !== '' && newHours.from !== '' && newHours.to !== '';
    if (newHoursHasData && newHours.order > 0) {
      setMeta(prevState => ({...prevState, hours: [...prevState.hours, newHours]}));
    } else if (newHoursHasData) {
      let loop = 1, abbr = newHours.day.substring(0,3);
      let idx = daysOfTheWeek.findIndex(day => day.abbr === abbr);

      if (idx === -1) return;
      if (newHours.day === 'Mon-Fri') {
        loop = 5;
      } else if (newHours.day === 'Mon-Sun') {
        loop = 7;
      } else if (newHours.day === 'Sat-Sun') {
        loop = 2;
      }

      for (let i = idx; i < idx + loop; i++) {
        if (!daysOfTheWeek[i]) return;
        let {name, order} = daysOfTheWeek[i] ; 
        let temp = {...newHours, day: name, order };
        setMeta(prevState => ({...prevState, hours: [...prevState.hours, temp]}));
      }
    }
  };

  const handleRemoveHours = (e,idx) => {
    e.preventDefault();
    const modHours = [...hoursOpen];
    modHours.splice(idx,1)
    if (hoursOpHasData) {
      setMeta(prevState => ({...prevState, hours: modHours}));
    }
  }

  return (
    <DivFormSection style={style}>
      
      <FieldWrapper style={{ alignItems: 'flex-start' }} >
          <Field style={{ marginTop: 16 }}>Hours of operation</Field>
          <FieldWrapper style={{ flexDirection: 'column', width: '75%', minWidth: 240 }} >
            <InputList name='hours' style={{width: '100%'}}
              onChange={(e) => setTimeZone(e.target.value)}
              defaultValue={meta && meta.timezone}
              required>
              {timeZones.map(zone => {
                return (
                  <option value={zone.value} key={zone.id + zone.gmt} >
                    {zone.text}
                  </option>
                )
              })}
            </InputList>
          {/* eslint-disable-next-line */}
          {hoursOpHasData ? hoursOpen.map((hours, i) => {
            if (i > 0) {
              const from = ampmHour(hours.from) + '' + ampm;
              const to = ampmHour(hours.to) + '' + ampm;
            return (
            <FieldWrapper 
              style={{ margin: '16px 0 0 0', alignItems: 'center', width: '48%', minWidth: 220 }} 
              key={i.toString()+hours.day} >
              <Subfield>{hours.day}</Subfield>
              <FieldWrapper style={{ margin: 0, alignItems: 'center', justifyContent: 'flex-start' }} >
                <Subfield>{from}</Subfield>
                <Subfield>to</Subfield>
                <Subfield>{to}</Subfield>
                <BtnIcon onClick={(e)=> handleRemoveHours(e,i)}><CancelOutlinedIcon/></BtnIcon>
              </FieldWrapper>
            </FieldWrapper>
            )}
          }) : null 
          }

            <FieldWrapper style={{ alignItems: 'center', width: '100%', margin: '16px 0 0',justifyContent: 'flex-end' }} >
              <InputList name='day' 
                style={{ width: '20%', minWidth: 169, marginTop: 16, marginRight: 'auto'}}
                onChange={(e) => 
                  setNewHours({...newHours, day: e.target.value, order: dayRank[e.target.value]})
                }
                >
                {daysOfTheWeek.map((day, i) => {
                  return (
                    <React.Fragment key={i.toString()+day.name}>
                    {/* eslint-disable-next-line */}
                    {i === 4 ? (<Line/>) : <></>}
                    <option defautlvalue='' value={day.name}>
                      {day.name}
                    </option>
                    </React.Fragment>
                  )
                })}
              </InputList>
              <FieldWrapper style={{ alignItems: 'center', justifyContent: 'flex-end', width: '50%', minWidth: 160, margin: '0 16px', marginRight: 'auto' }} >
                <FieldWrapper style={{ flexWrap: 'nowrap', margin: '16px 0 0'}} >
                  <Subfield style={{ margin: '0 10px 0 0' }}>From</Subfield>
                  <FieldInput name='from' type='time' 
                    onChange={(e) => (setNewHours({...newHours, from: e.target.value}))}
                    style={{ width: '15%', minWidth: 90, padding: 0, fontSize: 12 }}
                  ></FieldInput>
                </FieldWrapper>
                <FieldWrapper style={{ flexWrap: 'nowrap', margin: '16px 0 0'}} >
                  <Subfield style={{ margin: '0 10px' }}> To </Subfield>
                  <FieldInput name='to' type='time' 
                    onChange={(e) => (setNewHours({...newHours, to: e.target.value}))}
                    style={{ width: '15%', minWidth: 90, padding: 0, fontSize: 12 }}
                    value={newHours.to}
                  ></FieldInput>
                </FieldWrapper>
              </FieldWrapper>

              <BtnText style={{ marginTop: 16 }} onClick={(e) => handleAddNewHours(e)}>
                Add Hours
              </BtnText>
            </FieldWrapper>
          </FieldWrapper>
      </FieldWrapper>

    </DivFormSection>
  );
};

export default ShopifyBusinessHours;
