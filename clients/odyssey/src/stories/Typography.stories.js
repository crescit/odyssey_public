import React from 'react';
import { Typography } from './Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
};

const Template = (args) => <Typography {...args} />;

export const H1 = Template.bind({});
H1.args = {
  size: 'h1',
  label: 'H1/Lato/Light/96px',
};

export const H2 = Template.bind({});
H2.args = {
  size: 'h2',
  label: 'H2/Lato/Light/60px',
};

export const H3 = Template.bind({});
H3.args = {
  size: 'h3',
  label: 'H3/Lato/Regular/48px',
};

export const H4 = Template.bind({});
H4.args = {
  size: 'h4',
  label: 'H4/Lato/Regular/34px',
};

export const H5 = Template.bind({});
H5.args = {
  size: 'h5',
  label: 'H5/Lato/Regular/24px',
};

export const H6 = Template.bind({});
H6.args = {
  size: 'h6',
  label: 'H6/Lato/Medium/20px',
};

export const S1 = Template.bind({});
S1.args = {
  size: 's1',
  label: 'Subtitle 1/Lato/Regular/16px',
};

export const S2 = Template.bind({});
S2.args = {
  size: 's2',
  label: 'Subtitle 2/Lato/semi-bold/16px',
};

export const S3 = Template.bind({});
S3.args = {
  size: 's3',
  label: 'Subtitle 3/Lato/Medium/14px',
};

export const S3U = Template.bind({});
S3U.args = {
  size: 's3u',
  label: 'Subtitle 3 underline/Lato/Medium/14px',
};

export const B1 = Template.bind({});
B1.args = {
  size: 'b1',
  label: 'Body 1/Lato/Regular/16px',
};

export const B1U = Template.bind({});
B1U.args = {
  size: 'b1u',
  label: 'Body 1/Lato/Regular/16px',
};

export const B2 = Template.bind({});
B2.args = {
  size: 'b2',
  label: 'Body 2/Lato/Regular/14px',
};

export const BT14 = Template.bind({});
BT14.args = {
  size: 'bt14',
  label: 'Button/Lato/SemiBold/14px',
};

export const BT16 = Template.bind({});
BT16.args = {
  size: 'bt16',
  label: 'Button/Lato/SemiBold/16px',
};
