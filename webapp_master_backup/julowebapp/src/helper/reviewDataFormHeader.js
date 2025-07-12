export default [
  {
    group: "Identitas Diri",
    segment: "form1",
    items: [
      {
        type: "image",
        text: "Foto KTP",
        value: "fotoKtp"
      },
      {
        type: "text",
        text: "Nomor KTP",
        value: "nik"
      },
      {
        type: "text",
        text: "Nama Lengkap",
        value: "name"
      },
      // {
      // 	type: 'select',
      // 	text: 'Tempat Lahir',
      // 	value: 'birthPlace'
      // },
      {
        type: "date",
        text: "Tanggal Lahir",
        value: "dob"
      },
      {
        type: "radio",
        text: "Jenis Kelamin",
        value: "sex",
        dataSource: [ { value: "1", text: "Pria" }, { value: "2", text: "Wanita" } ]
      },
      // {
      //   type: "text",
      //   text: "Bahasa yang Digunakan",
      //   value: "language"
      // },
      {
        type: "label",
        text: "Informasi Domisili"
      },
      {
        type: "text",
        text: "Alamat",
        value: "alamat"
      },
      {
        half: true,
        type: "select",
        text: "Provinsi",
        value: "province"
      },
      {
        half: true,
        type: "select",
        text: "Kabupaten",
        value: "regency"
      },
      {
        half: true,
        type: "select",
        text: "Kecamatan",
        value: "village"
      },
      {
        half: true,
        type: "select",
        text: "Kelurahan",
        value: "subdistrict"
      },
      {
        type: "text",
        text: "Kode Pos",
        value: "postalcode"
      },
      {
        half: true,
        type: "date",
        text: "Ditempat Sejak",
        value: "occupiedSince"
      },
      {
        half: true,
        type: "select",
        text: "Status Domisili",
        value: "domicileStatus"
      },
      {
        half: true,
        type: "select",
        text: "Status Sipil",
        value: "civilStatus"
      },
      {
        half: true,
        type: "select",
        text: "Jumlah Tanggungan",
        value: "dependencyNum"
      },
      {
        type: "label",
        text: "Informasi Kontak Pribadi"
      },
      {
        type: "text",
        text: "Nomor HP Utama",
        value: "hpnum"
      },
      {
        type: "text",
        text: "Nomor HP Sekunder",
        value: "hpnum2"
      }
    ]
  },
  {
    group: "Informasi Keluarga",
    segment: "form2",
    items: [
      {
        type: "label",
        text: "Informasi Keluarga"
      },
      {
        type: "label",
        text: "Informasi Kerabat"
      },
      {
        type: "text",
        text: "Nama Keluarga Kandung",
        value: "nameOfKin"
      },
      {
        type: "text",
        text: "Nomor HP Keluarga Kandung",
        value: "kinNo"
      },
      {
        type: "text",
        text: "Hubungan",
        value: "relation"
      }
    ]
  },
  {
    group: "Pekerjaan & Pendidikan",
    segment: "form3",
    items: [
      {
        type: "label",
        text: "Informasi Pekerjaan"
      },
      {
        type: "select",
        text: "Tipe Pekerjaan",
        value: "jobType"
      },

      {
        type: "select",
        text: "Pendidikan Terakhir",
        value: "lastEducation"
      }
      // {
      // 	type: 'select',
      // 	text: 'Tahun lulus',
      // 	value: 'graduationYear'
      // }
    ]
  },
  {
    group: "Keuangan",
    segment: "form4",
    items: [
      {
        type: "label",
        text: "Penghasilan & Pengeluaran"
      },
      {
        type: "currency",
        text: "Total Penghasilan Bersih per Bulan",
        value: "totalMonthlyIncome"
      },
      {
        type: "currency",
        text: "Total Penghasilan Bersih per Bulan",
        value: "totalMonthlySpending"
      },
      {
        type: "currency",
        text: "Total Cicilan/Sewa Rumah per Bulan",
        value: "totalHouseRentPerMonth"
      },
      {
        type: "currency",
        text: "Total Cicilan Hutang per Bulan",
        value: "totalMonthlyDebt"
      },
      // {
      // 	type: 'currency',
      // 	text: 'Total pengeluaran akumulatif per Bulan',
      // 	value: 'totalAccumulation'
      // },
      {
        type: "label",
        text:
          "Penghasilan Bersih Rata - Rata per Bulan, 3 Tahun Terakhir (Tidak Wajib)"
      },
      {
        type: "text",
        text: "Apakah Anda Memiliki Kendaraan pribadi ?",
        value: "vehicle"
      },

      {
        type: "label",
        text: "Informasi Rekening"
      },
      {
        type: "select",
        text: "Nama Bank Rekening Pribadi",
        value: "bankName"
      },

      {
        type: "text",
        text: "Nomor Rekening",
        value: "accNum"
      },
      {
        type: "text",
        text: "Nama pada Rekening Pribadi",
        value: "accName"
      },
      {
        type: "select",
        text: "Kategori Tujuan Pinjaman",
        value: "loanPurposeCategory"
      },
      {
        type: "textarea",
        text: "Jelaskan Tujuan Pinjaman",
        value: "loanPurposeDescription"
      },
      {
        type: "text",
        text: "Dari Mana Tahu JULO ?",
        value: "knowJULOfrom"
      },
      {
        type: "text",
        text: "Kode Referral",
        value: "referralCode"
      }
    ]
  }
  ////
  /*
  ////
      
  
  {
    group: "Penghasilan",
    segment: "financialData",
    stepper: 2,
    items: [
      {
        type: "btnBank",
        text: "Verifikasi Internet Banking",
        value: "verification"
      }
    ]
  },

  {
    group: "Aset",
    segment: "financialData",
    stepper: 2,
    items: []
  },
  {
    group: "Perbankan",
    segment: "financialData",
    stepper: 2,
    items: [
      {
        type: "text",
        text: "Cabang Bank",
        value: "bankBranch"
      }
    ]
  },

  {
    group: "Informasi pinjaman",
    segment: "supportingData",
    stepper: 3,
    items: [
      
    ]
  },
  {
    group: "Finalisasi",
    segment: "supportingData",
    stepper: 3,
    items: [
      {
        type: "radio",
        text: "Apakah Anda menggunakan smartphone milik sendiri?",
        value: "isOwnPhone",
        dataSource: [
          { value: "true", text: "Ya" },
          { value: "false", text: "Tidak" }
        ]
      }
    ]
  }
  */
];
