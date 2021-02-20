import React, { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../services/auth.service";
import { getProfile, deleteProfile } from "../services/user.service";
import { deleteBread } from "../services/bread.service";
import { Link as RouterLink } from "react-router-dom";
import { Link , Container, Button, Typography } from "@material-ui/core";
import NotLoggedIn from "./common/NotLoggedIn";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
const useStyles = makeStyles({
  icon: {
    cursor: "pointer",
  },
  breaditem: {
    display: 'flex',
    alignItens: 'center',
    justifyContent: 'space-evenly'
  }
});

const Profile = ({ history }) => {
  const classes = useStyles();

  const [currentUser] = useState(getCurrentUser()); // from the header info
  const [data, setData] = useState({});
  const [bread, setBread] = useState();

  useEffect(() => {
    if (currentUser) {
      getProfile()
        .then((response) => {
          setData(response.data);
          if (response.data.bread) {
            setBread(response.data.bread);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  const handleDelete = (id) => {
    deleteBread(id)
      .then((res) => {
        setBread(bread.filter((bg) => bg.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = () => {
    deleteProfile()
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
    logout();
    history.push("/signup");
    window.location.reload();
  };

  const display = () => {
    return !currentUser ? (
      <NotLoggedIn />
    ) : (
      <Container>
        <Container>
          <Typography variant="h3">
            Hello, {data.name}
          </Typography>
          <p>
            <span className="orange-bold">Email Address: </span>
            {data.email}
          </p>
          <hr />
          <form onSubmit={deleteUser}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}>
              Delete Account
            </Button>
          </form>
          <Link to="/bread/new" className="" component={RouterLink}>
                <Button>Add a baked good to share!</Button>
          </Link>
        </Container>
        {bread ? (
          <Container maxWidth="sm">
            <Typography variant={'h4'} className="orange-bold">Your Baked Goods:</Typography>
            {bread.map((bg) => {
              return (
                <Container className={classes.breaditem} key={bg.id}>
                  <Link
                    component={RouterLink}
                    to={{ pathname: `/bread/${bg.id}` }}
                  >

                        <h3 className="orange-bold">{bg.name}</h3>

                  </Link>
                  <DeleteIcon
                    className={classes.icon}
                    onClick={() => handleDelete(bg.id)}
                  />
                  <Link
                    component={RouterLink}
                    to={{ pathname: `/bread/${bg.id}/edit` }}
                  >
                    <CreateIcon />
                  </Link>
                </Container>
              );
            })}
          </Container>
        ) : (
          <></>
        )}



      </Container>
    );
  };

  return display();
};

export default Profile;
