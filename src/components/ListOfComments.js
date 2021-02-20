import React from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const ListOfComments = ({ comments }) => {
  const classes = useStyles();
  return (
    <List>
      {comments.map((comment) => {
        return (
          <ListItem alignItems="flex-start" key={comment.id}>
            <ListItemText
              primary={comment.author}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.createdAt}
                  </Typography>
                  {comment.body}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListOfComments;
