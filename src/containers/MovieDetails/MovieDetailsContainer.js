"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_last_location_1 = require("react-router-last-location");
const movieAPI_1 = require("../../services/movieAPI");
const MovieDetails_1 = require("./MovieDetails");
require("./MovieDetailsContainer.scss");
class MovieDetailsContainer extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            movieInfo: null,
            movieReviews: null,
            loading: true,
            error: true
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.match.params.id) {
                try {
                    const movieInfo = yield movieAPI_1.getMovieDetailsById(this.props.match.params.id);
                    const movieReviews = yield movieAPI_1.getMovieReviews(this.props.match.params.id);
                    this.setState({
                        loading: false,
                        movieInfo,
                        movieReviews,
                        error: false
                    });
                }
                catch (err) {
                    this.setState({ loading: false, error: true });
                }
            }
        });
    }
    render() {
        const { movieInfo, loading, movieReviews, error } = this.state;
        let pathname;
        if (this.props.lastLocation === null) {
            pathname = '/';
        }
        else {
            pathname = this.props.lastLocation.pathname;
        }
        let movieDetails = null;
        if (error) {
            movieDetails = (react_1.default.createElement("h3", null, "Woops, something went wrong trying to fetch movie details."));
        }
        if (loading) {
            movieDetails = (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h1", null, "Movie Details"),
                react_1.default.createElement("h3", null, "Loading movie details now...")));
        }
        if (!loading && movieInfo) {
            movieDetails = (react_1.default.createElement("div", { className: "movie-details-wrapper" },
                react_1.default.createElement("div", { className: "movie-details-title" },
                    react_1.default.createElement("i", { className: "fa fa-chevron-left", onClick: () => this.props.history.push(`${pathname}`), "aria-hidden": "true" }),
                    react_1.default.createElement("h1", null, movieInfo.title)),
                react_1.default.createElement(MovieDetails_1.MovieDetails, { pathname: pathname, movieInfo: movieInfo, movieReviews: movieReviews })));
        }
        return react_1.default.createElement(react_1.default.Fragment, null, movieDetails);
    }
}
exports.default = react_router_last_location_1.withLastLocation(MovieDetailsContainer);
//# sourceMappingURL=MovieDetailsContainer.js.map