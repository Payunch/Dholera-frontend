import React from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Tooltip,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Delete, Info, InfoOutlined } from "@mui/icons-material";

export default function AlertResponsiveDialog({
  label,
  labelAgree,
  labelDelete,
  labelDisagree,
  DisagreeBtnVariant,
  alertHeading,
  HeadingIcon,
  alertTitle,
  alertMessage,
  alertNote,
  noOutLine,
  color,
  disableAgree,
  autoFocusAgreeButton,
  autoFocusDisagreeButton,
  fullScreenBreakPoint,
  fullscreenOnly,
  maxWidthClass,
  handleOnClickYes,
  handleOnClickNo,
  defaultOpenDialog,
  disabled,
  ToolTipLabel,
  style,
  onYesClickCloseIfExeSuccessfully,
}) {
  const openDefaultStatus =
    defaultOpenDialog && defaultOpenDialog == true ? true : false;
  const [open, setOpen] = React.useState(openDefaultStatus);
  const theme = useTheme();
  const fullScreen = useMediaQuery(
    theme.breakpoints.down(
      fullScreenBreakPoint !== undefined ? fullScreenBreakPoint : "md"
    )
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (handleOnClickNo) {
      handleOnClickNo();
    }
  };

  const handleYes = async () => {
    if (onYesClickCloseIfExeSuccessfully) {
      if (await handleOnClickYes()) {
        setOpen(false);
      }
    } else {
      setOpen(false);
      handleOnClickYes();
    }
  };

  const alertBtnStyle = style;

  const AutoFocusAgree =
    autoFocusAgreeButton !== undefined && autoFocusAgreeButton === true
      ? true
      : false;

  const AutoFocusDisagree =
    autoFocusDisagreeButton !== undefined && autoFocusDisagreeButton === true
      ? true
      : false;

  let btnColor = color ? color : "primary";
  let StyleBtn = { fontWeight: "bolder" };
  let StyleOutlineBtn = {
    color: "#000000",
    border: "1px solid #000000",
  };
  let disableAgreeButton = false;
  if (disableAgree && disableAgree === true) {
    disableAgreeButton = true;
  }

  return (
    <div>
      {ToolTipLabel ? (
        noOutLine && noOutLine === true ? (
          <Tooltip title={ToolTipLabel}>
            <IconButton
              color={btnColor}
              onClick={handleClickOpen}
              disabled={disabled}
              style={alertBtnStyle}
            >
              {label}
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={ToolTipLabel}>
            <Button
              variant="outlined"
              color={btnColor}
              onClick={handleClickOpen}
              disabled={disabled}
              style={alertBtnStyle}
            >
              {label}
            </Button>
          </Tooltip>
        )
      ) : noOutLine && noOutLine === true ? (
        <IconButton
          color={btnColor}
          onClick={handleClickOpen}
          disabled={disabled}
          style={alertBtnStyle}
        >
          {label}
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          color={btnColor}
          onClick={handleClickOpen}
          disabled={disabled}
          style={alertBtnStyle}
        >
          {label}
        </Button>
      )}
      <Dialog
        fullScreen={fullscreenOnly ? true : fullScreen}
        maxWidth={maxWidthClass}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Typography
          fontSize="24px"
          color="black"
          marginTop={1}
          fontWeight="bolder"
          marginLeft={1}
        >
          <Box display="flex" alignItems="center">
            {HeadingIcon ? (
              <Box mr={1} display="flex" alignItems="center">
                {HeadingIcon}
              </Box>
            ) : labelDelete ? (
              <Delete style={{ marginRight: "8px", color: "red" }} />
            ) : (
              ""
            )}
            {alertHeading
              ? alertHeading
              : labelDelete
              ? "Delete confirmation"
              : ""}
          </Box>
        </Typography>
        {alertHeading ? (
          <Divider style={{ marginTop: "8px" }} />
        ) : labelDelete ? (
          <Divider style={{ marginTop: "8px" }} />
        ) : (
          ""
        )}

        {alertNote ? (
          <Box
            mt={1}
            marginLeft={"22px"}
            marginRight={"22px"}
            padding={"14px"}
            sx={{ backgroundColor: "#ffeaeaff", borderRadius: "5px" }}
            display="flex"
            alignItems="flex-starte"
          >
            <InfoOutlined style={{ marginRight: "8px", color: "red" }} />
            {alertNote}
          </Box>
        ) : (
          ""
        )}
        {alertTitle ? (
          <DialogTitle id="responsive-dialog-title">{alertTitle}</DialogTitle>
        ) : (
          ""
        )}
        {alertMessage ? (
          <DialogContent>
            <DialogContentText>{alertMessage}</DialogContentText>
          </DialogContent>
        ) : (
          ""
        )}
        <DialogActions>
          {labelDisagree ? (
            <Button
              autoFocus={AutoFocusDisagree}
              onClick={handleClose}
              style={
                DisagreeBtnVariant == "outlined" ? StyleOutlineBtn : StyleBtn
              }
            >
              {labelDisagree}
            </Button>
          ) : (
            ""
          )}
          {labelAgree ? (
            <Button
              onClick={handleYes}
              color="primary"
              disabled={disableAgreeButton}
              style={StyleBtn}
              autoFocus={AutoFocusAgree}
            >
              {labelAgree}
            </Button>
          ) : (
            ""
          )}
          {labelDelete ? (
            <Button
              onClick={handleYes}
              color="primary"
              style={{
                backgroundColor: "#ff3d3dff",
                color: "white",
                fontWeight: "bolder",
              }}
            >
              {labelDelete}
            </Button>
          ) : (
            ""
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
