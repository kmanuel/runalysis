/* eslint-disable no-undef */
import React, { Component } from 'react';
import './RunChart.css';

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
};

class RunChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { heartRates } = this.props;

    let i = 0;
    const data = [];
    heartRates.forEach((hr) => {
      i += 1;
      if (i % 30 === 0) {
        data.push(hr);
      }
    });

    const ctx = this.canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data,
        datasets: [{
          backgroundColor: CHART_COLORS.red,
          borderColor: CHART_COLORS.red,
          data,
        }],
      },
    });
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.canvasRef} />
      </div>
    );
  }
}

export default RunChart;
