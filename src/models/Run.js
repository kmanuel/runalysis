function TrackPoint(trkptObject) {
  this.lat = Number(trkptObject.$.lat);
  this.lon = Number(trkptObject.$.lon);
  this.elevation = Number(trkptObject.ele[0]);
  this.time = new Date(trkptObject.time[0]).getTime();
  this.heartRate = Number(trkptObject.extensions[0]['gpxtpx:TrackPointExtension'][0]['gpxtpx:hr'][0]);
}

function Run(gpxObject) {
  this.gpxObject = gpxObject;
  const track = gpxObject.gpx.trk[0];
  const [name] = track.name;
  this.name = name;
}

function getTrackPoints() {
  return this.gpxObject.gpx.trk[0].trkseg[0].trkpt.map(trkpt => new TrackPoint(trkpt));
}

function getStartTime() {
  return this.trackPoints()[0].time;
}

function getEndTime() {
  const trackPoints = this.trackPoints();
  return trackPoints[trackPoints.length - 1].time;
}

function getDuration() {
  return this.endTime() - this.startTime();
}

const round = number => Math.round(number * 100) / 100;

function getAscent() {
  let totalAscent = 0;
  for (let i = 1; i < this.trackPoints().length; i += 1) {
    const pointAscent = this.trackPoints()[i].elevation - this.trackPoints()[i - 1].elevation;
    if (pointAscent > 0) {
      totalAscent += pointAscent;
    }
  }
  return round(totalAscent);
}

function getDescent() {
  let totalDescent = 0;
  for (let i = 1; i < this.trackPoints().length; i += 1) {
    const pointDescent = this.trackPoints()[i].elevation - this.trackPoints()[i - 1].elevation;
    if (pointDescent < 0) {
      totalDescent -= pointDescent;
    }
  }
  return round(totalDescent);
}

function getHeartRate() {
  return this.trackPoints()
    .map(point => point.heartRate)
    .reduce((a, b) => a + b)
    / this.trackPoints().length;
}

Run.prototype.trackPoints = getTrackPoints;
Run.prototype.startTime = getStartTime;
Run.prototype.endTime = getEndTime;
Run.prototype.duration = getDuration;
Run.prototype.ascent = getAscent;
Run.prototype.descent = getDescent;
Run.prototype.heartRate = getHeartRate;

module.exports = { Run };
