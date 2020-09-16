"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieDetails = void 0;
const React = require("react");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Grid_1 = require("@material-ui/core/Grid");
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/core/styles");
const api_1 = require("../../api/api");
const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const MOVIE_API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'right',
        color: theme.palette.text.secondary
    },
    control: {
        padding: theme.spacing(2)
    },
    mainGrid: {
        marginTop: theme.spacing(3)
    },
    progress: {
        margin: theme.spacing(2)
    }
}));
exports.MovieDetails = (match) => {
    const myName = 'MovieDetails';
    const history = react_router_dom_1.useHistory();
    console.log(myName);
    console.log('history', history);
    console.log(`${myName} match`, match);
    console.log(`${myName} match.match.params.id`, match.match.params.id.split('_')[0]);
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
        setLoading(true);
        setMovieData({
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0
        });
        api_1.fetchMoviesDetails({ queryType: 'movie_details', movieId: match.match.params.id.split('_')[0] })
            .then(res => {
            console.log(`${myName} Axios resp`, res);
            setMovieData(res.data);
            setLoading(false);
        })
            .catch((err) => {
            setErrorMessage(err.toString());
            setLoading(false);
        });
    }, [match.location.pathname]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Grid_1.default, { container: true, className: classes.root, spacing: 3 },
            React.createElement(Grid_1.default, { item: true, xs: 12 },
                React.createElement(Grid_1.default, { container: true, justify: "center", spacing: 2 },
                    loading
                        && React.createElement(core_1.CircularProgress, { className: classes.progress }),
                    errorMessage
                        && React.createElement("span", null, errorMessage),
                    movieData
                        && (React.createElement("span", null,
                            "TITLE HERE",
                            JSON.stringify(movieData))))))));
};
//# sourceMappingURL=MovieDetails.js.map