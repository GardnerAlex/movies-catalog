"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuTop = void 0;
const react_1 = require("react");
const styles_1 = require("@material-ui/core/styles");
const Button_1 = require("@material-ui/core/Button");
const Menu_1 = require("@material-ui/core/Menu");
const MenuItem_1 = require("@material-ui/core/MenuItem");
const ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
const ListItemText_1 = require("@material-ui/core/ListItemText");
const MovieFilter_1 = require("@material-ui/icons/MovieFilter");
const react_router_dom_1 = require("react-router-dom");
const apiDefaults_1 = require("../../api/apiDefaults");
const StyledMenu = styles_1.withStyles({
    paper: {
        border: '1px solid #d3d4d5'
    }
})((props) => (react_1.default.createElement(Menu_1.default, Object.assign({ elevation: 0, getContentAnchorEl: null, anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
    }, transformOrigin: {
        vertical: 'top',
        horizontal: 'center'
    } }, props))));
const StyledMenuItem = styles_1.withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white
            }
        }
    }
}))(MenuItem_1.default);
function MenuTop() {
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const genresItems = () => {
        const genres = [];
        Object.keys(apiDefaults_1.genresObj).map((genresItem) => {
            genres.push(react_1.default.createElement(react_router_dom_1.Link, { to: `/genres/${apiDefaults_1.genresObj[genresItem].charAt(0).toLowerCase()}${apiDefaults_1.genresObj[genresItem].slice(1)}`, key: genresItem },
                react_1.default.createElement(StyledMenuItem, { key: genresItem, onClick: handleClose },
                    react_1.default.createElement(ListItemIcon_1.default, null,
                        react_1.default.createElement(MovieFilter_1.default, { fontSize: "small" })),
                    react_1.default.createElement(ListItemText_1.default, { primary: apiDefaults_1.genresObj[genresItem] }))));
        });
        return genres;
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Button_1.default, { "aria-controls": "customized-menu", "aria-haspopup": "true", variant: "contained", color: "primary", onClick: handleClick }, "Genres"),
        react_1.default.createElement(StyledMenu, { id: "customized-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, genresItems())));
}
exports.MenuTop = MenuTop;
//# sourceMappingURL=MenuTop.js.map