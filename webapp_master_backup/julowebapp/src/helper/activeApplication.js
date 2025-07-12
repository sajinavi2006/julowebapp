export default applications => {
  const happyStatusCode = [
    100,
    105,
    110,
    120,
    121,
    122,
    130,
    141,
    160,
    163,
    170,
    180
  ];
  const detourStatusCode = [
    //
    106,
    123,
    172,
    131,
    132,
    138,
    140,
    162,
    175,
    135,
    137,
    139,
    143,
    161,
    171
  ];
  let activeApp = false;
  for (let app of applications) {
    if (happyStatusCode.indexOf(app.status) != -1) {
      activeApp = app;
      break;
    }
  }
  if (!activeApp) {
    for (let app of applications) {
      if (detourStatusCode.indexOf(app.status) != -1) {
        activeApp = app;
        break;
      }
    }
  }
  return activeApp;
};
