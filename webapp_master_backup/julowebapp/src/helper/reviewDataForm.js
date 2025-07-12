import headers from "./reviewDataFormHeader";
export default data => {
  //let headers =

  //keluarga
  const form2i = headers.findIndex(x => {
    return x.segment == "form2";
  });

  if (headers[form2i].items[1].value == "spouseName") {
    headers[form2i].items.splice(1, 3);
  } else if (headers[form2i].items[1].value == "parentsName") {
    headers[form2i].items.splice(1, 2);
  }

  if (data.form1.civilStatus === "Menikah") {
    headers[form2i].items.splice(
      1,
      0,
      {
        type: "text",
        text: "Nama pasangan",
        value: "spouseName"
      },
      {
        half: true,
        type: "text",
        text: "Nomor HP Pasangan",
        value: "spouseNo"
      },
      {
        half: true,
        type: "date",
        text: "Tanggal lahir pasangan",
        value: "dobSpouse"
      }
    );
  } else {
    headers[form2i].items.splice(
      1,
      0,
      {
        type: "text",
        text: "Nama Orang Tua",
        value: "parentsName"
      },
      {
        type: "text",
        text: "Nomor HP Orang Tua",
        value: "parentsNo"
      }
    );
  }
  const form4i = headers.findIndex(x => {
    return x.segment == "form4";
  });
  //montlyincome
  // for (var i = 1; i <= 3; i++) {
  //   const year = parseInt(data.form4.thisYear) - i;
  //   const newI = `netMonthlyIncome${year}`;
  //   const newVal = data.form4.netMonthlyIncome[i - 1].value;
  //   headers[form4i].items.splice(6 + i, 0, {
  //     type: "textdual",
  //     text: year.toString(),
  //     value: newI
  //   });
  //   data.form4[newI] = newVal;
  // }
  data.form4.netMonthlyIncome
    .sort(function(a, b) {
      return b.text - a.text;
    })
    .map((x, i) => {
      ///const value = x.value.replace(".", "");
      const value = x.value;
      if (headers[form4i].items[5 + i + 1].value == `income_${i + 1}`) {
        headers[form4i].items[5 + i + 1] = {
          type: "textdual",
          text: x.text,
          value: `income_${i + 1}`
        };
      } else {
        headers[form4i].items.splice(5 + i + 1, 0, {
          type: "textdual",
          text: x.text,
          value: `income_${i + 1}`
        });
      }

      data.form4[`income_${i + 1}`] = value;
    });

  //status kepemilikan
  const vehiclei = headers[form4i].items.findIndex(x => x.value == "vehicle");
  if (headers[form4i].items[vehiclei + 1].value === "ownership") {
    headers[form4i].items.splice(vehiclei + 1, 1);
  }

  if (data.form4.vehicle.toLowerCase() !== "tidak punya") {
    headers[form4i].items.splice(vehiclei + 1, 0, {
      type: "select",
      text: "Status Kepemilikan",
      value: "ownership"
    });
  }

  //pekerjaan
  const form3i = headers.findIndex(x => {
    return x.segment == "form3";
  });
  const jobType = data.form3.jobType.toLowerCase();
  if (headers[form3i].items[2].value === "jobField") {
    headers[form3i].items.splice(2, 1);
  }
  if (headers[form3i].items[2].value === "job") {
    headers[form3i].items.splice(2, 5);
  }
  if (jobType === "staf rumah tangga") {
    headers[form3i].items.splice(2, 0, {
      type: "select",
      text: "Bidang Pekerjaan",
      value: "jobField"
    });
  } else if (
    jobType !== "ibu rumah tangga" &&
    jobType !== "mahasiswa" &&
    jobType !== "tidak bekerja"
  ) {
    headers[form3i].items.splice(
      2,
      0,
      {
        type: "select",
        text: "Bidang Pekerjaan",
        value: "jobField"
      },
      {
        type: "select",
        text: "Pekerjaan",
        value: "job"
      },

      {
        type: "text",
        text: "Nama Perusahaan",
        value: "companyName"
      },
      {
        type: "text",
        text: "Nomor Telepon Perusahaan",
        value: "companyNo"
      },
      {
        half: true,
        type: "date",
        text: "Mulai Pekerjaan",
        value: "startWorkingDate"
      },
      {
        half: true,
        type: "text",
        text: "Tanggal Gajian",
        value: "payrollDate"
      }
    );
  }

  if (
    data.form3.lastEducation == "Diploma" ||
    data.form3.lastEducation == "S1" ||
    data.form3.lastEducation == "S2" ||
    data.form3.lastEducation == "S3"
  ) {
    //pendidikan
    const edui = headers[form3i].items.findIndex(
      x => x.value == "lastEducation"
    );
    if (
      headers[form3i].items[edui + 1] &&
      headers[form3i].items[edui + 1].value === "college"
    ) {
      headers[form3i].items.splice(edui + 1, 3);
    }

    headers[form3i].items.splice(
      edui + 1,
      0,
      {
        type: "select",
        text: "Perguruan tinggi",
        value: "college"
      },
      {
        type: "select",
        text: "Jurusan",
        value: "majors"
      },
      {
        type: "text",
        text: "IPK",
        value: "gpa"
      }
    );
  }
  return headers;
};
