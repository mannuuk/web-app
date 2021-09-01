import React from "react";
import {makeStyles, Grid, Typography, Card, CardContent
} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    gridCardOuter: {
        textDecoration: 'none',
        "&:hover p": {
            color: 'orange'
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
    }
}));
export default function ListView({
    firstName, lastName, email, id, profileImg
}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid item md={12} lg={12} sm={12}>
                <Link to={`/details/${id}`} className={classes.gridCardOuter}>
                    <Card className={classes.gridCard} variant="outlined">
                        <CardContent>
                            <Grid container spacing="3">
                                <Grid item>
                                    <div className={classes.profilePic}>
                                        <img
                                            className={classes.cover}
                                            src={profileImg}
                                            alt="Live from space album cover"
                                        />
                                    </div>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        <Typography className={classes.title} color="textSecondary" component="b">Name: </Typography>{`${firstName} ${lastName}`}
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        <Typography className={classes.title} color="textSecondary" component="b">Email: </Typography>{email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
        </React.Fragment>
    );
}
