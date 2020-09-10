"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const react_1 = require("react");
require("./Review.scss");
exports.Review = props => {
    const [expandedReview, setExpandedReview] = react_1.useState(false);
    const toggleReview = () => () => {
        setExpandedReview(!expandedReview);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !expandedReview && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "review-component" },
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null,
                        "By:",
                        props.review.author,
                        " "),
                    props.review.content)),
            react_1.default.createElement("span", { className: "mobile-review", onClick: toggleReview() }, "Show more..."))),
        expandedReview && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", { className: "review-expanded" },
                react_1.default.createElement("strong", null,
                    "By:",
                    props.review.author,
                    " "),
                props.review.content),
            react_1.default.createElement("span", { className: "mobile-review", onClick: toggleReview() }, "Show less...")))));
};
//# sourceMappingURL=Review.js.map