"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = require("react");
const api_1 = require("../../api/api");
const Movie_1 = require("../Movie/Movie");
require("./App.css");
exports.App = () => {
    const [moviesData, setSignUpData] = react_1.useState([]);
    const [loading, setLoading] = react_1.useState(false);
    const [errorMessage, setErrorMessage] = react_1.useState(null);
    react_1.useEffect(() => {
        setLoading(true);
        api_1.fetchMovies()
            .then(jsonResponse => {
            setLoading(false);
            console.log(jsonResponse);
            setSignUpData(jsonResponse.Search);
        })
            .catch(err => setErrorMessage(err.toString()));
    }, []);
    return (react_1.default.createElement("div", { className: "wrapper" },
        react_1.default.createElement("h2", null,
            react_1.default.createElement("strong", null, "Movies")),
        react_1.default.createElement("div", { className: "cards" },
            loading
                && react_1.default.createElement("span", null, "loading..."),
            errorMessage
                && react_1.default.createElement("span", null, errorMessage),
            moviesData
                && moviesData.map((movie, index) => (react_1.default.createElement(Movie_1.default, { key: `${movie.imdbIDTitle}${index}`, movie: movie }))))));
};
//# sourceMappingURL=App.js.map