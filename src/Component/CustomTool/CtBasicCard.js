import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class CtBasicCard extends Component {
  state = {
    defaultValue: {
      cardMinWidth: 275,
      cardMaxWidth: 200,
      contentMinHeight: 70,
      contentColor: "text.secondary"
    }
  }

  componentWillReceiveProps(newProps) {
    this.updateDefaultValue(newProps)
  }

  componentDidMount() {
    this.updateDefaultValue(this.props)
  }

  updateDefaultValue = (newProps) => {
    // console.log('newProps', newProps)
    // console.log('newProps.defaultValue', newProps.defaultValue)
    // console.log('this.isDataExist(newProps.defaultValue', this.isDataExist(newProps.defaultValue))
    if (this.isDataExist(newProps.defaultValue)) {
      // console.log('checking for defaultValue')
      let cardMinWidth = this.state.defaultValue.cardMinWidth,
        cardMaxWidth = this.state.defaultValue.cardMaxWidth,
        contentMinHeight = this.state.defaultValue.contentMinHeight,
        contentColor = this.state.defaultValue.contentColor
      try {
        if (this.isDataExist(newProps.defaultValue.cardMinWidth)) {
          cardMinWidth = newProps.defaultValue.cardMinWidth
        }
        if (this.isDataExist(newProps.defaultValue.cardMaxWidth)) {
          cardMaxWidth = newProps.defaultValue.cardMaxWidth
        }

        if (this.isDataExist(newProps.defaultValue.contentMinHeight)) {
          contentMinHeight = newProps.defaultValue.contentMinHeight
        }
        if (this.isDataExist(newProps.defaultValue.contentColor)) {
          contentColor = newProps.defaultValue.contentColor
        }
        // console.log('this.state.defaultValue before change', this.state.defaultValue)
        this.setState({ defaultValue: { ...this.state.defaultValue, cardMinWidth, cardMaxWidth, contentMinHeight, contentColor } }, () => {
          // console.log('this.state.defaultValue before change', this.state.defaultValue)
        })
      } catch (error) {
        console.log("Error", error)
      }
    }
  }

  isDataExist = (obj) => {
    if (obj !== undefined && obj !== null) {
      return true
    }
    return false
  }
  render() {
    return (
      <Card sx={{ minWidth: this.state.defaultValue.cardMinWidth, maxWidth: this.state.defaultValue.cardMaxWidth }} style={{ marginBottom: '15px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {this.props.title}
          </Typography>
          {this.props.ItemList1 ? this.props.ItemList1 : ''}
          {this.props.ItemList2 ? this.props.ItemList2 : ''}
          {this.props.ItemList3 ? this.props.ItemList3 : ''}

        </CardContent>
        <CardActions>
          {this.props.action ? this.props.action : ''}
        </CardActions>
      </Card>
    )
  }
}

export default CtBasicCard