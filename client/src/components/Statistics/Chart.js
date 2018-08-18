import React, { Component } from 'react';
import moment from 'moment';


class Chart extends Component {

  render() {
    const { runs } = this.props;

    const totalDistance = parseFloat(
      runs.reduce((acc, run) => acc + run.distance, 0) / 1000,
    ).toFixed(2);

    const totalDuration = moment.duration(
      runs.reduce((acc, run) => acc + run.duration, 0),
    );

    return (
      <div>
        <br />
        total distance:
        {totalDistance}
        <br />
        total duration:
        {parseInt(totalDuration.asHours())}h
      </div>
    );
  }

}

export default Chart;
