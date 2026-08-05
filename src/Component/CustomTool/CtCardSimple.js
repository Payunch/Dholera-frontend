import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const OutlinedCard = ({
  cardContent, cardBgColor, contentPaddingBottomZero,
  btnList, minHeightCardAction, minHeightCardContent, displayCardAction
}) => {
  const classes = useStyles();
  let cardActionStyle={
    backgroundColor:'#F5AD6D', 
    minHeight: minHeightCardAction && minHeightCardAction.length>0 ? minHeightCardAction : '50px'
  }

  let cardContentStyle={
    color: '#62350B',
    minHeight: minHeightCardContent && minHeightCardContent.length>0 ? minHeightCardContent : '50px'
  }

  if(contentPaddingBottomZero && contentPaddingBottomZero===true){
    cardContentStyle.paddingBottom='0px'
  }

  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={cardBgColor !== undefined ? { backgroundColor: cardBgColor } : { backgroundColor: '#F9CAA1' }}
    >
      <CardContent style={cardContentStyle}>
        {cardContent}
      </CardContent>
      {
        (displayCardAction === undefined || displayCardAction === true) ?
        <CardActions style={cardActionStyle}>
          {
            btnList ? btnList.map(btn => {
              return (
                <Button
                  size={btn.btnSize !== undefined ? btn.btnSize : "small"}
                  onClick={btn.handleOnBtnClick}
                  style={{color: '#62350B', minWidth: '0px'}}
                >
                  {btn.btnText}
                </Button>
              )
            }) : ''
          }
        </CardActions> : ''
      }
      
    </Card>
  );
}
export default OutlinedCard