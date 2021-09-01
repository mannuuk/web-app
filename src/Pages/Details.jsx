import React, { useState, useEffect } from "react";
import {makeStyles, Grid, Typography, AppBar, Toolbar, Card, CardContent, IconButton, Backdrop, CircularProgress
} from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';
import {
  detailUrl
} from "../Utils/required-functions";
import { useParams, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    "& .MuiToolbar-regular": {
      [theme.breakpoints.up('lg')]: {
        maxWidth: '1170px',
        width: "100%",
        margin: "0 auto",
        justifyContent: 'space-between'
      },
    }
  },
  gridCard: {
    "& b": {
      fontWeight: '700',
      color: '#444'
    },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: "16px"
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  customContainer: {
    width: "100%",
    maxWidth: "1170px",
    margin: "40px auto"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
},
}));
export default function Details() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [detailData, setDetailData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    try {
      axios.get(`${detailUrl}${params.id}`, {
      })
        .then((response) => {
          if (response.data.data) {
            setDetailData(response.data.data);
            setLoader(false);
          }
        }, (error) => {
          console.log(error);
          setLoader(false);
        });

    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }, [params.id]);

  return (
    <React.Fragment>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => history.push("/")}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              User Detail
            </Typography>
            <div className={classes.search}>

            </div>

          </Toolbar>
        </AppBar>
      </div>

      <Grid container className={classes.customContainer}>
        <Grid item md={12} lg={12} sm={12}>
          <Card className={classes.gridCard} variant="outlined">
            <CardContent>
              <Grid container spacing="3">
                <Grid item>
                  <div className={classes.profilePic}>
                    <img
                      className={classes.cover}
                      src={detailData && detailData.avatar}
                      alt="Live from space album cover"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <Typography className={classes.title} color="textSecondary" component="b">Name: </Typography>{`${detailData && detailData.first_name} ${detailData && detailData.last_name}`}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <Typography className={classes.title} color="textSecondary" component="b">Email: </Typography>{detailData && detailData.email}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={loader}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </React.Fragment>
  );
}
