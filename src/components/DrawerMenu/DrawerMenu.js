"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawerMenu = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Divider_1 = require("@material-ui/core/Divider");
const List_1 = require("@material-ui/core/List");
const ListItem_1 = require("@material-ui/core/ListItem");
const ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
const ListItemText_1 = require("@material-ui/core/ListItemText");
const Mail_1 = require("@material-ui/icons/Mail");
const styles_1 = require("@material-ui/core/styles");
const Routes_1 = require("../../Routes/Routes");
const useStyles = styles_1.makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
}));
exports.DrawerMenu = (props) => {
    const classes = useStyles();
    const menuList = [];
    Routes_1.Routes.forEach((item) => {
        console.log('item path', item.path);
        if (item.toMenu === true) {
            menuList.push(react_1.default.createElement(react_router_dom_1.NavLink, { to: item.urlPath, style: { textDecoration: 'none' }, key: item.sidebarName },
                react_1.default.createElement(ListItem_1.default, { button: true, key: item.sidebarName, onClick: props.closeHandler },
                    react_1.default.createElement(ListItemIcon_1.default, null,
                        react_1.default.createElement(Mail_1.default, { fontSize: "small" })),
                    react_1.default.createElement(ListItemText_1.default, { primary: item.sidebarName }))));
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: classes.toolbar }),
        react_1.default.createElement(Divider_1.default, null),
        react_1.default.createElement(List_1.default, null, menuList),
        react_1.default.createElement(Divider_1.default, null)));
};
//# sourceMappingURL=DrawerMenu.js.map