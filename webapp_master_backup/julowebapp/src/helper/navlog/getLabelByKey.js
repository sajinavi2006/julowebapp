import headers from "../reviewDataFormHeader";
//import { isDate } from "util";

export default key => {
  let isFound = false;
  for (let i in headers) {
    for (let j in headers[i].items) {
      if (key === headers[i].items[j].value) {
        isFound = true;
        return headers[i].items[j].text;
      }
    }
  }
  if (!isFound) {
    //search in optional data
    const optionalHeader = [
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
      },
      {
        type: "text",
        text: "Nama Orang Tua",
        value: "parentsName"
      },
      {
        type: "text",
        text: "Nomor HP Orang Tua",
        value: "parentsNo"
      },
      {
        type: "select",
        text: "Status Kepemilikan",
        value: "ownership"
      },
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
        text: "Nama Perusahaan",
        value: "companiesSearch"
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
      },
      {
        type: "select",
        text: "Perguruan tinggi",
        value: "college"
      },
      {
        type: "select",
        text: "Perguruan tinggi",
        value: "collegeSearch"
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
      },
      {
        type: "text",
        text: "Nama Bank",
        value: "bankSearch"
      }
      // {
      // 	type: 'text',
      // 	text: 'Tempat Lahir',
      // 	value: 'birthPlaceSearch'
      // }
    ];

    const data = optionalHeader.find(x => x.value == key);
    if (data) {
      return data.text;
    }
  }
};
