import Toaster from "components/Toastify/Toaster";
import React from "react";
import { toast as toaster } from "react-toastify";
import i18n from "i18next";

export function toast({ type = "success", message = "" }) {
  return toaster(<Toaster type={type} message={message} />);
}

export function toastErr(error) {
  const { response } = error;

  let errMsg = response ? response.data.message : null;

  if (!errMsg) {
    errMsg = "Thao tác không thành công";
  }

  toast({ type: "error", message: errMsg });
}

export const format_date = (dateString) =>
  new Date(dateString).toLocaleDateString();

export const formatDateTime = (dateString) =>
  new Date(dateString).toLocaleString();

export const getDiffTime = (dateStr) => {
  let currDate = new Date();
  let diffSeconds = Math.abs(currDate - new Date(dateStr)) / 1000;
  let diffDate = Math.floor(diffSeconds / (3600 * 24));

  return diffDate;
};

export function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => ({
      value: start + idx,
      label: start + idx
    }));
}

export const formatMonths = (month) => {
  const year = parseInt(month / 12);
  const m = month % 12;

  return year ? `${year} năm ${m} tháng` : `${month} tháng`;
};

export const formatProvince = (provinces, provinceId) => {
  const province = provinces.find((p) => p.province_id === provinceId);

  return province && province.province_name;
};

export const formatProvinceEn = (provinces, provinceId) => {
  const province = provinces.find((p) => p.province_id === provinceId);

  return province && province.province_name_en;
};

export const formatProvinceName = (province) => {
  let name;
  if (province && province.includes("Thành phố ")) {
    name = province.split("Thành phố ");
  } else if (province && province.includes("Tỉnh ")) {
    name = province.split("Tỉnh ");
  } else if (province && province.includes("Thủ đô ")) {
    name = province.split("Thủ đô ");
  }

  return name && name.length && name[1];
};

// export const formatProvinceNameEn = (province) => {
//   let name;
//   if (province && province.includes(" province")) {
//     name = province.split(" province");
//   } else if (province && province.includes(" capital")) {
//     name = province.split(" capital");
//   }

//   return name && name.length && name[0];
// };

export const formatProvinceNameBrief = (province) => {
  let provinceName = formatProvinceName(province);
  console.log("province====: ", provinceName && provinceName);
  return provinceName
    ? provinceName
        .split(/\s/)
        .reduce((response, word) => (response += word.slice(0, 1)), "")
    : "All";
};

export const formatSearchHistory = (title, provinces, provinceId) => {
  let province = {};
  if (provinceId) {
    province =
      provinces?.length && provinces.find((p) => p.province_id === provinceId);
  }

  let provinceName = province?.province_name;

  let result = "";

  if (title) {
    result += title.trim();

    if (provinceId && provinceName) {
      result += " - " + provinceName;
    }
  } else {
    if (provinceId && provinceName) {
      result += provinceName;
    }
  }

  return result;
};

export const numberToArray = (value) =>
  Array(value)
    .fill("")
    .map((_, index) => index);

export const getIndexArray = (arr) => {
  let newArr = [];
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      newArr.push({ key: i, value: arr[i] });
    }
  }

  return newArr;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatCurrency = (value) => {
  return value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const getMessage = (mess, lang) => {
  let result = mess && mess.split("|");

  if (lang === "en") {
    result = result[0];
  } else {
    result = result[1];
  }

  return result;
};
