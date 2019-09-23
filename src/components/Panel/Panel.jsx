import React from 'react';

import { node } from 'prop-types';

import './Panel.scss';

const panel = ({ children }) => <div className="panel">{children}</div>;

panel.propTypes = {
  children: node.isRequired,
};

export default panel;
