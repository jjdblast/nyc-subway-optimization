angular.module('epic-taxi')
  .factory('PathService', [function() {

    var refPts = 2;
    var cur = 0.3;
    var oneOff = 0.2;
    var twoOff = 0.15;
    var middle = 1;

    /**
     * Helper function for antiAliasePath which cumulates the data around a station
     * and essentially does the antialiasing
     */
    function antiAliase(stations) {
      var m = refPts;
      stations[m].lat = stations[m].lat * cur +
        stations[m-1].lat * oneOff + stations[m+1].lat * oneOff +
        stations[m-2].lat * twoOff + stations[m+2].lat * twoOff;

      stations[m].lng = stations[m].lng * cur +
        stations[m-1].lng * oneOff + stations[m+1].lng * oneOff +
        stations[m-2].lng * twoOff + stations[m+2].lng * twoOff;

      return stations[m];
    }

    /**
     * Helper function for antiAliasePath which cumulates the data around a station which
     * is one point off the end.
     */
    function antiAliaseEndpoints(stations) {
      var m = middle;
      stations[m].lat = stations[m].lat * 0.4 +
        stations[m-1].lat * 0.3 + stations[m+1].lat * 0.3;
      stations[m].lng = stations[m].lng * 0.4 +
        stations[m-1].lng * 0.3 + stations[m+1].lng * 0.3;

      return stations[m];
    }


    /**
     * For each point find a point which is more in the overall path by adding surrounded point´s values
     * @param {Array of stations} to be smoothened
     * @return {Array of stations} smoothened
     */
    function antiAliasePath(stations) {
      // for each point we take 4 other points into account.
      // So we need at least 4 points and the point looked at.
      if (stations.length < (2 * refPts) + 1) return stations;

      var len = stations.length;
      stations[1] = antiAliaseEndpoints(stations.slice(0, 3));
      stations[len-2] = antiAliaseEndpoints(stations.slice(len-3, len));

      for (k = refPts; k < len - refPts; k++) {
        stations[k] = antiAliase(stations.slice(k - refPts, k + refPts + 1));
      }

      return stations;
    }

    return { antiAliasePath: antiAliasePath };
  }]);

