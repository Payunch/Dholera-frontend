//#region Constants
export const PROCESSING = "Processing";
export const NO_DATA_FOUND = "No Data Found";
export const SUCCESS = "success";
export const ERROR = "error";
//#endregion

//#region Function

// export function setKeyboardShortcuts(
//   handleOnclickSave,
//   handleOnclickNew,
//   handleOnclickDelete,
//   handleOnclickPrint,
//   handleOnclickPluse,
//   handleOnclickAdd,
//   handleOnclickList
// ) {
//   const handleKeyDown = (event) => {
//     if (event.altKey && event.key.toLowerCase() === "s") {
//       event.preventDefault();
//       {
//         if (handleOnclickSave) {
//           handleOnclickSave();
//         } else {
//           console.log("Save function not available");
//         }
//       }
//     } else if (event.altKey && event.key.toLowerCase() === "n") {
//       event.preventDefault();
//       {
//         if (handleOnclickNew) {
//           handleOnclickNew();
//         } else {
//           console.log("New function not available");
//         }
//       }
//     } else if (event.altKey && event.key.toLowerCase() === "d") {
//       event.preventDefault();
//       {
//         if (handleOnclickDelete) {
//           handleOnclickDelete();
//         } else {
//           console.log("Delete function not available");
//         }
//       }
//     } else if (event.altKey && event.key.toLowerCase() === "p") {
//       event.preventDefault();
//       {
//         if (handleOnclickPrint) {
//           handleOnclickPrint();
//         } else {
//           console.log("Print function not available");
//         }
//       }
//     } else if (
//       event.altKey &&
//       (event.key === "=" || event.key === "+" || event.key === "≠")
//     ) {
//       event.preventDefault();
//       if (handleOnclickPluse) {
//         handleOnclickPluse();
//       } else {
//         console.log("Plus function not available");
//       }
//     } else if (
//       event.altKey &&
//       (event.code === "KeyA" ||
//         event.key.toLowerCase() === "a" ||
//         event.key === "å")
//     ) {
//       event.preventDefault();
//       if (handleOnclickAdd) {
//         handleOnclickAdd();
//       } else {
//         console.log("Add function not available");
//       }
//     } else if (
//       event.altKey &&
//       (event.code === "KeyL" || event.key.toLowerCase() === "l")
//     ) {
//       event.preventDefault();
//       if (handleOnclickList) {
//         handleOnclickList();
//       } else {
//         console.log("Add function not available");
//       }
//     }
//   };
//   document.addEventListener("keydown", handleKeyDown);
//   return () => {
//     document.removeEventListener("keydown", handleKeyDown);
//   };
// }

