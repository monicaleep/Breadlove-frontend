import React from 'react';
import {Card, CardActionArea, CardMedia, Typography, CardContent, CardActions, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const BreadBox = ({imageurl, name, commentCount, description}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="imageurl"
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Comment
        </Button>

      </CardActions>
    </Card>
  );
}



export default BreadBox;
