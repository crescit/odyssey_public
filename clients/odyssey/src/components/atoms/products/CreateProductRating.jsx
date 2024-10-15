import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { useStyles, Modal } from '../common/CreateRating.styled';
import { H2 } from '../../../library/atoms/H2';
import { ProductConsumer } from '../../../context';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const CreateProductRating = () => {
  const classes = useStyles();
  // const [rate, setValue] = React.useState(0);
  const setValue = () => {}
  return (
    <div className={classes.root}>
      <Modal>
        <Paper elevation={10}>
          <ProductConsumer>
            {(value = {}) => {
              const { modalOpen } = value;
              if (!modalOpen) {
                return null;
              } else {
                return (
                  <ClickAwayListener
                    onClickAway={() => {
                      value.closeModal();
                    }}
                  >
                    <Box component='fieldset' mb={3} borderColor='transparent'>
                      <H2 className={classes.title}>Create Review</H2>
                      <Typography>Overall Rating</Typography>
                      <Rating
                        name='simple-controlled'
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      <label htmlFor='headline'>
                        <Typography>Add a Headline</Typography>
                        <textarea
                          cols='30'
                          rows='1'
                          id='headline'
                          name='headline'
                        />
                      </label>
                      <label htmlFor='reviewdescription'>
                        <Typography>Write Your Review</Typography>
                        <textarea
                          cols='30'
                          rows='8'
                          id='businessdescription'
                          name='business description'
                        />
                      </label>
                      <p>
                        <button
                          className={classes.button}
                          type='submit'
                          onClick={() => {
                            value.closeModal();
                          }}
                        >
                          SUBMIT
                        </button>
                      </p>
                    </Box>
                  </ClickAwayListener>
                );
              }
            }}
          </ProductConsumer>
        </Paper>
      </Modal>
    </div>
  );
};

export default CreateProductRating;
