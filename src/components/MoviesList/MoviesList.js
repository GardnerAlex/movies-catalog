"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesList = void 0;
const React = require("react");
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const Grid_1 = require("@material-ui/core/Grid");
const styles_1 = require("@material-ui/core/styles");
const Typography_1 = require("@material-ui/core/Typography");
const lab_1 = require("@material-ui/lab");
const react_router_dom_1 = require("react-router-dom");
const api_1 = require("../../api/api");
const Movie_1 = require("../Movie/Movie");
const queryString = require('query-string');
const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({
    root: {
        flexGrow: 1,
        flexWrap: 'wrap'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    progress: {
        margin: theme.spacing(4)
    }
}));
exports.MoviesList = (match) => {
    const history = react_router_dom_1.useHistory();
    const [moviesData, setMoviesData] = react_1.useState({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0
    });
    const [loading, setLoading] = react_1.useState(false);
    const [errorMessage, setErrorMessage] = react_1.useState(null);
    const [pageNumPagination, setPageNumPagination] = react_1.useState(1);
    const location = match.location.pathname.split('/')[1];
    const numCheck = new RegExp('^[0-9]+$');
    const classes = useStyles();
    const myName = 'MoviesList';
    let pageTitle = 'Main page';
    if (location !== undefined) {
        pageTitle = `${location.charAt(0).toUpperCase()}${location.slice(1)} Movies`;
        if (location === 'genres') {
            pageTitle = `${match.match.params.genreTitle.charAt(0).toUpperCase()}${match.match.params.genreTitle.slice(1)} Movies`;
        }
    }
    let pageNum;
    const pageNumParsed = queryString.parse(match.location.search).page;
    if (numCheck.test(pageNumParsed) === true) {
        pageNum = Number.parseInt(pageNumParsed, 10);
        if (pageNum !== pageNumPagination) {
            setPageNumPagination(pageNum);
        }
    }
    react_1.useEffect(() => {
        console.log(`UseEffect fired on page ${myName} `);
        setLoading(true);
        setMoviesData({
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0
        });
        api_1.fetchMoviesDetails(Object.assign({ queryType: location, pageId: pageNum }, match.match.params))
            .then(res => {
            console.log(`${location} Axios resp`, res);
            setMoviesData(res.data);
            setLoading(false);
        })
            .catch((err) => {
            setErrorMessage(err.toString());
            setLoading(false);
        });
    }, [history.location]);
    const handlePageChange = (event, value) => {
        const query = queryString.parse(match.location.search);
        query.page = value;
        history.push(`${location}?${queryString.stringify(query)}`);
    };
    const pagination = () => {
        if (moviesData.total_pages !== undefined && moviesData.total_pages > 0) {
            return React.createElement(lab_1.Pagination, { count: moviesData.total_pages, page: pageNumPagination, color: "primary", onChange: handlePageChange });
        }
        return null;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.Container, null,
            React.createElement(Typography_1.default, { variant: "h4", component: "h1" }, pageTitle)),
        React.createElement(Grid_1.default, { container: true, justify: "center", spacing: 2 },
            loading
                && React.createElement(core_1.CircularProgress, { className: classes.progress }),
            errorMessage
                && React.createElement("span", null, errorMessage),
            moviesData
                && moviesData.results.map((movie) => (React.createElement(Grid_1.default, { className: classes.paper, key: `${movie.poster_path}`, item: true },
                    React.createElement(Movie_1.Movie, { movie: movie })))),
            moviesData && !loading
                && pagination())));
};
//# sourceMappingURL=MoviesList.js.map