import React from 'react';
import PropTypes from 'prop-types';
import './typography.css';

export const Typography = ({ size, label }) => {
  return (
    <div
      className={['storybook-typography', `storybook-typography--${size}`].join(
        ' '
      )}
    >
      {label}
    </div>
  );
};

Typography.propTypes = {
  size: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    's1',
    's2',
    's3',
    's3u',
    'b1',
    'b1u',
    'b2',
    'bt14',
    'bt16',
  ]),
  label: PropTypes.string.isRequired,
};

Typography.defaultProps = {
  size: 'h1',
};
