import React, { useState, useEffect } from "react";
import {
    makeStyles, alpha, Grid, Typography, AppBar, Toolbar, Button, InputBase, Backdrop, CircularProgress 
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import GridView from '../Components/GridView';
import ListView from '../Components/ListView'
import axios from 'axios';
import {url} from "../Utils/required-functions";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            "& .MuiAppBar-colorPrimary":{
                padding: '10px 0',
            },
        },
        "& .MuiToolbar-regular": {
            [theme.breakpoints.up('lg')]: {
                maxWidth: '1170px',
                width: "100%",
                margin: "0 auto",
                padding: "0 10px"
            },
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column'
            },
        }
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 14px',
        },
        [theme.breakpoints.down('xs')]: {
            margin: 0,
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    customBtn: {
        textTransform: 'capitalize',
        background: '#fff',
        color: '#111',
        margin: '0 0 0 20px',

        "&:hover": {
            background: '#fff',
            opacity: '0.9'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
        }
    },
    customContainer: {
        width: "100%",
        maxWidth: "1170px",
        margin: "40px auto",
        padding: "0 10px"
    },
    activeBtn: {
        textTransform: 'capitalize',
        background: '#333',
        color: '#fff',
        margin: '0 0 0 20px',

        "&:hover": {
            background: '#333',
            opacity: '0.9'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    mobileWrapTopBar:{
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            margin: '0 0 10px',
        },
        '& .MuiTypography-h6':{
            display: 'block!important'
        }
    }
}));
export default function Home() {
    const classes = useStyles();
    const [listData, setListData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState("");
    const [gridView, setGridView] = useState(true);
    const [listView, setListView] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        try {
            axios.get(`${url}`, {
            })
                .then((response) => {
                    if (response.data.data) {
                        setListData(response.data.data);
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
    }, [])

    useEffect(() => {
        setFilterData(
            listData && listData.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, listData]);


    return (
        <React.Fragment>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.mobileWrapTopBar}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            User
                        </Typography>
                        <div className={classes.mobileBtnWrap}>
                        <Button aria-label="show 4 new mails" color="inherit" className={gridView === true ? classes.activeBtn : classes.customBtn}
                                onClick={() => {
                                    setListView(false);
                                    setGridView(true)
                                }}>
                                <AppsOutlinedIcon />
                                Grid View
                            </Button>
                            <Button aria-label="show 17 new notifications" color="inherit" className={listView === true ? classes.activeBtn : classes.customBtn}
                                onClick={() => {
                                    setListView(true);
                                    setGridView(false)
                                }}>
                                <ListOutlinedIcon />
                                List View
                            </Button>
                        </div>
                        </div>
                        <Typography className={classes.title} variant="h6" noWrap>
                            User
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search By First Name"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Button aria-label="show 4 new mails" color="inherit" className={gridView === true ? classes.activeBtn : classes.customBtn}
                                onClick={() => {
                                    setListView(false);
                                    setGridView(true)
                                }}>
                                <AppsOutlinedIcon />
                                Grid View
                            </Button>
                            <Button aria-label="show 17 new notifications" color="inherit" className={listView === true ? classes.activeBtn : classes.customBtn}
                                onClick={() => {
                                    setListView(true);
                                    setGridView(false)
                                }}>
                                <ListOutlinedIcon />
                                List View
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <Grid container className={classes.customContainer}>
                <Grid
                    container
                    direction="row"
                    spacing={2}
                >
                    {filterData && filterData.map((item, index) => {
                        if (gridView) {
                            return (
                                <GridView key={index}
                                    firstName={item.first_name}
                                    lastName={item.last_name}
                                    email={item.email}
                                    profileImg={item.avatar}
                                    id={item.id}
                                />
                            );
                        }
                        if (listView) {
                            return (
                                <ListView key={index}
                                    firstName={item.first_name}
                                    lastName={item.last_name}
                                    email={item.email}
                                    profileImg={item.avatar}
                                    id={item.id}
                                />
                            );
                        }

                    })
                    }
                   {filterData.length === 0 &&
                        <Grid item sm={12} md={12} lg={12}>
                            <Alert severity="error">No Data Found</Alert>
                        </Grid>
                    }
                </Grid>
                
            </Grid>
        <Backdrop className={classes.backdrop} open={loader}>
            <CircularProgress color="inherit" />
        </Backdrop>
        </React.Fragment>
    );
}
