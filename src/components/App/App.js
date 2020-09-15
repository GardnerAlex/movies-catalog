"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = require("react");
const AppBar_1 = require("@material-ui/core/AppBar");
const CssBaseline_1 = require("@material-ui/core/CssBaseline");
const Drawer_1 = require("@material-ui/core/Drawer");
const Hidden_1 = require("@material-ui/core/Hidden");
const IconButton_1 = require("@material-ui/core/IconButton");
const Menu_1 = require("@material-ui/icons/Menu");
const Toolbar_1 = require("@material-ui/core/Toolbar");
const Typography_1 = require("@material-ui/core/Typography");
const styles_1 = require("@material-ui/core/styles");
const Grid_1 = require("@material-ui/core/Grid");
const react_router_dom_1 = require("react-router-dom");
const Container_1 = require("@material-ui/core/Container");
const Routes_1 = require("../../Routes/Routes");
const Footer_1 = require("../Footer");
const MenuTop_1 = require("../MenuTop/MenuTop");
const DrawerMenu_1 = require("../DrawerMenu/DrawerMenu");
const drawerWidth = 175;
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    menuTitle: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    pushRight: {
        marginLeft: 'auto'
    }
}));
exports.App = (props) => {
    const { window } = props;
    const classes = useStyles();
    const theme = styles_1.useTheme();
    const [mobileOpen, setMobileOpen] = react_1.default.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(AppBar_1.default, { position: "fixed", className: classes.appBar },
            react_1.default.createElement(Toolbar_1.default, null,
                react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: handleDrawerToggle, className: classes.menuButton },
                    react_1.default.createElement(Menu_1.default, null)),
                react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                    react_1.default.createElement(Typography_1.default, { variant: "h6", className: classes.menuTitle }, "MoviesApp")),
                react_1.default.createElement("div", { className: classes.pushRight },
                    react_1.default.createElement(MenuTop_1.MenuTop, null)))),
        react_1.default.createElement("nav", { className: classes.drawer, "aria-label": "mailbox folders" },
            react_1.default.createElement(Hidden_1.default, { smUp: true, implementation: "css" },
                react_1.default.createElement(Drawer_1.default, { container: container, variant: "temporary", anchor: theme.direction === 'rtl' ? 'right' : 'left', open: mobileOpen, onClose: handleDrawerToggle, classes: {
                        paper: classes.drawerPaper
                    }, ModalProps: {
                        keepMounted: true
                    } },
                    react_1.default.createElement(DrawerMenu_1.DrawerMenu, { closeHandler: handleDrawerToggle }))),
            react_1.default.createElement(Hidden_1.default, { xsDown: true, implementation: "css" },
                react_1.default.createElement(Drawer_1.default, { classes: {
                        paper: classes.drawerPaper
                    }, variant: "permanent", open: true },
                    react_1.default.createElement(DrawerMenu_1.DrawerMenu, null)))),
        react_1.default.createElement("main", { className: classes.content },
            react_1.default.createElement("div", { className: classes.toolbar }),
            react_1.default.createElement(Container_1.default, { maxWidth: "lg" },
                react_1.default.createElement(Grid_1.default, { container: true, className: classes.root, spacing: 3 },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                        react_1.default.createElement(react_router_dom_1.Switch, null, Routes_1.Routes.map((route) => (react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: route.path, key: route.path, component: route.component })))))),
                react_1.default.createElement(Footer_1.Footer, { title: "Movies Catalog App", description: "Footer content" })))));
};
//# sourceMappingURL=App.js.map