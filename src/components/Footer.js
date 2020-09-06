"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const react_1 = require("react");
const styles_1 = require("@material-ui/core/styles");
const Container_1 = require("@material-ui/core/Container");
const Typography_1 = require("@material-ui/core/Typography");
const Link_1 = require("@material-ui/core/Link");
function Copyright() {
    return (react_1.default.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", align: "center" },
        'Copyright © ',
        react_1.default.createElement(Link_1.default, { color: "inherit", href: "https://material-ui.com/" }, "Movies Library"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
const useStyles = styles_1.makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        padding: theme.spacing(6, 0)
    }
}));
function Footer(props) {
    const classes = useStyles();
    const { description, title } = props;
    return (react_1.default.createElement("footer", { className: classes.footer },
        react_1.default.createElement(Container_1.default, null,
            react_1.default.createElement(Typography_1.default, { variant: "h6", align: "center", gutterBottom: true }, title),
            react_1.default.createElement(Typography_1.default, { variant: "subtitle1", color: "inherit", align: "center", component: "p" }, description),
            react_1.default.createElement(Copyright, null))));
}
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map