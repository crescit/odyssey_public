import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BtnPrimaryMd, BtnSecondaryMd } from '../../../library/atoms/buttons'
import { B1, H6 } from '../../../library/atoms';

const styleDialogTitle =  {
  fontFamily: 'var(--font)', 
  color: 'var(--title)', 
  textAlign: 'center', 
  marginTop: 'var(--spc-2)',
};

const styleMsg = {
  color: 'var(--title)', 
  textAlign: 'center'
};

const AlertModal = ({ openModal, setOpenModal, btnText ='Ok', btnType= 'primary', modalHeader = '', modalTitle = '', modalMsgBold = '', modalMsg = '', modalMsg2 = ''}) => {
  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" disableTypography style={styleDialogTitle} >
          <H6>{modalHeader}</H6></DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="delete-dialog-description"> */}
            <B1 style={styleMsg} >{modalTitle}</B1>
            <B1 style={styleMsg} className={'font-bold'} >{modalMsgBold}</B1>
            <B1 style={styleMsg} >{modalMsg}</B1>
            <B1 style={styleMsg} >{modalMsg2}</B1>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions className={'m-r2 m-b2'} >
          {btnType === 'primary' ? 
            <BtnPrimaryMd onClick={handleClose} className={'m-xauto'} style={{height: 32}} >
              {btnText}
            </BtnPrimaryMd>
          :
            <BtnSecondaryMd onClick={handleClose} style={{height: 32}} >
              {btnText}
            </BtnSecondaryMd>
          }
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertModal;