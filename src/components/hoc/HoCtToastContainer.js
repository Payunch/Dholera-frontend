import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import { CheckCircleSharp, Error, Help } from "@mui/icons-material";
import processing from "../gif/processing.gif";

const HoCtToastContainer = (CtToast) => {
  // const toastId = React.useRef(null)
  let toastId = "";

  const notifyProcessing = () => {
    toastId = toast(<ProcessingMsg />, {
      autoClose: false,
      closeOnClick: false,
    });
  };

  const updateProcessing = (MsgType, Message) => {
    toast.update(toastId, {
      render: (
        <Msg
          // MsgType={MsgType}
          Message={Message}
        />
      ),
      type:
        MsgType === "success"
          ? toast.TYPE.SUCCESS
          : MsgType === "warning"
          ? toast.TYPE.WARNING
          : MsgType === "info" || MsgType === "close"
          ? toast.TYPE.INFO
          : toast.TYPE.ERROR,
      autoClose:
        MsgType === "success"
          ? 2000
          : MsgType === "info"
          ? 1000
          : MsgType === "close"
          ? 100
          : 4000,
      closeOnClick: true,
      // className: 'rotateY animated'
    });
  };

  const closeUpdateProcessing = (MsgType, Message) => {
    if (MsgType === "error") {
      toast.update(toastId, {
        render: (
          <Msg
            // MsgType={MsgType}
            Message={Message}
            // Message={'Done'}
          />
        ),
        type:
          // MsgType === "success"
          //   ? toast.TYPE.SUCCESS
          //   :
          MsgType === "warning"
            ? toast.TYPE.WARNING
            : MsgType === "info" || MsgType === "close" || MsgType === "success"
            ? toast.TYPE.INFO
            : toast.TYPE.ERROR,
        autoClose:
          (MsgType ===
            // "success" ? 2000 :
            MsgType) ===
            "info" ||
          MsgType === "close" ||
          MsgType === "success"
            ? 100
            : 4000,
        closeOnClick: true,
        // className: 'rotateY animated'
      });
    } else {
      toast.dismiss();
    }
  };

  const toastMsg = (MsgType, Message) => {
    toast(
      <Msg
        // MsgType={MsgType}
        Message={Message}
      />,
      {
        type:
          MsgType === "success"
            ? toast.TYPE.SUCCESS
            : MsgType === "warning"
            ? toast.TYPE.WARNING
            : MsgType === "info"
            ? toast.TYPE.INFO
            : toast.TYPE.ERROR,
        autoClose:
          MsgType === "success" ? 2000 : MsgType === "info" ? 1000 : 4000,
        closeOnClick: true,
        // className: 'rotateY animated'
      }
    );
  };

  const toastErrorMsg = (Message, Id) => {
    toast.error(
      <Msg
        // MsgType={'error'}
        Message={Message}
      />
    );
    if (Id) {
      document.getElementById(Id).focus();
    }
  };

  const Msg = ({ MsgType, Message }) => (
    <div style={{ textAlign: "center" }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        {MsgType ? (
          MsgType === "success" ? (
            <CheckCircleSharp />
          ) : MsgType === "warning" ? (
            <Help />
          ) : (
            <Error />
          )
        ) : (
          ""
        )}
        {/* <CheckCircleSharpIcon />&nbsp;&nbsp;&nbsp;Registration Successful */}
        &nbsp;&nbsp;&nbsp;
        {Message && Message.length > 0
          ? Message
          : "Process Completed & No Result Found"}
      </Grid>
    </div>
  );

  const ProcessingMsg = () => (
    <div style={{ textAlign: "center" }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        style={{ fontSize: "16px" }}
      >
        <img
          src={processing}
          alt="Processing"
          style={{ width: "100px", height: "auto" }}
        />
        &nbsp;&nbsp;&nbsp;<b>Please wait...</b>
      </Grid>
    </div>
  );

  const onKeyDown = (
    event, //1
    inc, //2
    defaultAction = null, //3
    validateInput = null, //4
    nextCtrlID = undefined, //5
    focusNextCtrlOnDefaultAction = undefined //6
  ) => {
    // console.log("onKeyDown : 1");
    if (event && event.keyCode === 13) {
      event.preventDefault();
      // console.log("onKeyDown : nextCtrlID = ", nextCtrlID);
      if (nextCtrlID === undefined) {
        // console.log("onKeyDown : 2");
        const form = event.target.form;
        // console.log("form", form);
        // console.log("form.elements", form.elements);
        const index = form
          ? Array.prototype.indexOf.call(form, event.target)
          : 0;
        // console.log("index", index);
        const nextIndex = index + inc;
        const n = form ? form.elements.length : 0;
        // console.log("nextIndex", nextIndex);
        // console.log("n", n);
        if (n - 1 === nextIndex) {
          // console.log("onKeyDown : 2.1");
          if (defaultAction) {
            defaultAction();
          }
        } else {
          // console.log("onKeyDown : 2.2");
          if (
            (validateInput && validateInput(index) === true) ||
            validateInput === null
          ) {
            // console.log("onKeyDown : 2.2.1");
            if (defaultAction) {
              defaultAction();
              if (focusNextCtrlOnDefaultAction === true) {
                form.elements[nextIndex].focus();
              }
            } else if (form) {
              form.elements[nextIndex].focus();
            }
          }
        }
      } else {
        console.log("onKeyDown : 3 : ", nextCtrlID);
        document.getElementById(nextCtrlID).focus();
      }
    }
  };

  return (props) => {
    return (
      <div className="ToastContainer">
        <CtToast
          {...props}
          notifyProcessing={notifyProcessing}
          updateProcessing={updateProcessing}
          closeUpdateProcessing={closeUpdateProcessing}
          toastErrorMsg={toastErrorMsg}
          toastMsg={toastMsg}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  };
};

export default HoCtToastContainer;
