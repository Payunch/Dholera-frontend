import React, { useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Button, Tooltip, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Edit, Delete, Print, Label, Upgrade } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MaterialTable from "./MaterialTable";
import MobileTable from "./MobileTable";

const CtART = ({
  id,
  columnsdata,
  rowsdata,
  rowsPerPage,
  tblmaxHeight,
  csvFileName,
  tableButtonAction,
  rowIconAction,
  showColumnFilters,
  hideColIdList,
  actionColSize,
  density,
  cust_filters,
  enableRowSelection,
  rowSelectionAction,
  rowSelectionActionBtnColor,
  hideBottomToolbar,
}) => {
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item className="DesktopTable">
          <MaterialTable
            rowsdata={rowsdata}
            columnsdata={columnsdata}
            rowsPerPage={rowsPerPage}
            tblmaxHeight={tblmaxHeight}
            csvFileName={csvFileName}
            rowIconAction={rowIconAction}
            showColumnFilters={showColumnFilters}
            actionColSize={actionColSize}
            density={density}
            hideColIdList={hideColIdList}
            tableButtonAction={tableButtonAction}
            enableRowSelection={enableRowSelection}
            cust_filters={cust_filters}
            rowSelectionAction={rowSelectionAction}
            rowSelectionActionBtnColor={rowSelectionActionBtnColor}
            hideBottomToolbar={hideBottomToolbar}
          />
        </Grid>
        <Grid item className="MobileTable">
          <MobileTable
            rowsData={rowsdata}
            columnData={columnsdata}
            //   handleARDonActionClick_Edit={this.handleARDonActionClick_Edit}
            //   handleARDonActionClick_Delete={this.handleARDonActionClick_Delete}
            // editEnable={false}
            // deleteEnable={false}
            csvFileName={csvFileName}
            tableButtonAction={tableButtonAction}
            rowIconAction={rowIconAction}
            hideColIdList={hideColIdList}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CtART;
