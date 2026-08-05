// import React from "react";
// import Button from "@mui/material/Button";
// import { Visibility } from "@mui/icons-material";

// const CtBtn = ({
//   id,
//   label,
//   disabled,
//   onClick,
//   width,
//   variant,
//   bgColor,
//   fontColor,
//   fontWeight,
//   justifyContent,
//   display,
//   className,
// }) => {
//   let buttonStyle = {};
//   buttonStyle.width = width > 0 ? width + "px" : "auto";
//   if (
//     (disabled === undefined || disabled !== true) &&
//     (variant === undefined || variant === "contained")
//   ) {
//     buttonStyle.backgroundColor = "#42AA46";
//     buttonStyle.color = "#ffffff";
//   }
//   if (bgColor !== undefined && bgColor.length > 0) {
//     buttonStyle.backgroundColor = bgColor;
//     buttonStyle.color = "#ffffff";
//   }
//   if (fontColor !== undefined && fontColor.length > 0) {
//     // buttonStyle.backgroundColor = fontColor;
//     buttonStyle.color = fontColor;
//   }
//   if (fontWeight !== undefined) {
//     buttonStyle.fontWeight = fontWeight;
//   }
//   if (justifyContent !== undefined) {
//     buttonStyle.justifyContent = justifyContent;
//   }

//   if (className !== undefined) {
//     if (className == "Primary") {
//       buttonStyle.backgroundColor = "#3487D7";
//       buttonStyle.color = "#ffffff";
//     } else if (className == "Secondary") {
//       variant = "outlined";
//       buttonStyle.backgroundColor = "#ffffff";
//       buttonStyle.color = "#3487D7";
//       buttonStyle.border = "1px solid #3487D7";
//     } else if (className == "Delete") {
//       buttonStyle.backgroundColor = "#fe6969";
//       buttonStyle.color = "#ffffff";
//     } else {
//       buttonStyle.backgroundColor = "#42AA46";
//       buttonStyle.color = "#ffffff";
//     }
//   }

//   let Btn = (
//     <Button
//       id={id}
//       name={id}
//       variant={variant ? variant : "contained"}
//       color="success"
//       disabled={disabled}
//       style={buttonStyle}
//       onClick={onClick}
//     >
//       {label}
//     </Button>
//   );

//   if (display !== undefined && (display === false || display === "none")) {
//     Btn = "";
//   }

//   return <>{Btn}</>;
// };

// export default CtBtn;

import React from "react";
import Button from "@mui/material/Button";
import {
  CurrencyRupee,
  Edit,
  FileCopy,
  InsertDriveFile,
  PlusOne,
  TextSnippet,
  Visibility,
} from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ViewListIcon from "@mui/icons-material/ViewList";
import CachedIcon from "@mui/icons-material/Cached";
import { Upgrade } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import excel from "../../image/Gemini_Generated_Image_xtts4xxtts4xxtts.png";
// import New_Blue from "../../images/New_Icon_Blue.png";
// import New from "../../images/New_Icon.png";
import New_Blue from "../../image/Gemini_Generated_Image_q040m5q040m5q040.png";
import New from "../../image/Gemini_Generated_Image_rgc0cbrgc0cbrgc0.png";
import "../button.css";

// import "../theam.css";

const CtBtn = ({
  id,
  label,
  disabled,
  onClick,
  width,
  variant,
  color,
  bgColor,
  fontColor,
  fontWeight,
  justifyContent,
  hide,
  className,
  size,
  margin,
  iconName,
}) => {
  let buttonStyle = {};
  buttonStyle.width = width > 0 ? width + "px" : "auto";
  if (
    (disabled === undefined || disabled !== true) &&
    (variant === undefined || variant === "contained")
  ) {
    buttonStyle.backgroundColor = "#3487D7";
    buttonStyle.color = "#ffffff";
  }
  if (bgColor !== undefined && bgColor.length > 0) {
    buttonStyle.backgroundColor = bgColor;
    buttonStyle.color = "#ffffff";
  }
  if (fontColor !== undefined && fontColor.length > 0) {
    // buttonStyle.backgroundColor = fontColor;
    buttonStyle.color = fontColor;
  }
  if (fontWeight !== undefined) {
    buttonStyle.fontWeight = fontWeight;
  }
  if (justifyContent !== undefined) {
    buttonStyle.justifyContent = justifyContent;
  }

  if (margin !== undefined) {
    buttonStyle.margin = margin;
  }

  let icon = "";
  let endicon = "";
  iconName =
    typeof label === "string" && iconName == undefined
      ? label.toLowerCase()
      : iconName;
  if (iconName == "delete") {
    buttonStyle.backgroundColor = "#fe6969";
    buttonStyle.color = "#ffffff";
    icon = <DeleteOutlineIcon />;
  } else if (iconName == "new") {
    variant === "outlined"
      ? (icon = <img src={New_Blue} alt="New" height={"25px"} width={"25px"} />)
      : (icon = <img src={New} alt="New" height={"25px"} width={"25px"} />);
  } else if (iconName == "print") {
    icon = <PrintIcon />;
  } else if (iconName == "save") {
    icon = <SaveIcon />;
  } else if (iconName == "right") {
    endicon = <ArrowForwardIcon />;
  } else if (iconName == "left") {
    icon = <ArrowBackIcon />;
  } else if (iconName == "List") {
    icon = <ViewListIcon />;
  } else if (iconName == "load") {
    icon = <CachedIcon />;
  } else if (iconName == "Status") {
    icon = <Upgrade />;
  } else if (iconName == "Edit") {
    icon = <Edit />;
  } else if (iconName == "excel") {
    icon = <img src={excel} alt="excel" height={"25px"} width={"25px"} />;
  } else if (iconName == "Currency") {
    icon = <CurrencyRupee />;
  } else if (iconName == "pdf") {
    icon = <TextSnippet />;
  } else if (iconName == "revise") {
    icon = <FileCopy />;
  } else if (iconName == "invoice") {
    icon = <InsertDriveFile />;
  } else {
    icon = "";
  }

  let btnColor = color ? color : "primary";

  // console.log("variant", variant);

  let button = (
    <Button
      id={id}
      variant={variant ? variant : "contained"}
      color={btnColor}
      disabled={disabled}
      style={buttonStyle}
      onClick={onClick}
      className={disabled ? "disable-button" : className}
      startIcon={icon}
      endIcon={endicon}
      size={size ? size : "medium"}
    >
      {/* {firstletterBig === true ? FirstLetterBigLable : label} */}
      {label}
    </Button>
  );
  if (disabled) {
    button = <span className="disable-button-cursor">{button}</span>;
  }
  return button;
};

export default CtBtn;
