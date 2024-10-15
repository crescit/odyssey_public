import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledButton,
  NavigationButtonLink,
  NavigationButtonText,
} from './NavigationButton.styled';

const NavigationButton = ({
  to = '',
  icon = null,
  open = false,
  text = '',
  handleDrawerClose = null,
}) => {
  return (
    <NavigationButtonLink to={to} onClick={handleDrawerClose}>
      <StyledButton>
        {icon}
        {open && <NavigationButtonText>{text}</NavigationButtonText>}
      </StyledButton>
    </NavigationButtonLink>
  );
};

NavigationButton.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NavigationButton;
