import { gql } from 'apollo-boost';

export const RUNS_QUERY = gql`
{
  runs {
    id,
    name,
    distance,
    startTime,
    duration
  }
}
`;

export const RUN_DETAILS = gql`
query Run($id: ID!) {
  run (id: $id) {
    id
    name
    distance
    startTime
    duration
    ascent
    descent
    heartRate
    trackPoints {
      lat
      lon,
      heartRate
    }
  }
}
`;
