import React from 'react'
import DateTimePicker from './DateTimePicker'
import { BtnPrimaryMd, BtnText } from '../../../library/atoms/buttons'
import { H4 } from '../../../library/atoms'
import { Modal, Backdrop, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid var(--p-dark)',
    borderRadius: 8,
    boxShadow: theme.shadows[7],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DateTimeModal = ({ dateTime, setDateTime }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BtnText style={{ marginBottom: 8, marginLeft: -3 }} onClick={handleOpen}>
        Change
      </BtnText>
      <Modal
        aria-labelledby="datetime-modal-title"
        aria-describedby="datetime-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <H4 id="transition-modal-title">Change pickup time</H4>
            <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />
            <BtnPrimaryMd 
              style={{ float: 'right'}}
              onClick={handleClose} 
            >
              Done
            </BtnPrimaryMd>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default DateTimeModal;