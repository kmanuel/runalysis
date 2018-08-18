const path = require('path');
const fileLoader = require('../fileLoader');

const pathFor = testPath => path.resolve(__dirname, '../../__test__/testfiles/', testPath);

describe('fileLoader', () => {
  describe('getFilesRecursively', () => {
    it('should return empty on empty dir', () => {
      const dir = pathFor('./testfiles/recursive');
      const res = fileLoader.getFilesRecursively(dir);
      expect(res)
        .toHaveLength(0);
    });

    it('should find file directly in folder', () => {
      const dir = pathFor('./testfiles/onefile');
      const res = fileLoader.getFilesRecursively(dir);
      expect(res[0].endsWith('Running_18-21-22.gpx'))
        .toBeTruthy();
      expect(res)
        .toHaveLength(1);
    });

    it('should find several files directly in folder', () => {
      const dir = pathFor('./testfiles/multifile');
      const res = fileLoader.getFilesRecursively(dir);
      expect(res)
        .toContain(path.resolve(dir, 'a.gpx'));
      expect(res)
        .toContain(path.resolve(dir, 'b.gpx'));
      expect(res)
        .toHaveLength(2);
    });

    it('should find one file in subdirectory', () => {
      const dir = pathFor('./testfiles/recursive_onefile');
      const res = fileLoader.getFilesRecursively(dir);
      expect(res)
        .toHaveLength(1);
      expect(res[0])
        .toMatch(/.*Running_18-21-22.gpx/);
    });

    it('should find several files recursively', () => {
      const dir = pathFor('./testfiles');
      const files = fileLoader.getFilesRecursively(dir);
      expect(files)
        .toContain(pathFor('./testfiles/2018-06-26/Running_19-15-22.gpx'));
      expect(files)
        .toContain(pathFor('./testfiles/2018-06-28/Running_18-21-22.gpx'));
      expect(files)
        .toContain(pathFor('./testfiles/multifile/a.gpx'));
      expect(files)
        .toContain(pathFor('./testfiles/multifile/b.gpx'));
      expect(files)
        .toContain(pathFor('./testfiles/onefile/Running_18-21-22.gpx'));
      expect(files)
        .toContain(pathFor('./testfiles/recursive_onefile/onefile/Running_18-21-22.gpx'));
    });

    it('should only return gpx files', () => {
      const dir = pathFor('./testfiles');
      const files = fileLoader.getFilesRecursively(dir);
      expect(files)
        .not
        .toContain(pathFor('2018-06-26/Running_19-15-22.ttbin'));
      expect(files)
        .not
        .toContain(pathFor('2018-06-28/Running_18-21-22_Endomondo.url'));
    });
  });

  describe('readFile', () => {
    it('should produce json from xmlFile', (done) => {
      fileLoader.readFile(pathFor('./testfiles2/mini.gpx'))
        .then((res) => {
          expect(res).toBeTruthy();
          done();
        });
    });

    it('should find all track-segments', (done) => {
      const filePath = pathFor('./testfiles2/mini.gpx');
      fileLoader.readFile(filePath)
        .then((res) => {
          expect(res.gpx.trk[0].trkseg[0].trkpt).toHaveLength(4);
          done();
        });
    });
  });
});
