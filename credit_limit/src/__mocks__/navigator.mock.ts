const mockPosition = {
  coords: {
    accuracy: 9.136,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 3.5366123,
    longitude: 98.6878111,
    speed: null,
  },
  timestamp: 1622711699531,
};

Object.defineProperty(navigator, 'permissions', {
  value: {
    query: async (_: PermissionDescriptor) => {
      return { state: 'granted' };
    },
  },
});

Object.defineProperty(navigator, 'geolocation', {
  value: {
    getCurrentPosition: (
      successCallback: PositionCallback,
      _: PositionErrorCallback,
      _o: PositionOptions,
    ) => {
      successCallback(mockPosition);
    },
  },
});
