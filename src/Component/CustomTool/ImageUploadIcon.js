import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import { PhotoCamera, Close, Publish, DeleteForever } from '@mui/icons-material';
import { imageUpload, removeImage, imageBackEndBaseURL, imageFrontEndBaseURL } from '../API'
import CircularProgress from '@mui/material/CircularProgress'
import { Card, CardActionArea, CardActions, Box } from '@mui/material';
//import HoCtToastContainer from '../HOC/HoCtToastContainer'
import AlertResponsiveDialog from "./AlertResponsiveDialog";


class BtnUploadIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    state = {
        display: 'true',
        default: '',
        showDeleteIcon: false,
        alertRemoveImgConfirmation: null,
        image: {
            name: '',
            location: '',
            fullPath: '',
        },
        fixFileName: '',
        resetDefaultImage: false,
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            fixFileName: newProps.fixFileName,
            image: {
                ...this.state.image,
                name: newProps.curImageName,
                location: newProps.curImageLocation,
                fullPath: newProps.curImageFullPath
            },
            default: newProps.default,
            resetDefaultImage: newProps.resetDefaultImage,
        })
    }

    componentDidMount() {
        this.setDisplay(true, false)
        this.setState({
            fixFileName: this.props.fixFileName,
            image: {
                ...this.state.image,
                name: this.props.curImageName,
                location: this.props.curImageLocation,
                fullPath: this.props.curImageFullPath
            },
            resetDefaultImage: this.props.resetDefaultImage
        })
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.uploadImage()
    }

    uploadImage = () => {
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        let fixFileName = ''
        if (this.state.fixFileName && this.state.fixFileName.length > 0) {
            fixFileName = this.state.fixFileName
        }
        let uploadLocation = imageBackEndBaseURL()
        if (this.props.uploadLocation && this.props.uploadLocation.length > 0) {
            uploadLocation += this.props.uploadLocation + "/"
        }
        const config = { headers: { 'content-type': 'multipart/form-data' } }
        formData.append('fixFileName', fixFileName)
        formData.append('uploadLocation', uploadLocation)
        formData.append('Op', 'UploadImage')
        imageUpload(formData, config)
            .then((res) => {
                //# displayFileUploadedMsg=false if want to complete OTP Verification or other Process Holding Work
                if (this.props.displayFileUploadedMsg === undefined ||
                    (this.props.displayFileUploadedMsg && this.props.displayFileUploadedMsg === true)) {
                    this.props.toastMsg(res.data.msgType, res.data.message)
                }
                if (res.data.msgType === 'success') {
                    // # alert("The file is successfully uploaded");
                    const name = res.data.imageName
                    const location = res.data.imageLocation
                    const fullPath = imageFrontEndBaseURL() + res.data.imageFullPath
                    this.setState({
                        image: { ...this.state.image, name, location, fullPath }
                    })
                    if (this.props.notResetImageOnUpload && this.props.notResetImageOnUpload === true) {
                    } else {
                        this.clearImageInfo()
                    }
                    if (this.props.onCurImageChange) {
                        // # Change fix link by dynamic link
                        this.props.onCurImageChange(name, location, fullPath)
                        // this.props.onCurImageChange(imageFrontEndBaseURL() + res.data.imageFullPath)
                    }
                }
                this.setDisplay()
            }).catch((error) => {
                this.props.toastMsg('error', error)
            });
    }

    clearImageInfo = () => {
        this.setState({ file: '', imagePreviewUrl: '' })
        document.getElementById(this.props.id + '_file').value = ''
    }

    setDisplay = (resetDisplay = false, clearImage = true) => {
        let display = this.state.display === 'none' ? 'true' : 'none'
        if (resetDisplay) {
            display = 'true'
            if (clearImage) {
                this.clearImageInfo()
            }
        }
        this.setState({ display })
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader()
        let file = e.target.files[0]
        if (file) {
            let changeImage = true
            if (this.props.maxSizeInKB !== undefined && this.props.maxSizeInKB > 0) {
                const fsize = Math.round((file.size / 1024))
                if (fsize > this.props.maxSizeInKB) {
                    changeImage = false
                    this.props.toastErrorMsg('Image size must be less or equal to ' + this.props.maxSizeInKB + ' kb only.')
                }
            }

            if (changeImage) {
                this.setDisplay();
                reader.onloadend = () => {
                    this.setState({
                        file: file,
                        imagePreviewUrl: reader.result
                    });
                }

                reader.readAsDataURL(file)
            }

        } else {
            this.clearImageInfo()
        }
    }

    confirmRemoveImage = (ImagePreview, size) => {
        this.setState({ alertRemoveImgConfirmation: null }, () => {
            const alertRemoveImgConfirmation = <AlertResponsiveDialog
                label='Image Remove Confirmation'
                labelAgree='Remove Image'
                labelDisagree='Cancel'
                alertTitle='Do you want to remove image?'
                alertMessage={<center><img src={ImagePreview} style={size} /></center>}
                handleOnClickYes={this.executeRemoveImage}
                defaultOpenDialog={true}
            />
            this.setState({ alertRemoveImgConfirmation })
        })
    }

    executeRemoveImage = () => {
        if (this.props.removeImage) {
            this.props.removeImage()
        } else {
            this.removeImage()
        }
    }

    removeImage = () => {
        const formData = new FormData();
        formData.append('Op', 'RemoveImage')
        formData.append('imageFullPath', this.state.image.location + this.state.image.name)
        removeImage(formData)
            .then(res => {
                //# displayFileUploadedMsg=false if want to complete OTP Verification or other Process Holding Work
                if (this.props.displayFileUploadedMsg === undefined ||
                    (this.props.displayFileUploadedMsg && this.props.displayFileUploadedMsg === true)) {
                    this.props.toastMsg(res.data.msgType, res.data.message)
                }
                if (res.data.msgType === 'success' || res.data.message === 'No File Exists To Remove') {
                    const name = ''
                    const location = ''
                    const fullPath = ''
                    this.setState({
                        image: { ...this.state.image, name, location, fullPath }
                    }, () => {
                        this.clearImageInfo()
                        if (this.props.onCurImageChange) {
                            this.props.onCurImageChange(name, location, fullPath, true)
                        }
                    })
                }
            }).catch((error) => {
                this.props.toastMsg('error', error)
            })
    }

    getDisabledDeleteIcon = () => {
        return (
            this.state.image === undefined ||
                this.state.image.fullPath === undefined ||
                this.state.image.fullPath.length === 0 ? true : false
        )
    }

    handleOnClick = (e) => {
        if (this.props.changeImagePreValidation === undefined || (
            this.props.changeImagePreValidation !== undefined &&
            this.props.changeImagePreValidation() === true
        )) {
        } else {
            e.preventDefault()
        }
    }

    resetDefaultImage = () => {
        this.props.handleOnResetDefaultImage()
        this.clearImageInfo()
    }

    render() {

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        let showDeleteIcon = false;
        let disabledDeleteIcon = false;

        const defWidth = '250px'
        const defHeight = '200px'
        const size = this.props.width && this.props.width > 0 && this.props.height && this.props.height > 0 ?
            ({ width: this.props.width + 'px', height: this.props.height + 'px' }) : (
                this.props.width && this.props.width > 0 ? (
                    { width: this.props.width + 'px', height: defHeight }
                ) : (
                    this.props.width && this.props.width > 0 ? (
                        { width: defWidth, height: this.props.height + 'px' }
                    ) : ({ width: defWidth, height: defHeight })
                )
            )
        const maxWidth = this.props.width && this.props.width > 0 ?
            ({ maxWidth: this.props.width + 'px' }) : ({ maxWidth: defWidth })

        const disableAction = this.props.disableAction && this.props.disableAction === true ? true : false

        showDeleteIcon = this.props.showDeleteIcon && this.props.showDeleteIcon === true && (
            $imagePreview !== this.props.default &&
            (this.state.display === undefined || (this.state.display && this.state.display === 'true')))

        if (imagePreviewUrl) {
            $imagePreview = imagePreviewUrl
        } else if (this.props.curImageFullPath && this.props.curImageFullPath.length > 0) {
            $imagePreview = this.props.curImageFullPath
        } else {
            $imagePreview = this.props.default
        }

        if (this.props.handleOnResetDefaultImage &&
            this.state.resetDefaultImage &&
            this.state.resetDefaultImage === true) {
            this.resetDefaultImage()
        }

        return (
            <div>
                <form id={this.props.id + '_form'} onSubmit={this._handleSubmit}>
                    <Card style={maxWidth} disabled={true}>
                        <CardActionArea>
                            <img id={this.props.id + '_img'} src={$imagePreview} style={size} />
                        </CardActionArea>
                        <CardActions
                            style={disableAction === true ? { display: 'none' } : { display: 'inline-block' }}
                        >
                            <div style={{ display: 'none' }}>
                                <input
                                    accept="image/*"
                                    id={this.props.id + '_file'}
                                    type="file"
                                    onChange={this._handleImageChange}
                                />
                            </div>
                            <label htmlFor={this.props.id + '_file'}>
                                <IconButton
                                    id={this.props.btnUploadID}
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    style={this.state.display && this.state.display === 'none' ? { display: 'none' } : { display: 'inline-block' }}
                                    onClick={this.handleOnClick}
                                >
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <CircularProgress color="secondary" style={this.state.display && this.state.display === 'true' ? { display: 'none' } : { display: 'inline-block' }} />
                            <IconButton
                                color="primary" aria-label="upload picture" component="span"
                                onClick={() => { this.setDisplay(true) }}
                                style={this.state.display && this.state.display === 'true' ? { display: 'none' } : { display: 'inline-block' }}
                            >
                                <Close />
                            </IconButton>
                            <IconButton
                                color="primary" aria-label="upload picture" component="span"
                                onClick={this.uploadImage}
                                style={this.state.display && this.state.display === 'true' ? { display: 'none' } : { display: 'inline-block' }}
                            >
                                <Publish />
                            </IconButton>
                            <IconButton
                                color="secondary" aria-label="upload picture" component="span"
                                onClick={() => { this.confirmRemoveImage($imagePreview, size) }}
                                style={
                                    (showDeleteIcon) ?
                                        { display: 'inline-block' } : { display: 'none' }
                                }
                                disabled={
                                    this.state.image &&
                                        this.state.image.fullPath &&
                                        this.state.image.fullPath.length > 0 && (
                                            this.state.image.fullPath !== this.state.default
                                        ) ? false : true}
                            >
                                <DeleteForever />
                            </IconButton>
                        </CardActions>
                    </Card>
                </form>
                <Box display={{ xs: 'none' }} style={{ textAlign: 'right' }}>
                    {this.state.alertRemoveImgConfirmation}
                </Box>
            </div>
        );
    }
}
// export default HoCtToastContainer(BtnUploadIcon)
export default BtnUploadIcon