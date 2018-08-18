import React, { Component } from 'react';
import RunList from './RunList/RunList';
import { Query } from 'react-apollo';
import { RUNS_QUERY } from '../queries';
import Loading from './Loading';
import Chart from './Statistics/Chart';

class Home extends Component {
  static renderHome(runs) {
    return (
      <div className="row">
        <div className="col s12 m2">
          <Chart runs={runs} />
        </div>
        <div className="col s12 m10">
          <RunList runs={runs} />
        </div>
      </div>
    );
  }


  render() {
    return (
      <Query query={RUNS_QUERY}>
        {({ loading, data }) => {
          if (loading) return <Loading />;
          return Home.renderHome(data.runs);
        }}
      </Query>
    );
  }
}

export default Home;
