function TrackPoint(trkptObject) {
  this.lat = Number(trkptObject.$.lat);
  this.lon = Number(trkptObject.$.lon);
  this.elevation = Number(trkptObject.ele[0]);
  this.time = new Date(trkptObject.time[0]).getTime();
}

function Run(gpxObject) {
  this.gpxObject = gpxObject;
  const track = gpxObject.gpx.trk[0];
  const [name] = track.name;
  this.name = name;
}

Run.prototype.trackPoints = function () {
  return this.gpxObject.gpx.trk[0].trkseg[0].trkpt.map(trkpt => new TrackPoint(trkpt));
};

Run.prototype.startTime = function () {
  return this.trackPoints()[0].time;
};

Run.prototype.endTime = function () {
  const trackPoints = this.trackPoints();
  return trackPoints[trackPoints.length - 1].time;
};

Run.prototype.duration = function () {
  return this.endTime() - this.startTime();
};

module.exports = { Run };
