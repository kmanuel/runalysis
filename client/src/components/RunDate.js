import React from 'react';
import moment from 'moment';

export default ({time}) => (
  <div>
    {moment(time)
      .format('MMM Do HH:mm:ss')}
  </div>
);
