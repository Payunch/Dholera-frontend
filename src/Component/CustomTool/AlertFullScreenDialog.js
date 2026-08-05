import * from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import HoCtToastContainer from '../HOC/HoCtToastContainer'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [infoMsgDisplayedCount, setInfoMsgDisplayedCount] = React.useState(0)

    const handleClickOpen = () => {
        props.toastMsg('info', 'Press Esc to close full screen image slider')
        setOpen(true);
    };

    const handleClose = () => {
        setInfoMsgDisplayedCount(0)
        setOpen(false);
    };

    const displayMsg = () => {
        setInfoMsgDisplayedCount(1)
        props.toastMsg('info', 'Press Esc to close full screen image slider')
    }

    // if(infoMsgDisplayedCount===0 && open===true){
    //     displayMsg()
    // }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {props.body}
            </Dialog>
        </div>
    );
}
export default HoCtToastContainer(FullScreenDialog)