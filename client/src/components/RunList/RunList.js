import React, { Component } from 'react';
import RunListEntry from './RunListEntry/RunListEntry';


class RunList extends Component {
  render() {
    const { runs } = this.props;
    const runEntries = runs.map(r => <li className="collection-item"><RunListEntry key={r.id} run={r} /></li> );
    return (
      <ul className="collection">
        {runEntries}
      </ul>
    );
  }
}

RunList.defaultProps = { runs: [] };
export default RunList;
