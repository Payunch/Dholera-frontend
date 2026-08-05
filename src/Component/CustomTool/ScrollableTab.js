import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

class ScrollableTab extends React.Component {
    // const[value, setValue] = React.useState(0);
    state = {
        value: 0,
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    render() {
        return (
            <div style={{ flexGrow: 1, width: '100%' }}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {
                            this.props.Tabs.map((tab, index) => {
                                return (
                                    <Tab label={tab.label} {...a11yProps(index)} />
                                )
                            })
                        }
                    </Tabs>
                </AppBar>
                {
                    this.props.Tabs.map((tab, index) => {
                        return (
                            <TabPanel value={this.state.value} index={index}>
                                {tab.panel}
                            </TabPanel>
                        )
                    })
                }
            </div>
        );
    }
}

export default ScrollableTab