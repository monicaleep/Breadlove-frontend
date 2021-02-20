import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  action: {
    cursor: "default",
  },
});
const BreadBox = ({ imageurl, name, commentCount, description, id }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.action}>
        <CardMedia className={classes.media} image={imageurl} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {commentCount && (
        <CardActions>
          <Link component={RouterLink} to={`/bread/${id}`}>
            <Button size="small" color="primary">
              {`${commentCount} Comment${
                commentCount > 1 || commentCount === "0" ? "s" : ""
              }`}
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
};

export default BreadBox;
