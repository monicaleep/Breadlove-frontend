import { useEffect, useState } from "react";
import Header from "./Header";
import BreadBox from "./BreadBox";
import { getAllBread } from "../services/bread.service";
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles()
  const [breadData, setBreadData] = useState();
  useEffect(() => {
    getAllBread().then((res) => {
      setBreadData(res.data.breads);
    });
  }, []);

  const display = () => {
    return (
      breadData &&
      breadData.map((bread) => {
        return (
          <Grid item xs={3} key={bread.id}>
          <BreadBox
            name={bread.name}
            imageurl={bread.imageurl}
            className={classes.paper}
            description={bread.description}
            id={bread.id}
            commentCount={bread.commentCount}
          />
          </Grid>
        );
      })
    );
  };

  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={3}>{display()}</Grid>
    </div>
  );
};

export default Home;
