import React, { Component } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import { RUN_DETAILS } from '../../queries';
import Loading from '../Loading';
import Map from '../Map/Map';
import RunChart from '../RunChart/RunChart';
import RunDate from '../RunDate';

const getKmDistance = run => parseFloat(run.distance / 1000)
  .toFixed(2);

const getDuration = duration => `${duration.hours()}h ${duration.minutes()}m`;

class RunDetail extends Component {
  static runInfoHeader(run) {
    return (
      <div>
        <h3>{getKmDistance(run)} km Run</h3>
        <RunDate time={run.startTime} />
      </div>
    );
  }

  static runInfoDetails(run) {
    const duration = moment.duration(run.duration);
    const avgPace = parseFloat((duration.minutes() + 60 * duration.hours()) / (run.distance / 1000))
      .toFixed(2);

    return (
      <div>
        Distance {getKmDistance(run)} km<br/>
        Duration: {getDuration(duration)}<br/>
        AVG Pace {avgPace}<br/>
        Ascent {run.ascent}m<br/>
        Descent {run.descent}m<br/>
        AVG Heart Rate {parseInt(run.heartRate)}<br/>
      </div>
    );
  }

  static renderRunDetail(run) {
    const track = run.trackPoints.map(trackPoint => [trackPoint.lat, trackPoint.lon]);
    const heartRates = run.trackPoints.map(tp => tp.heartRate);
    return (
      <div>
        <div>
          {RunDetail.runInfoHeader(run)}
        </div>
        <hr />
        <div className="row">
          <div className="col s12 m5">
            {RunDetail.runInfoDetails(run)}
          </div>
          <div className="col s12 m7">
            <Map track={track} />
          </div>
        </div>
        <hr />
        <div>
          <RunChart heartRates={heartRates}/>
        </div>
      </div>
    );
  }

  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <Query query={RUN_DETAILS} variables={{ id }}>
        {({ loading, data }) => {
          if (loading) return <Loading />;
          return RunDetail.renderRunDetail(data.run);
        }}
      </Query>
    );
  }
}

export default RunDetail;
