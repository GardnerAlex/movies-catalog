"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = require("react");
const AppBar_1 = require("@material-ui/core/AppBar");
const CssBaseline_1 = require("@material-ui/core/CssBaseline");
const Drawer_1 = require("@material-ui/core/Drawer");
const InputBase_1 = require("@material-ui/core/InputBase");
const Search_1 = require("@material-ui/icons/Search");
const Hidden_1 = require("@material-ui/core/Hidden");
const IconButton_1 = require("@material-ui/core/IconButton");
const Menu_1 = require("@material-ui/icons/Menu");
const Toolbar_1 = require("@material-ui/core/Toolbar");
const Typography_1 = require("@material-ui/core/Typography");
const styles_1 = require("@material-ui/core/styles");
const Grid_1 = require("@material-ui/core/Grid");
const react_router_dom_1 = require("react-router-dom");
const Container_1 = require("@material-ui/core/Container");
const useMediaQuery_1 = require("@material-ui/core/useMediaQuery");
const Routes_1 = require("../../Routes/Routes");
const Footer_1 = require("../Footer");
const DrawerMenu_1 = require("../DrawerMenu/DrawerMenu");
const drawerWidth = 220;
const breakPoint = 'md';
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up(breakPoint)]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up(breakPoint)]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(breakPoint)]: {
            display: 'none'
        }
    },
    title: {
        textDecoration: 'none',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    menuItem: {
        textDecoration: 'none',
        color: 'white'
    },
    menuTitle: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down(breakPoint)]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down(breakPoint)]: {
            padding: theme.spacing(1)
        }
    },
    pushRight: {
        marginLeft: 'auto'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: styles_1.fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch'
        }
    }
}));
exports.App = (props) => {
    const history = react_router_dom_1.useHistory();
    const { window } = props;
    const classes = useStyles();
    const theme = styles_1.useTheme();
    const isMobile = useMediaQuery_1.default(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = react_1.useState(false);
    const [searchInput, setSearchInput] = react_1.useState('');
    const handleDrawerMenuItemCLick = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        }
    };
    const handleDrawerSwitch = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleEnter = (e) => {
        if (searchInput !== '' && e.keyCode === 13) {
            history.push(`/search/${searchInput}`);
            setSearchInput('');
        }
    };
    const handleSearchClick = () => {
        console.log('handleSearchClick');
        if (searchInput !== '') {
            history.push(`/search/${searchInput}`);
            setSearchInput('');
        }
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(AppBar_1.default, { position: "fixed", className: classes.appBar },
            react_1.default.createElement(Toolbar_1.default, null,
                react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: handleDrawerSwitch, className: classes.menuButton },
                    react_1.default.createElement(Menu_1.default, null)),
                react_1.default.createElement(Typography_1.default, { className: classes.title, variant: "h6", noWrap: true },
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: classes.menuItem }, "MoviesApp")),
                react_1.default.createElement("div", { className: classes.search },
                    react_1.default.createElement(InputBase_1.default, { value: searchInput, onKeyDown: handleEnter, onChange: (event) => (setSearchInput(event.target.value)), placeholder: "Search\u2026", classes: {
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }, inputProps: { 'aria-label': 'search' } })),
                react_1.default.createElement(IconButton_1.default, { edge: "end", "aria-label": "search", onClick: handleSearchClick, color: "inherit" },
                    react_1.default.createElement(Search_1.default, null)))),
        react_1.default.createElement("nav", { className: classes.drawer, "aria-label": "sidebar menu" },
            react_1.default.createElement(Hidden_1.default, { smUp: true, implementation: "css" },
                react_1.default.createElement(Drawer_1.default, { container: container, variant: "temporary", anchor: theme.direction === 'rtl' ? 'right' : 'left', open: mobileOpen, onClose: handleDrawerSwitch, classes: {
                        paper: classes.drawerPaper
                    }, ModalProps: {
                        keepMounted: true
                    } },
                    react_1.default.createElement(DrawerMenu_1.DrawerMenu, { closeHandler: handleDrawerMenuItemCLick }))),
            react_1.default.createElement(Hidden_1.default, { smDown: true, implementation: "css" },
                react_1.default.createElement(Drawer_1.default, { classes: {
                        paper: classes.drawerPaper
                    }, variant: "permanent", open: mobileOpen },
                    react_1.default.createElement(DrawerMenu_1.DrawerMenu, { closeHandler: handleDrawerMenuItemCLick })))),
        react_1.default.createElement("main", { className: classes.content },
            react_1.default.createElement("div", { className: classes.toolbar }),
            react_1.default.createElement(Container_1.default, { maxWidth: "lg" },
                react_1.default.createElement(Grid_1.default, { container: true, className: classes.root, spacing: 3 },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                        react_1.default.createElement(react_router_dom_1.Switch, null, Routes_1.Routes.map((route) => (react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: route.path, key: route.path, component: route.component })))))),
                react_1.default.createElement(Footer_1.Footer, { title: "Movies Catalog App", description: "Footer content" })))));
};
//# sourceMappingURL=App.js.map