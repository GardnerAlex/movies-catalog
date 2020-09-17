"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const React = require("react");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Grid_1 = require("@material-ui/core/Grid");
const styles_1 = require("@material-ui/core/styles");
const Button_1 = require("@material-ui/core/Button");
const Card_1 = require("@material-ui/core/Card");
const CardActions_1 = require("@material-ui/core/CardActions");
const CardContent_1 = require("@material-ui/core/CardContent");
const CardMedia_1 = require("@material-ui/core/CardMedia");
const Typography_1 = require("@material-ui/core/Typography");
const Container_1 = require("@material-ui/core/Container");
const Routes_1 = require("../../Routes/Routes");
const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const MOVIE_API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const useStyles = styles_1.makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2, 0, 1)
        }
    },
    heroTitle: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '2em'
        }
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        width: 280,
        flexDirection: 'column'
    },
    cardMedia: {},
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    },
    mainDescription: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
            variant: 'h2'
        }
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary
    }
}));
exports.HomePage = (match) => {
    const myName = 'MovieDetails';
    const history = react_router_dom_1.useHistory();
    console.log(myName);
    console.log('history', history);
    console.log(`${myName} match`, match);
    const classes = useStyles();
    const [movieData, setMovieData] = react_1.useState({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0
    });
    const [loading, setLoading] = react_1.useState(false);
    const [errorMessage, setErrorMessage] = react_1.useState(null);
    react_1.useEffect(() => {
        console.log('UseEffect fired', myName);
    }, [match.location.pathname]);
    const contentMain = () => {
        const contentMain = [];
        Routes_1.Routes.forEach((item) => {
            console.log('item path', item.path);
            if (item.toMenu === true && item.path !== '/') {
                contentMain.push(React.createElement(Grid_1.default, { className: classes.paper, key: item.path, item: true },
                    React.createElement(Card_1.default, { className: classes.card },
                        React.createElement(react_router_dom_1.Link, { to: item.path, key: item.path },
                            React.createElement(CardMedia_1.default, { component: "img", className: classes.cardMedia, src: item.image, title: item.sidebarName })),
                        React.createElement(CardContent_1.default, { className: classes.cardContent },
                            React.createElement(Typography_1.default, { gutterBottom: true, variant: "h4" }, item.sidebarName),
                            React.createElement(Typography_1.default, null, item.description)),
                        React.createElement(CardActions_1.default, null,
                            React.createElement(react_router_dom_1.Link, { to: item.path, key: item.path },
                                React.createElement(Button_1.default, { size: "small", color: "primary" }, "View all"))))));
            }
        });
        return contentMain;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("main", null,
            React.createElement("div", { className: classes.heroContent },
                React.createElement(Container_1.default, { maxWidth: "sm" },
                    React.createElement(Typography_1.default, { component: "h1", variant: "h2", className: classes.heroTitle, align: "center", color: "textPrimary" }, "Movies Catalog"),
                    React.createElement(Typography_1.default, { className: classes.mainDescription, variant: "h5", align: "center", color: "textSecondary", paragraph: true },
                        "Simple movies catalog, where you can discover new and trending movies, search movies by different conditions. There are also ",
                        React.createElement(react_router_dom_1.Link, { to: "/favorites" }, "Favorites"),
                        " and ",
                        React.createElement(react_router_dom_1.Link, { to: "watchlater" }, "Watch later"),
                        " functionality"))),
            React.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "lg" },
                React.createElement(Grid_1.default, { container: true, justify: "center", spacing: 2 }, contentMain())))));
};
//# sourceMappingURL=HomePage.js.map