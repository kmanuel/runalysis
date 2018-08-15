const { Run } = require('../Run');

const TRKPTOBJ = JSON.parse(`
{
  "gpx": {
    "$": {
      "version": "1.1",
      "creator": "TomTom.2008 with Barometer",
      "xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
      "xmlns": "http://www.topografix.com/GPX/1/1",
      "xmlns:gpxtpx": "http://www.garmin.com/xmlschemas/TrackPointExtension/v1",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
    },
    "metadata": [
      {
        "name": [
          "Activity"
        ]
      }
    ],
    "trk": [
      {
        "name": [
          "Running"
        ],
        "trkseg": [
          {
            "trkpt": [
              {
                "$": {
                  "lat": "48.223702",
                  "lon": "16.365542"
                },
                "ele": [
                  "173.4"
                ],
                "time": [
                  "2018-06-26T17:15:22.000Z"
                ],
                "extensions": [
                  {
                    "gpxtpx:TrackPointExtension": [
                      {
                        "gpxtpx:hr": [
                          "86"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "$": {
                  "lat": "48.223712",
                  "lon": "16.365546"
                },
                "ele": [
                  "173.4"
                ],
                "time": [
                  "2018-06-26T17:15:23.000Z"
                ],
                "extensions": [
                  {
                    "gpxtpx:TrackPointExtension": [
                      {
                        "gpxtpx:hr": [
                          "86"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "$": {
                  "lat": "48.223722",
                  "lon": "16.365555"
                },
                "ele": [
                  "173.5"
                ],
                "time": [
                  "2018-06-26T17:15:24.000Z"
                ],
                "extensions": [
                  {
                    "gpxtpx:TrackPointExtension": [
                      {
                        "gpxtpx:hr": [
                          "89"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "$": {
                  "lat": "48.223732",
                  "lon": "16.365568"
                },
                "ele": [
                  "173.5"
                ],
                "time": [
                  "2018-06-26T17:15:25.000Z"
                ],
                "extensions": [
                  {
                    "gpxtpx:TrackPointExtension": [
                      {
                        "gpxtpx:hr": [
                          "92"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
`);

describe('Run', () => {
  let run;

  beforeEach(() => {
    run = new Run(TRKPTOBJ);
  });

  it('should contain 4 trackpoints', () => {
    expect(run.trackPoints())
      .toHaveLength(4);
  });

  it('should map trackpoints correctly', () => {
    expect(run.trackPoints()[0]).toEqual({
      lat: 48.223702,
      lon: 16.365542,
      elevation: 173.4,
      time: 1530033322000,
    });
  });

  it('should give total duration', () => {
    expect(run.duration())
      .toEqual(3000);
  });

  it('should give the correct start time', () => {
    expect(run.startTime())
      .toEqual(1530033322000);
  });

  it('should give the correct end time', () => {
    expect(run.endTime())
      .toEqual(1530033325000);
  });
});
