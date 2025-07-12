export default (code = 0, canReapply = false, loanStatus = 0) => {
  const mappingStatusCodeWithRoute = [

    {
      name: "formHead",
      statusCode: new Set([100])
    },
    {
      name: "waitingCreditScore",
      statusCode: new Set([105])
    },
    {
      name: "verification",
      statusCode: new Set([
        //in progress
        120,
        121,
        122,
        123,
        124,
        125,
        130,
        132,
        134,
        138,
        140,
        141,
        //expire
        106,
        111,
        131,
        136,
        137,
        139,
        142,
        143,
        152
      ])
    },
    {
      name: "bfi",
      statusCode: new Set([129, 189])
    },
    {
      name: "lastStep",
      statusCode: new Set([
        //approve
        160,
        163,
        170,
        180,
        162,
        175,
        //reapply
        161,
        171,
        //rejected
        135,
        133
      ])
    }
  ];
  const route = mappingStatusCodeWithRoute.find(x => x.statusCode.has(code));
  // if (code == 180) {
  //   if (loanStatus == 250) {
  //     route.name = "lunasPage";
  //     if (canReapply) {
  //       route.name = "lastStep";
  //     }
  //   } else {
  //     route.name = "loanActivity";
  //   }
  // }
  if (code == 180) {
    if (loanStatus != 250) {
      route.name = "loanActivity";
    } else {
      route.name = "lastStep";
    }
  }

  if (route) {
    return route.name;
  } else {
    return "signIn";
  }
};
