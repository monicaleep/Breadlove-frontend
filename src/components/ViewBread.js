import React, { useEffect, useState } from "react";
import { getOneBread, newComment } from "../services/bread.service.js";
import BreadBox from "./BreadBox";
import ListOfComments from "./ListOfComments";
import NotLoggedIn from "./common/NotLoggedIn";
import { getCurrentUser } from "../services/auth.service";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@material-ui/core";

const ViewBread = ({ match }) => {
  const user = getCurrentUser();
  const [bread, setBread] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({
    author: "",
    body: "",
  });

  const id = match.params.id;

  useEffect(() => {
    if (user && !comments) {
      getOneBread(id).then((res) => {
        setComments(res.data.comments);
        setBread(res.data);
        setLoading(false);
        console.log('useeffect')
      });
    }
  }, [user, comments, id]);

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleAddComment = () => {
    setOpen(false);
    newComment(id, comment)
      .then((res) => {
        console.log(res.data);
        setComments([...comments, res.data]);
        setComment({ author: "", body: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {!user ? (
        <NotLoggedIn />
      ) : (
        !loading && (
          <div>
            <BreadBox
              name={bread.name}
              imageurl={bread.imageurl}
              description={bread.description}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Add A Comment
            </Button>
            <Dialog
              open={open}
              onClose={handleClickOpen}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Leave A Comment</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Tell us what you think about {bread.name}
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="author"
                  label="Your name"
                  name="author"
                  type="text"
                  value={comment.author}
                  onChange={handleChange}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="body"
                  label="Your comment"
                  name="body"
                  type="text"
                  fullWidth
                  value={comment.body}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickOpen} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAddComment} color="primary">
                  Add Comment
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )
      )}
      {comments && (
        <div>
          <ListOfComments comments={comments} />
        </div>
      )}
    </div>
  );
};

export default ViewBread;
