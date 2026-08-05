import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { lighten, makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Edit } from '@mui/icons-material';
import AlertResponsiveDialog from './AlertResponsiveDialog'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

/* const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
})); */

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        numSelected, tableHeading,
        visibleApprove, visibleEdit, visibleDelete,
        handleApprove, handleEdit, handleDelete,
        selectedRows,
        approveLabel, deleteLabel,
        approveAlertLabelAgree, approveAlertLabelDisagree,
        deleteAlertLabelAgree, deleteAlertLabelDisagree,
        approveAlertTitleAction, deleteAlertTitleAction
    } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {tableHeading}
                    </Typography>
                )}

            {numSelected > 0 ? (
                (visibleApprove) ? (
                    <Tooltip title="Approve" >
                        <IconButton aria-label="Approve">
                            <AlertResponsiveDialog
                                label={approveLabel}
                                labelAgree={approveAlertLabelAgree}
                                labelDisagree={approveAlertLabelDisagree}
                                alertTitle={'Do you want to ' + approveAlertTitleAction + ' selected \'' + numSelected + '\' records?'}
                                alertMessage={selectedRows.map((id, index) => { return (<div>({index < 9 ? '0' : ''}{index + 1}) {id}</div>) })}
                                handleOnClickYes={handleApprove}
                                noOutLine={true}
                            />
                        </IconButton>
                    </Tooltip>
                ) : ('')
            ) : (null)}

            {numSelected > 0 ? (
                (visibleEdit) ? (
                    <Tooltip title="Edit" onClick={handleEdit}>
                        <IconButton aria-label="edit">
                            <Edit />
                        </IconButton>
                    </Tooltip>
                ) : ('')
            ) : (null)}

            {numSelected > 0 ? (
                (visibleDelete) ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <AlertResponsiveDialog
                                label={deleteLabel}
                                labelAgree={deleteAlertLabelAgree}
                                labelDisagree={deleteAlertLabelDisagree}
                                alertTitle={'Do you want to ' + deleteAlertTitleAction + ' selected \'' + numSelected + '\' records?'}
                                alertMessage={selectedRows.map((id, index) => { return (<div>({index < 9 ? '0' : ''}{index + 1}) {id}</div>) })}
                                handleOnClickYes={handleDelete}
                                noOutLine={true}
                            />
                        </IconButton>
                    </Tooltip>
                ) : ('')
            ) : (null)}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

/* const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
})); */

const ActionTableList = ({
    headCells, keyColumn, rows, tableHeading,
    visibleApprove, visibleEdit, visibleDelete,
    handleApprove, handleEdit, handleDelete,
    handleCheckedChange,
    approveLabel, deleteLabel,
    approveAlertLabelAgree, approveAlertLabelDisagree,
    deleteAlertLabelAgree, deleteAlertLabelDisagree,
    approveAlertTitleAction, deleteAlertTitleAction
}) => {
    // const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n[keyColumn]);
            handleCheckedChange(newSelecteds)
            setSelected(newSelecteds)
            return;
        }
        handleCheckedChange(null)
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        handleCheckedChange(newSelected)
        setSelected(newSelected)
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    tableHeading={tableHeading}
                    visibleApprove={visibleApprove}
                    visibleEdit={visibleEdit}
                    visibleDelete={visibleDelete}
                    handleApprove={handleApprove}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    selectedRows={selected}
                    approveLabel={approveLabel}
                    approveAlertLabelAgree={approveAlertLabelAgree}
                    approveAlertLabelDisagree={approveAlertLabelDisagree}
                    approveAlertTitleAction={approveAlertTitleAction}
                    deleteLabel={deleteLabel}
                    deleteAlertLabelAgree={deleteAlertLabelAgree}
                    deleteAlertLabelDisagree={deleteAlertLabelDisagree}
                    deleteAlertTitleAction={deleteAlertTitleAction}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row[keyColumn]);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row[keyColumn])}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row[keyColumn]}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>

                                            {
                                                headCells.map((col) =>
                                                    <TableCell
                                                        component={col.index === 1 ? 'th' : ''}
                                                        id={col.index === 1 ? labelId : ''}
                                                        scope={col.index === 1 ? 'row' : ''}
                                                        padding={col.index === 1 ? 'none' : ''}
                                                        align={'col.align'}
                                                    >
                                                        {row[col.id]}
                                                    </TableCell>)
                                            }
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}

export default ActionTableList