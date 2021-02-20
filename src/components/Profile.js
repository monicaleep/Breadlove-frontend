import React, { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../services/auth.service";
import { getProfile, deleteProfile } from "../services/user.service";
import { deleteBread } from "../services/bread.service";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import NotLoggedIn from "./common/NotLoggedIn";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
const useStyles = makeStyles({
  icon: {
    cursor: "pointer",
  },
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
      <div className="container">
        <h3 className="text-center">
          <strong>{data.name}</strong>
        </h3>
        <header className="jumbotron">
          <p>
            <span className="orange-bold">Email Address:</span>
            {data.email}
          </p>
          <hr />
          <form onSubmit={deleteUser}>
            <button className="btn delete-btn">Delete Account</button>
          </form>
        </header>
        <h2 className="orange-bold">Your Baked Goods:</h2>
        {bread ? (
          <div className="container">
            {bread.map((bg) => {
              return (
                <div key={bg.id}>
                  <Link
                    component={RouterLink}
                    to={{ pathname: `/bread/${bg.id}` }}
                  >
                    <div className="row align-items-center justify-content-start">
                      <div className="col-3">
                        <h3 className="orange-bold">{bg.name}</h3>
                      </div>
                    </div>
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
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <div className="container">
          <Link to="/bread/new" className="" component={RouterLink}>
            <div>
              <div>
                <h4>Add a baked good to share!</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return display();
};

export default Profile;
