import _ from "lodash";
export default () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coordinate = _.pick(position.coords, ["latitude", "longitude"]);

          resolve(coordinate);
        },
        error => {
          let message = false;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message =
                "You have denied the request for Geolocation. Make sure you allow the location permission";
              break;
            case error.POSITION_UNAVAILABLE:
              message =
                "Location information is unavailable. You can try another time";
              break;
            case error.TIMEOUT:
              message = "The request to get user location timed out.";
              break;
            case error.UNKNOWN_ERROR:
              message = "An unknown error occurred.";
              break;
          }
          reject({ message, type: "location" });
        }
      );
    } else {
      reject({ message: "Geolocation is not supported by this browser." });
    }
  });
