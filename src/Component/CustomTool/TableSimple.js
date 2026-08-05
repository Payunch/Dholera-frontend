import React, { Component } from 'react'
import { Grid, Table, TableBody, TableRow, TableCell } from '@mui/material';


export class TableSimple extends Component {
    render() {
        return (
            <Table>
                <TableBody>
                    {
                        this.props.rows && this.props.cols ?
                            this.props.rows.map((row) => {
                                return <TableRow>
                                    {
                                        this.props.cols.map((col) => {
                                            let cellStyle = { borderBottom: '0px', padding: '5px' }
                                            if (col.style) {
                                                if (col.style.paddingLeft) {
                                                    cellStyle.paddingLeft = col.style.paddingLeft
                                                }
                                                if (col.style.width) {
                                                    cellStyle.width = col.style.width
                                                }
                                            }
                                            return <TableCell style={cellStyle}>{row[col.id]}</TableCell>
                                        })
                                    }
                                </TableRow>
                            })
                            : ''
                    }
                </TableBody>
            </Table>
        )
    }
}

export default TableSimple