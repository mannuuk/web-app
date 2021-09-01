import React from "react";
import {makeStyles,Grid,Typography,Avatar, Card, CardContent   
  } from "@material-ui/core";
  import {Link} from "react-router-dom";
  const useStyles = makeStyles((theme) => ({
    gridCardOuter:{
        textDecoration: 'none',
        "&:hover p":{
            color: 'orange'
        }
    },
    gridCard:{
        "& b":{
            fontWeight: '700',
            color: '#444'
        }
    },
    profilePic: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 0 15px',

        "& .MuiAvatar-root":{
            width: "100px",
            height: "100px"
        }
    }
  }));
export default function GridView({
    firstName, lastName, email, profileImg, id
}) {
    const classes = useStyles();

    
  return (
    <React.Fragment>
          <Grid item md={4} lg={4} sm={4}>
              <Link to={`/details/${id}`} className={classes.gridCardOuter}>
              
          <Card className={classes.gridCard} variant="outlined">
            <CardContent>
                <div className={classes.profilePic}>
                  <Avatar alt="Remy Sharp" src={profileImg} className={classes.large} />
                </div>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                <Typography className={classes.title} color="textSecondary" component="b">Name: </Typography>{`${firstName} ${lastName}`}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                <Typography className={classes.title} color="textSecondary" component="b">Email: </Typography>{email}
                </Typography>                                
                </CardContent>
            </Card>
            </Link>
          </Grid>
    </React.Fragment>
  );
}
