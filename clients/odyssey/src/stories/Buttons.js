import React from 'react';
import PropTypes from 'prop-types';
import './buttons.css';

export const Buttons = ({ size, label }) => {
  return (
    <div
      className={['storybook-buttons', `storybook-buttons--${size}`].join(
        ' '
      )}
    >
      {label}
    </div>
  );
};

Buttons.propTypes = {
  size: PropTypes.oneOf([
    'mdprimaryinitial',
    'mdseconaryinitial',
    'mdsubtleinitial',
    'mdtextinitial',
    'mdprimaryhover',
    'mdsecondaryhover',
    'mdsubtlehover',
    'mdtexthover',
    'mdprimaryfocus',
    'mdsecondaryfocus',
    'mdsubtlefocus',
    'mdtextfocus',
    'mdprimaryactive',
    'mdsecondaryactive',
    'mdsubtleactive',
    'mdtextactive',
    'mdprimaryloading',
    'mdsecondaryloading',
    'mdsubtleloading',
    'mdtextloading',
    'mdprimarydisabled',
    'mdsecondarydisabled',
    'mdsubtledisabled',
    'mdtextdisabled',
    'lgprimaryinitial',
    'lgseconaryinitial',
    'lgsubtleinitial',
    'lgtextinitial',
    'lgprimaryhover',
    'lgsecondaryhover',
    'lgsubtlehover',
    'lgtexthover',
    'lgprimaryfocus',
    'lgsecondaryfocus',
    'lgsubtlefocus',
    'lgtextfocus',
    'lgprimaryactive',
    'lgsecondaryactive',
    'lgsubtleactive',
    'lgtextactive',
    'lgprimaryloading',
    'lgsecondaryloading',
    'lgsubtleloading',
    'lgtextloading',
    'lgprimarydisabled',
    'lgsecondarydisabled',
    'lgsubtledisabled',
    'lgtextdisabled',
    'smprimaryinitial',
    'smseconaryinitial',
    'smsubtleinitial',
    'smtextinitial',
    'smprimaryhover',
    'smsecondaryhover',
    'smsubtlehover',
    'smtexthover',
    'smprimaryfocus',
    'smsecondaryfocus',
    'smsubtlefocus',
    'smtextfocus',
    'smprimaryactive',
    'smsecondaryactive',
    'smsubtleactive',
    'smtextactive',
    'smprimaryloading',
    'smsecondaryloading',
    'smsubtleloading',
    'smtextloading',
    'smprimarydisabled',
    'smsecondarydisabled',
    'smsubtledisabled',
    'smtextdisabled',
  ]),
  label: PropTypes.string.isRequired,
};

Buttons.defaultProps = {
  size: 'mdprimaryinitial',
};
