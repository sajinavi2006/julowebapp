const commons = {
  askLocationAccess: (
    allowedCallback: (position: GeolocationPosition) => void,
    notAllowedCallback: (error: GeolocationPositionError) => void,
  ) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (allowedCallback !== null && typeof allowedCallback === 'function') {
          allowedCallback(position);
        }
      },
      (error) => {
        if (
          notAllowedCallback !== null &&
          typeof notAllowedCallback === 'function'
        ) {
          notAllowedCallback(error);
        }
      },
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true },
    );
  },
  isJSON: (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
  removeDuplicateObjects: (
    array: Array<Record<string, unknown>>,
    fieldName: string,
  ) => {
    return array.filter(function (item, pos, array) {
      return (
        array
          .map(function (mapItem) {
            return mapItem[fieldName];
          })
          .indexOf(item[fieldName]) === pos
      );
    });
  },
};

export default commons;
