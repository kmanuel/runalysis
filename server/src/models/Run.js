const geolib = require('geolib');
const btoa = require('btoa');

function TrackPoint(trkptObject) {
  this.lat = Number(trkptObject.$.lat);
  this.lon = Number(trkptObject.$.lon);
  this.elevation = Number(trkptObject.ele[0]);
  this.time = new Date(trkptObject.time[0]).getTime();
  if (trkptObject.extensions && trkptObject.extensions.length > 0) {
    this.heartRate = Number(trkptObject.extensions[0]['gpxtpx:TrackPointExtension'][0]['gpxtpx:hr'][0]);
  }
}

function Run(fileObj) {
  console.log(fileObj);
  this.id = btoa(fileObj.path);
  this.gpxObject = fileObj.res;
  const track = this.gpxObject.gpx.trk[0];
  const [name] = track.name;
  this.name = name;
}

function getTrackPoints() {
  if (this._points) {
    return this._points;
  }

  const tracks = this.gpxObject.gpx.trk;

  if (!tracks || tracks.length < 1) {
    return [];
  }
  const firstTrack = tracks[0];
  const { trkseg } = firstTrack;
  if (!trkseg || trkseg.length < 1) {
    return [];
  }
  this._points = (trkseg[0].trkpt.map(trkpt => new TrackPoint(trkpt)));
  return this._points;
}

function getStartTime() {
  const trackPoints = this.trackPoints();
  if (trackPoints && trackPoints.length > 0) {
    return trackPoints[0].time;
  }
  return 0;
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

function getDistance() {
  let prev = this.trackPoints()[0];

  return this.trackPoints()
    .reduce((sum, tp) => {
      const distance = geolib.getDistance(tp, prev);
      prev = tp;
      return sum + distance;
    }, 0);
}

Run.prototype.trackPoints = getTrackPoints;
Run.prototype.startTime = getStartTime;
Run.prototype.endTime = getEndTime;
Run.prototype.duration = getDuration;
Run.prototype.ascent = getAscent;
Run.prototype.descent = getDescent;
Run.prototype.heartRate = getHeartRate;
Run.prototype.distance = getDistance;

module.exports = { Run };