export function setKeyboardShortcuts({
  handleOnclickSave,
  handleOnclickNew,
  handleOnclickDelete,
  handleOnclickPrint,
  handleOnclickPluse,
  handleOnclickAdd,
  handleOnclickList,
  handleOnclickBaad,
  handleOnclickUmero,
  handleOnclickComMaster,
  handleOnclickJansiMaster,
  handleOnClickRemark,
}) {
  const handleKeyDown = (event) => {
    if (
      (event.altKey && event.key.toLowerCase() === "s") ||
      event.key === "ś"
    ) {
      event.preventDefault();
      {
        if (handleOnclickSave) {
          handleOnclickSave();
        } else {
          console.log("Save function not available");
        }
      }
    } else if (
      (event.altKey && event.key.toLowerCase() === "n") ||
      event.key === "ṇ"
    ) {
      event.preventDefault();
      {
        if (handleOnclickNew) {
          handleOnclickNew();
        } else {
          console.log("New function not available");
        }
      }
    } else if (
      (event.altKey && event.key.toLowerCase() === "d") ||
      event.key === "ḍ"
    ) {
      event.preventDefault();
      {
        if (handleOnclickDelete) {
          handleOnclickDelete();
        } else {
          console.log("Delete function not available");
        }
      }
    } else if (event.altKey && event.key.toLowerCase() === "f") {
      event.preventDefault();

      if (handleOnclickPrint) {
        console.log("Print triggered");
        handleOnclickPrint();
      } else {
        console.log("Print function not available");
      }
    } else if (
      (event.altKey &&
        (event.key === "=" || event.key === "+" || event.key === "≠")) ||
      event.key === "–"
    ) {
      event.preventDefault();
      if (handleOnclickPluse) {
        handleOnclickPluse();
      } else {
        console.log("Plus function not available");
      }
    } else if (
      // event.altKey &&
      // (event.code === "KeyA" ||
      //   event.key.toLowerCase() === "a" ||
      //   event.key === "å" ||
      //   event.key === "ā")
      (event.altKey &&
        (event.code === "KeyA" ||
          event.key.toLowerCase() === "a" ||
          event.key === "å")) ||
      event.key === "ā"
    ) {
      event.preventDefault();
      if (handleOnclickAdd) {
        handleOnclickAdd();
      } else {
        console.log("Add function not available");
      }
    } else if (
      (event.altKey &&
        (event.code === "KeyL" || event.key.toLowerCase() === "l")) ||
      event.code === "l̥"
    ) {
      event.preventDefault();
      if (handleOnclickList) {
        handleOnclickList();
      } else {
        console.log("List function not available");
      }
    } else if (
      event.altKey &&
      (event.code === "KeyB" || event.key.toLowerCase() === "b")
    ) {
      event.preventDefault();
      if (handleOnclickBaad) {
        handleOnclickBaad();
      } else {
        console.log("Baad function not available");
      }
    } else if (
      (event.altKey &&
        (event.code === "KeyU" || event.key.toLowerCase() === "u")) ||
      event.key === "ū"
    ) {
      event.preventDefault();
      if (handleOnclickUmero) {
        handleOnclickUmero();
      } else {
        console.log("Umero function not available");
      }
    } else if (
      event.altKey &&
      (event.code === "Key1" || event.key.toLowerCase() === "1")
    ) {
      event.preventDefault();
      if (handleOnclickJansiMaster) {
        handleOnclickJansiMaster();
      } else {
        console.log("Umero function not available");
      }
    } else if (event.altKey && event.key.toLowerCase() === "r") {
      event.preventDefault();
      if (handleOnClickRemark) {
        handleOnClickRemark();
      } else {
        console.log("Remark function not available");
      }
    } else if (
      event.altKey &&
      (event.code === "Key2" || event.key.toLowerCase() === "2")
    ) {
      event.preventDefault();
      if (handleOnclickComMaster) {
        handleOnclickComMaster();
      } else {
        console.log("Umero function not available");
      }
    }
  };
  document.addEventListener("keydown", handleKeyDown);
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}

