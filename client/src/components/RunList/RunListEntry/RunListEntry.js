import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import RunDate from '../../RunDate';

export default ({ run }) => {
  const duration = moment.duration(run.duration);
  const pace = parseFloat((duration.minutes() + 60 * duration.hours()) / (run.distance / 1000))
    .toFixed(2);
  const kmDistance = parseFloat(run.distance / 1000)
    .toFixed(2);

  return (
    <div className="row">
      <div className="col s12 m7">
          <Link to={`/runs/${run.id}`}>
            <div className="card-content">
              {run.name}
              <br/>
              Distance: {kmDistance} km
              <br />
              Duration: {duration.hours()}h {duration.minutes()}m
              <br />
              Pace: {pace}
              <br />
              <RunDate time={run.startTime} />
            </div>
          </Link>
      </div>
    </div>
  );
};
