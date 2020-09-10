"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Constants_1 = require("../../constants/Constants");
const Review_1 = require("../../components/Review/Review");
require("./MovieDetailsMobile.scss");
class MovieDetailsMobile extends react_1.Component {
    render() {
        const { movieInfo, movieReviews } = this.props;
        let reviews;
        let otherReviews;
        if (movieReviews && movieReviews.length > 2) {
            const prevReviews = movieReviews.slice(0, 2);
            otherReviews = movieReviews.length - 2;
            reviews = prevReviews.map(review => {
                return (react_1.default.createElement(Review_1.default, { key: review.id, author: review.author, review: review }));
            });
        }
        else if (movieReviews && movieReviews.length < 2) {
            reviews = movieReviews.map(review => {
                return (react_1.default.createElement(Review_1.default, { key: review.id, author: review.author, review: review }));
            });
        }
        if (movieInfo) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("img", { className: "movie-details-backdrop", src: `${Constants_1.BASE_POSTER_PATH}/w500${movieInfo.poster_path}`, alt: "movie background" }),
                react_1.default.createElement("div", { className: "movie-details-info" },
                    react_1.default.createElement("div", { className: "movie-details-info__overview" },
                        react_1.default.createElement("strong", null, "Movie Overview:"),
                        " ",
                        movieInfo.overview),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("strong", null, "Release Date:"),
                        " ",
                        movieInfo.release_date),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("strong", null, "Average Rating:"),
                        " ",
                        movieInfo.vote_average)),
                reviews && reviews.length > 0 && (react_1.default.createElement("div", { className: "movie-details-reviews" },
                    react_1.default.createElement("strong", null, "Reviews:"),
                    reviews,
                    otherReviews && (react_1.default.createElement("p", null,
                        otherReviews,
                        " additional",
                        otherReviews === 1 ? ' review' : ' reviews',
                        " not shown here"))))));
        }
    }
}
exports.default = MovieDetailsMobile;
//# sourceMappingURL=MovieDetailsMobile.js.map