export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export function getAgeOfDOB(date) {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function validatePANNo(panNo) {
  var result = false;
  if (panNo.length == 10) {
    result = true;
  }
  return result;
}

export function validateIFSCCode(ifscCode) {
  var result = false;
  if (ifscCode.length == 11) {
    result = true;
  }
  return result;
}

export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function getIndianFormatedNumber(number, decimalPlace = 2) {
  number = Number(number);
  return number.toLocaleString("en-IN", {
    maximumFractionDigits: decimalPlace,
    style: "currency",
    currency: "INR",
  });
}

export function get_YMD_from_SYS(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month <= 3) {
    year -= 1;
  }

  let localyear = getItemlocalStorage("ACY");
  if (year != localyear) {
    date = new Date(Number(localyear) + 1, 2, 31);
    month = "" + (date.getMonth() + 1);
    day = "" + date.getDate();
    year = date.getFullYear();
  } else {
    date = new Date();
    if (month <= 3) {
      year += 1;
    }
  }

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

export function get_DMY_from_YMD(date) {
  var datePart = date.match(/\d+/g),
    year = datePart[0],
    month = datePart[1],
    day = datePart[2];
  return `${day}/${month}/${year}`;
}

export function get_YMD_from_DMY(strDate, separator = "/") {
  var datePart = strDate.toString().split(separator);
  var day = datePart[0],
    month = datePart[1],
    year = datePart[2];
  return `${year}-${month}-${day}`;
}

export function getDateAcYearfromDate(strDate) {
  var result = "",
    month = "",
    year = "";
  if (strDate.length > 0) {
    var res = strDate.split("-");
    month = res[1];
    year = res[0];
    if (Number(month) >= 1 && Number(month) <= 3) {
      result = Number(year) - Number(1);
    } else if (Number(month) >= 4 && Number(month) <= 12) {
      result = year;
    }
  }
  return result;
}

export function getLastDayofMonthofGivenDate(dateYMD_Dash) {
  let arraySplitFromDt = dateYMD_Dash.split("-"),
    month = Number(arraySplitFromDt[1]),
    year = Number(arraySplitFromDt[0]),
    day = 0,
    newDate = convertStrDate_To_YMD(new Date(year, month, day)),
    arrnewDate = newDate.split("-");
  day = Number(arrnewDate[2]);
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  // return new Date(year, month, 0);
  return [year, month, day].join("-");
}

export function getTowDigits_DayORMonth(intDay_Month) {
  if (Number(intDay_Month) < 10) {
    return "0" + intDay_Month;
  } else {
    return intDay_Month;
  }
}

export function convertStrDate_To_YMD(strDate) {
  var date = new Date(strDate),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join("-");
}

export function get_DayMonthYear_of_Given_YMD_Date(dateYMD_Dash) {
  let arrDtParts = dateYMD_Dash.split("-"),
    intYear = Number(arrDtParts[0]),
    intMonth = Number(arrDtParts[1]),
    intDay = Number(arrDtParts[2]);
  return { intYear, intMonth, intDay };
}

export function get_NextDate_of_Given_YMD_Date(dateYMD_Dash) {
  var tomorrow = new Date(dateYMD_Dash);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return convertStrDate_To_YMD(tomorrow);
}

export function get_FirstDate_of_Given_YMD_Date(dateYMD_Dash) {
  var date = new Date(dateYMD_Dash),
    month = "" + (date.getMonth() + 1),
    day = "" + 1,
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function get_30DaysBack_FromCurrentDate(dateYMD_Dash = new Date()) {
  let n = new Date(dateYMD_Dash),
    d = new Date(dateYMD_Dash);
  d.setDate(n.getDate() - 30);
  var month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month == 3 && year == localStorage.getItem("ACY")) {
    month = "4";
    day = "1";
    console.log("month", month);
  }
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  // console.log("[year, month, day].join", [year, month, day].join("-"));
  return [year, month, day].join("-");
}

export function isDatePeriodValid(fromDateYMD, toDateYMD, id, toastErrorMsg) {
  let result = true;
  const fromDate = new Date(fromDateYMD);
  const toDate = new Date(toDateYMD);
  if (toDate < fromDate) {
    if (toastErrorMsg) {
      toastErrorMsg(
        `Select To Date After From Date: ${get_DMY_from_YMD(fromDateYMD)}`,
        id,
      );
    }
    result = false;
  }
  return result;
}

export function get_90DaysBack_FromCurrentDate() {
  let n = new Date(),
    d = new Date();
  d.setDate(n.getDate() - 90);

  var month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function getRowData(Rows, ColID, Data) {
  let resultRow = "";
  Rows.filter((row) => {
    if (row[ColID] == Data) {
      resultRow = row;
    }
  });
  return resultRow;
}

export function getRowColData(Rows, ColID, Distinct = true) {
  let resultList = [];
  Rows.filter((row) => {
    if (Distinct) {
      const found = resultList.some((el) => el[ColID] === row[ColID]);
      if (!found) {
        resultList.push({ [ColID]: row[ColID] });
      }
    } else {
      resultList.push({ [ColID]: row[ColID] });
    }
  });
  return resultList;
}

export function getRowDataList(Rows, ColID, Distinct = true) {
  let resultList = [];
  Rows.filter((row) => {
    if (Distinct) {
      const found = resultList.some((el) => el[ColID] === row[ColID]);
      if (!found) {
        resultList.push({ ...row });
      }
    } else {
      resultList.push({ ...row });
    }
  });
  return resultList;
}
export function getRowColSum(Rows, ColIDs) {
  let resultList = {};
  ColIDs.map((colID) => {
    resultList[colID] = Number(0);
  });
  Rows.filter((row) => {
    ColIDs.map((colID) => {
      if (row[colID] && isNumeric(row[colID])) {
        resultList[colID] = Number(row[colID]) + Number(resultList[colID]);
      }
    });
  });
  return resultList;
}

export function getTextSummary(strData, startIndex = 0, lastIndex = 5) {
  return (
    strData.substring(startIndex, lastIndex) + (strData.length > 5 ? "..." : "")
  );
}

export function getString_or_Blank4Null(strData) {
  return strData !== null && strData !== undefined ? strData : "";
}

export function formatDateTime(dateVal) {
  dateVal = new Date(dateVal);
  const tzoffset = (5 * 60 + 30) * 60000; //dateVal.getTimezoneOffset() * 60000
  const localTime = new Date(dateVal.getTime() + tzoffset);
  return localTime;
}

export function getAcYear_YYYY(fullAcYear) {
  return fullAcYear.substring(0, 4);
}

function padValue(value) {
  return value < 10 ? "0" + value : value;
}

export function getTaxNumFromStr(StrTaxName) {
  return StrTaxName !== undefined
    ? Number(StrTaxName.substring(0, StrTaxName.length - 1))
    : 0;
}

export function getTaxableFromValue(numTax, value) {
  return roundOff((Number(value) / (100 + Number(numTax))) * 100, 2);
}

export function roundOff(num, precision = 2) {
  let precisionValue = 1;
  for (let i = 1; i <= precision; i++) {
    precisionValue *= 10;
  }
  return Math.round((num + Number.EPSILON) * precisionValue) / precisionValue;
}

export function isValidItem(rows, colID, value) {
  let result = false;
  if (rows.length > 0) {
    for (let i = 0; i < rows.length > 0; i++) {
      if (
        (rows[i][colID] !== undefined && rows[i][colID] == value) ||
        (colID === "" && rows[i] == value)
      ) {
        result = true;
        return result;
      }
    }
  }
  return result;
}

export function getRowsWithColsExists({
  dataArray,
  colList,
  excludeBlankColValue = true,
}) {
  const resultArray = [];
  dataArray.map((row) => {
    let rowColFound = 0;
    colList.map((col) => {
      if (
        row[col] !== undefined &&
        row[col] !== null &&
        (excludeBlankColValue !== true || row[col] !== "")
      ) {
        rowColFound++;
      }
    });
    if (rowColFound === colList.length) {
      resultArray.push(row);
    }
  });
  return resultArray;
}

export function csvFileName(pageName) {
  var result = "";
  if (pageName.length > 0) {
    result = pageName + " Data as on " + getFormattedDate();
  }
  return result;
}

const getFormattedDate = () => {
  const today = new Date();
  const day = today.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
};

export function applyTrimOnArray(dataArray) {
  return dataArray.map((data) => applyTrimOnObjectValues({ formData: data }));
}

export function applyTrimOnObjectValues({
  formData,
  excludeKeysArray,
  replaceNullwithBlank = true,
  numberKeysArray,
}) {
  const keys = Object.keys(formData);
  let trimFormData = {};
  keys.forEach((key) => {
    let isToExclude = false;
    if (
      excludeKeysArray !== undefined &&
      excludeKeysArray.length > 0 &&
      excludeKeysArray.includes(key)
    ) {
      isToExclude = true;
    }
    if (replaceNullwithBlank) {
      formData[key] = getString_or_Blank4Null(formData[key]);
    }
    if (isToExclude === false) {
      if (numberKeysArray && numberKeysArray.includes(key)) {
        trimFormData[key] = Number(formData[key]);
      } else {
        trimFormData[key] = String(formData[key]).trim();
      }
    } else {
      trimFormData[key] = formData[key];
    }
  });
  return trimFormData;
}

export function loadValuesIntoMainArray({
  MainArray,
  MainArrayColList,
  ValueArray,
  compareColID,
  copyValueColIDArray,
}) {
  const resultArray = [];
  MainArray.map((MA) => {
    let MainCol = {};
    MainArrayColList.map((col) => {
      MainCol[col] = MA[col];
    });
    resultArray.push(MainCol);
  });
  if (ValueArray && ValueArray.length > 0) {
    ValueArray.map((VA) => {
      let isFound = 0;
      resultArray.map((RA) => {
        if (RA[compareColID] === VA[compareColID]) {
          copyValueColIDArray.map((curCol) => {
            let value =
              curCol.id !== null && curCol.id !== undefined
                ? VA[curCol.id]
                : curCol.datatype === "string"
                  ? ""
                  : 0;
            RA[curCol.id] = value;
          });
          isFound++;
        }
      });
      if (isFound === 0) {
        let newItem = {
          [compareColID]: VA[compareColID],
        };
        copyValueColIDArray.map((curCol) => {
          newItem[curCol.id] =
            curCol.id !== null && curCol.id !== undefined
              ? VA[curCol.id]
              : curCol.datatype === "string"
                ? ""
                : 0;
        });
        MainArray.push(newItem);
      }
    });
  }
  return resultArray;
}

export function copyArrayValue(ValueArray) {
  let blankArray = [];
  ValueArray.map((VA) => {
    blankArray.push(VA);
  });
  return blankArray;
}

export function copyRowsAllCols(rows, cols) {
  let blankArray = [];
  rows.map((row) => {
    let rowValue = {};
    cols.map((col) => {
      rowValue[col] = row[col];
    });
    blankArray.push(rowValue);
  });
  return blankArray;
}

export function getYMDfromMDY(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  // console.log("d", d);

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function getYMDfromDMY(date) {
  // console.log("date", date);
  const [day, month, year] = date.split("/");
  const dateObject = new Date(`${year}-${month}-${day}`);
  // console.log("dateObject", dateObject);
  if (!isNaN(dateObject.getTime())) {
    // console.log("dateObject.toISOString()", dateObject.toISOString());
    const formattedDate = dateObject.toISOString().split("T")[0];
    // console.log("formattedDate", formattedDate);
    return formattedDate;
  } else {
    return "Invalid date";
  }
}

export function getFromToDate4AcYear(yyyy) {
  /**
   * step : 1 => provide first & last date of given year
   * step : 2 => return both date in YYYY-MM-DD in JO
   */
  var firstDate = getYMDfromMDY(new Date(yyyy + "-04-01")); // Apr 1st of 2023 the given year
  var lastDate = getYMDfromMDY(new Date(Number(yyyy) + 1 + "-03-31")); // mar 31st of 2024 the given year

  return {
    firstDate,
    lastDate,
  };
}

export function getRoundOff(number, decimalPlace = 0) {
  let roffnumber = roundOff(number, decimalPlace);
  let roff = roffnumber - number;
  return { number, roff: roff, roff_number: roffnumber };
}

export function isDateInRange(strDateYMD, minDateYMD, maxDateYMD) {
  const date = new Date(strDateYMD);
  return date >= new Date(minDateYMD) && date <= new Date(maxDateYMD);
}

export function validatedate_min_max(strDateYMD, id, toastErrorMsg) {
  let minDateYMD = document.getElementById(id).min,
    maxDateYMD = document.getElementById(id).max;
  if (strDateYMD && !isDateInRange(strDateYMD, minDateYMD, maxDateYMD)) {
    if (toastErrorMsg) {
      toastErrorMsg(
        `Select date between ${get_DMY_from_YMD(
          minDateYMD,
        )} and ${get_DMY_from_YMD(maxDateYMD)}`,
        id,
      );
    } else {
      alert(
        `Select date between ${get_DMY_from_YMD(
          minDateYMD,
        )} and ${get_DMY_from_YMD(maxDateYMD)}`,
        id,
      );
    }
    return false;
  } else {
    return true;
  }
}

export function setTaxPaidRate(NumTaxName, rate, qty = 1) {
  // console.log("NumTaxName", NumTaxName);
  // console.log("rate", rate);

  // if (!isNumeric(NumTaxName)) {
  //   NumTaxName = 0;
  // }

  let arrTaxPaidRate = getRoundOff(
    ((rate / (100 + Number(NumTaxName))) * 100) / qty,
    2,
  );
  let amt_TaxPaidRate = arrTaxPaidRate["roff_number"];
  // console.log("amt_TaxPaidRate", amt_TaxPaidRate);
  return amt_TaxPaidRate;
}
export function isCompanyChange(CompanyName) {
  if (CompanyName == localStorage.getItem("CompanyName")) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
}

export function applyNumberToRow(rows, colsIDArray) {
  let returnRows = undefined;
  if (colsIDArray !== undefined && colsIDArray.length > 0) {
    returnRows = rows.map((row) => {
      let newrow = { ...row };
      colsIDArray.map((col) => {
        if (newrow[col]) {
          newrow[col] = Number(newrow[col]);
        }
      });
      return newrow;
    });
  }
  return returnRows;
}

export function checkCondition(conditions, row) {
  let conditionFinalResult = false,
    iterationResults = [];

  conditions.forEach((curcondition) => {
    let conditionResult = false;
    if (
      curcondition.relationalOperator === undefined ||
      curcondition.relationalOperator == "=="
    ) {
      if (row[curcondition.colID] == curcondition.value) conditionResult = true;
    } else if (
      curcondition.relationalOperator &&
      curcondition.relationalOperator == "==="
    ) {
      if (row[curcondition.colID] === curcondition.value)
        conditionResult = true;
    } else if (
      curcondition.relationalOperator &&
      curcondition.relationalOperator == "!="
    ) {
      if (row[curcondition.colID] != curcondition.value) conditionResult = true;
    } else if (
      curcondition.relationalOperator &&
      curcondition.relationalOperator == "!=="
    ) {
      if (row[curcondition.colID] !== curcondition.value)
        conditionResult = true;
    } else if (
      curcondition.relationalOperator &&
      curcondition.relationalOperator == "<="
    ) {
      if (row[curcondition.colID] <= curcondition.value) conditionResult = true;
    } else if (
      curcondition.relationalOperator &&
      curcondition.relationalOperator == "<"
    ) {
      if (row[curcondition.colID] < curcondition.value) conditionResult = true;
    } else if (
      curcondition.relationalOperator &&
      curcondition.relationalOperator == ">="
    ) {
      if (row[curcondition.colID] >= curcondition.value) conditionResult = true;
    } else if (
      curcondition.relationalOperator &&
      curcondition.relationalOperator == ">"
    ) {
      if (row[curcondition.colID] > curcondition.value) conditionResult = true;
    }
    iterationResults.push({
      conditionResult,
      logicalOperator:
        curcondition.logicalOperator && curcondition.logicalOperator.length > 0
          ? curcondition.logicalOperator
          : null,
    });
  });

  if (iterationResults.length === 1) {
    conditionFinalResult = iterationResults[0].conditionResult;
  } else {
    iterationResults.forEach((curResult) => {
      if (curResult.logicalOperator === null) {
        conditionFinalResult = curResult.conditionResult;
      } else {
        if (curResult.logicalOperator === "&&") {
          conditionFinalResult =
            conditionFinalResult && curResult.conditionResult;
        } else {
          conditionFinalResult =
            conditionFinalResult || curResult.conditionResult;
        }
      }
    });
  }

  return conditionFinalResult;
}

export function setDateChange(Name, Value) {
  if (Name === "dtpFromDate" || Name === "dtpToDate") {
    localStorage.setItem(Name, Value);
  }
}

export function getItemlocalStorage(id) {
  return localStorage.getItem(id);
}

export function defaultDateSetting() {
  localStorage.removeItem("dtpFromDate");
  localStorage.removeItem("dtpToDate");
  window.location.reload();
}

export function getlocalstoragedate(type) {
  let datesettings = getItemlocalStorage("defaultsettings");
  let storedFromDate = "";
  let storedToDate = "";
  if (datesettings) {
    let jsondatesettings = JSON.parse(datesettings).date;
    if (jsondatesettings != undefined) {
      if (type === "Sales") {
        storedFromDate = jsondatesettings.saleslistfromdate;
        storedToDate = jsondatesettings.saleslisttodate;
      } else if (type === "Purchase") {
        storedFromDate = jsondatesettings.purchaselistfromdate;
        storedToDate = jsondatesettings.purchaselisttodate;
      } else if (type === "Receipt") {
        storedFromDate = jsondatesettings.receiptlistfromdate;
        storedToDate = jsondatesettings.receiptlisttodate;
      } else if (type === "Payment") {
        storedFromDate = jsondatesettings.paymentlistfromdate;
        storedToDate = jsondatesettings.paymentlisttodate;
      } else if (type === "Order") {
        storedFromDate = jsondatesettings.orderlistfromdate;
        storedToDate = jsondatesettings.orderlisttodate;
      } else if (type === "Loading") {
        storedFromDate = jsondatesettings.loadinglistfromdate;
        storedToDate = jsondatesettings.loadinglisttodate;
      } else if (type === "Unloading") {
        storedFromDate = jsondatesettings.unloadinglistfromdate;
        storedToDate = jsondatesettings.unloadinglisttodate;
      } else if (type === "SalesReport") {
        storedFromDate = jsondatesettings.salesreportlistfromdate;
        storedToDate = jsondatesettings.salesreportlisttodate;
      } else if (type === "PurchaseReport") {
        storedFromDate = jsondatesettings.purchasereportlistfromdate;
        storedToDate = jsondatesettings.purchasereportlisttodate;
      } else if (type === "DayBookReport") {
        storedFromDate = jsondatesettings.daybookreportlistfromdate;
        storedToDate = jsondatesettings.daybookreportlisttodate;
      } else if (type === "LedgerBookReport") {
        storedFromDate = jsondatesettings.ledgerbookreportlistfromdate;
        storedToDate = jsondatesettings.ledgerbookreportlisttodate;
      } else if (type === "StockReport") {
        storedFromDate = jsondatesettings.stockreportlistfromdate;
        storedToDate = jsondatesettings.stockreportlisttodate;
      }
    }
  }
  const Storeddate = new Date(storedFromDate);
  let storedYear = Storeddate.getFullYear();
  let storedmonth = Storeddate.getMonth() + 1;

  let localyear = getItemlocalStorage("ACY");

  const curdate = new Date();
  let curyear = curdate.getFullYear();
  let curmonth = curdate.getMonth() + 1; // Adding 1 to convert it to a 1-based month

  if (storedmonth <= 3) {
    storedYear = storedYear - 1;
  }
  if (curmonth <= 3) {
    curyear = curyear - 1;
  }

  const startDate = Number(storedYear) + "-04-01";
  const endDate = Number(storedYear) + 1 + "-03-31";
  if (
    isDateInRange(storedFromDate, startDate, endDate) == false &&
    isDateInRange(storedToDate, startDate, endDate) == false &&
    curyear == localyear &&
    storedYear != localyear
  ) {
    storedFromDate = get_30DaysBack_FromCurrentDate();
    storedToDate = get_YMD_from_SYS(new Date());
  } else if (isNaN(storedYear) || storedYear != localyear) {
    if (localyear != curyear) {
      storedFromDate = Number(localyear) + "-04-01";
      storedToDate = Number(localyear) + 1 + "-03-31";
    } else {
      storedFromDate = get_30DaysBack_FromCurrentDate();
      storedToDate = get_YMD_from_SYS(new Date());
    }
  }

  return {
    fromdate: storedFromDate
      ? storedFromDate
      : get_30DaysBack_FromCurrentDate(),
    todate: storedToDate ? storedToDate : get_YMD_from_SYS(new Date()),
  };
}

export function setlocalstoragedate(type, fromdate, todate, reset = false) {
  if (reset) {
    fromdate = get_30DaysBack_FromCurrentDate();
    todate = get_YMD_from_SYS(new Date());
  }
  let datesettings = getItemlocalStorage("defaultsettings");
  if (datesettings) {
    const jsonData = JSON.parse(datesettings);
    if (type === "Sales") {
      jsonData.date.saleslistfromdate = fromdate;
      jsonData.date.saleslisttodate = todate;
    } else if (type === "Purchase") {
      jsonData.date.purchaselistfromdate = fromdate;
      jsonData.date.purchaselisttodate = todate;
    } else if (type === "Receipt") {
      jsonData.date.receiptlistfromdate = fromdate;
      jsonData.date.receiptlisttodate = todate;
    } else if (type === "Payment") {
      jsonData.date.paymentlistfromdate = fromdate;
      jsonData.date.paymentlisttodate = todate;
    } else if (type === "Order") {
      jsonData.date.orderlistfromdate = fromdate;
      jsonData.date.orderlisttodate = todate;
    } else if (type === "Loading") {
      jsonData.date.loadinglistfromdate = fromdate;
      jsonData.date.loadinglisttodate = todate;
    } else if (type === "Unloading") {
      jsonData.date.unloadinglistfromdate = fromdate;
      jsonData.date.unloadinglisttodate = todate;
    } else if (type === "SalesReport") {
      jsonData.date.salesreportlistfromdate = fromdate;
      jsonData.date.salesreportlisttodate = todate;
    } else if (type === "PurchaseReport") {
      jsonData.date.purchasereportlistfromdate = fromdate;
      jsonData.date.purchasereportlisttodate = todate;
    } else if (type === "DayBookReport") {
      jsonData.date.daybookreportlistfromdate = fromdate;
      jsonData.date.daybookreportlisttodate = todate;
    } else if (type === "LedgerBookReport") {
      jsonData.date.ledgerbookreportlistfromdate = fromdate;
      jsonData.date.ledgerbookreportlisttodate = todate;
    } else if (type === "StockReport") {
      jsonData.date.stockreportlistfromdate = fromdate;
      jsonData.date.stockreportlisttodate = todate;
    }
    localStorage.setItem("defaultsettings", JSON.stringify(jsonData));
  } else {
    let jsonData = {};
    if (type === "Sales") {
      jsonData = {
        date: {
          saleslistfromdate: fromdate,
          saleslisttodate: todate,
        },
      };
    } else if (type === "Purchase") {
      jsonData = {
        date: {
          purchaselistfromdate: fromdate,
          purchaselisttodate: todate,
        },
      };
    } else if (type === "Receipt") {
      jsonData = {
        date: {
          receiptlistfromdate: fromdate,
          receiptlisttodate: todate,
        },
      };
    } else if (type === "Payment") {
      jsonData = {
        date: {
          paymentlistfromdate: fromdate,
          paymentlisttodate: todate,
        },
      };
    } else if (type === "Order") {
      jsonData = {
        date: {
          orderlistfromdate: fromdate,
          orderlisttodate: todate,
        },
      };
    } else if (type === "Loading") {
      jsonData = {
        date: {
          loadinglistfromdate: fromdate,
          loadinglisttodate: todate,
        },
      };
    } else if (type === "Unloading") {
      jsonData = {
        date: {
          unloadinglistfromdate: fromdate,
          unloadinglisttodate: todate,
        },
      };
    } else if (type === "SalesReport") {
      jsonData = {
        date: {
          salesreportlistfromdate: fromdate,
          salesreportlisttodate: todate,
        },
      };
    } else if (type === "PurchaseReport") {
      jsonData = {
        date: {
          purchasereportlistfromdate: fromdate,
          purchasereportlisttodate: todate,
        },
      };
    } else if (type === "DayBookReport") {
      jsonData = {
        date: {
          daybookreportlistfromdate: fromdate,
          daybookreportlisttodate: todate,
        },
      };
    } else if (type === "LedgerBookReport") {
      jsonData = {
        date: {
          ledgerbookreportlistfromdate: fromdate,
          ledgerbookreportlisttodate: todate,
        },
      };
    } else if (type === "StockReport") {
      jsonData = {
        date: {
          stockreportlistfromdate: fromdate,
          stockreportlisttodate: todate,
        },
      };
    }
    localStorage.setItem("defaultsettings", JSON.stringify(jsonData));
  }
}

export function convertGujaratiToEnglishNumber(input) {
  if (input === null || input === undefined) return "";

  const gujaratiToEnglishMap = {
    "૦": "0",
    "૧": "1",
    "૨": "2",
    "૩": "3",
    "૪": "4",
    "૫": "5",
    "૬": "6",
    "૭": "7",
    "૮": "8",
    "૯": "9",
  };

  return input
    .toString()
    .replace(/[૦-૯]/g, (digit) => gujaratiToEnglishMap[digit] || digit);
}

export function convertEnglishToGujaratiNumber(input) {
  console.log("input", input);
  const englishToGujaratiMap = {
    0: "૦",
    1: "૧",
    2: "૨",
    3: "૩",
    4: "૪",
    5: "૫",
    6: "૬",
    7: "૭",
    8: "૮",
    9: "૯",
  };

  const gujaratiNumber = input
    .toString()
    .replace(/[0-9]/g, (digit) => englishToGujaratiMap[digit] || digit);

  const numberPattern = /^-?[૦-૯]{0,20}([.][૦-૯]{0,5})?$/;

  // Return only if it matches the pattern
  return numberPattern.test(gujaratiNumber) ? gujaratiNumber : "";
}

export function getRowOfRT(row, keyArray) {
  let result = {};
  keyArray.map((key) => {
    result[key] = row.getValue ? row.getValue(key) : row[key];
  });
  return result;
}

export function stripHtmlTags(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
}

//#endregion
