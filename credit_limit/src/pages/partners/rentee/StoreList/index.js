import React from "react";
import { useTheme } from "@emotion/react";

import { Div } from "assets/css/styled";
import { p3, textCenter, w100 } from "assets/css/stylesFix";
import { background, borderX, borderY, text } from "assets/css/stylesValue";

import Layout from "components/Layout";

// const STORE_LIST = [
//   {
//     store: "ERAFONE 3 MEGA BEKASI HYPERMALL",
//     location: "Marga Jaya Kota Bekasi",
//   },
//   {
//     store: "ERAFONE BUARAN PLAZA",
//     location: "Buaran Jakarta Timur",
//   },
//   {
//     store: "ERAFONE KOTA KASABLANKA",
//     location: "Tebet Jakarta Selatan",
//   },
//   {
//     store: "ERAFONE RUKO KEBON JERUK BINUS",
//     location: "Palmerah Jakarta Barat",
//   },
//   {
//     store: "MEGASTORE CIBINONG CITY MALL",
//     location: "Cibinong Kab. Bogor",
//   },
//   {
//     store: "MEGASTORE ITC ROXY MAS",
//     location: "Gambir Jakarta Utara",
//   },
//   {
//     store: "MEGASTORE RUKO CILEDUG",
//     location: "Pesanggrahan Kota Tanggerang",
//   },
//   {
//     store: "MEGASTORE RUKO CIPUTAT",
//     location: "Ciputat Tanggerang Selatan",
//   },
//   {
//     store: "MEGASTORE RUKO SEMPER",
//     location: "Semper Jakarta Utara",
//   },
//   {
//     store: "MEGASTORE TAMAN PALEM PADJAJARAN",
//     location: "Sukasari Kota Bogor",
//   },
//   {
//     store: "ERAFONE 2 MAL ARTHA GADING",
//     location: "Kelapa Gading Jakarta Utara",
//   },
//   {
//     store: "ERAFONE CENTRAL PARK",
//     location: "Grogol Jakarta Barat",
//   },
//   {
//     store: "ERAFONE DAAN MOGOT MALL",
//     location: "Kalideres Jakarta barat",
//   },
//   {
//     store: "ERAFONE GANDARIA CITY",
//     location: "Kebayoran Lama Jakarta Selatan",
//   },
//   {
//     store: "ERAFONE GRAND INDONESIA",
//     location: "MH Thamrin Jakarta Pusat",
//   },
//   {
//     store: "ERAFONE RUKO MOCH KAHFI",
//     location: "Jagakarsa Jakarta Selatan",
//   },
//   {
//     store: "MEGASTORE RUKO CIKARANG JABABEKA",
//     location: "Cikarang Utara Kab. Bekasi",
//   },
//   {
//     store: "MEGASTORE RUKO KEMANG",
//     location: "Mampang Prapatan Jakarta Selatan",
//   },
//   {
//     store: "MEGASTORE RUKO PERUMNAS BEKASI",
//     location: "Bekasi Timur Kota Bekasi",
//   },
//   {
//     store: "MEGASTORE SUPERMAL KARAWACI",
//     location: "Karawaci Kota Tanggerang",
//   },
// ];

const STORE_LIST = [
  {
    store: "ERAFONE BUARAN PLAZA",
  },
  {
    store: "MEGASTORE RUKO CILEUNGSI",
  },
  {
    store: "MEGASTORE RUKO CIPUTAT",
  },
  {
    store: "ERAFONE RUKO HANKAM BEKASI",
  },
  {
    store: "ERAFONE RUKO SURYA KENCANA PAMULANG",
  },
  {
    store: "ERAFONE 1 MEGA BEKASI HYPERMALL",
  },
  {
    store: "ERAFONE AEON JAKARTA GARDEN CITY",
  },
  {
    store: "ERAFONE MALL BTM BOGOR",
  },
  {
    store: "ERAFONE PAMULANG SQUARE",
  },
  {
    store: "ERAFONE RUKO PARUNG BINGUNG DEPOK",
  },
  {
    store: "ERAFONE ARION MALL",
  },
  {
    store: "MEGASTORE ITC CEMPAKA MAS",
  },
  {
    store: "MEGASTORE RUKO PERUMNAS BEKASI",
  },
  {
    store: "MEGASTORE RUKO JATIWARINGIN",
  },
  {
    store: "ERAFONE RUKO MOCH KAHFI",
  },
  {
    store: "MEGASTORE RUKO KEMAKMURAN DEPOK",
  },
  {
    store: "ERAFONE RUKO CEGER TANGERANG",
  },
  {
    store: "MEGASTORE RUKO JATIUWUNG",
  },
  {
    store: "ERAFONE DRAMAGA BOGOR",
  },
  {
    store: "MEGASTORE RUKO PONDOK PINANG",
  },
];

const StoreList = () => {
  const theme = useTheme();

  return (
    <Layout
      barBackType="primary"
      barBackTitle="Daftar Lokasi Erafone"
    >
      <table className={`${w100}`}>
        <thead>
          <tr>
            <th
              className={`${text({
                size: 16,
                color: theme?.text?.primary,
              })} ${p3} ${textCenter} `}
            >
              No
            </th>
            <th
              className={`${text({
                size: 16,
                color: theme?.text?.primary,
              })} ${p3}`}
            >
              Lokasi Store
            </th>
          </tr>
        </thead>
        <tbody>
          {STORE_LIST.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? background(theme?.colors?.backgroundColorSecondary)
                  : ""
              } ${borderX("none")} ${borderY(
                `1px solid ${theme?.colors?.borderLight}`
              )}`}
            >
              <td
                className={`${text({
                  size: 14,
                  color: theme?.text?.primary,
                  weight: "bold",
                })} ${textCenter} ${p3}`}
              >
                {index + 1}.
              </td>
              <td className={`${p3}`}>
                <Div
                  className={`${text({
                    size: 12,
                    color: theme?.text?.primary,
                    weight: "bold",
                  })}`}
                >
                  {item.store}
                </Div>
                {/* <Div
                  className={`${text({ size: 12, color: theme?.text?.primary })}`}
                >
                  {item.location}
                </Div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default StoreList;
