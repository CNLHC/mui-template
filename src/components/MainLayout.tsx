import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Collapse,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import React, { ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useSidebar } from "../../libs/hooks/utils";
import MenuData, { MenuEntry } from "./MenuData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MenuItem = ({
  me,
  index,
  level,
}: {
  me: MenuEntry;
  index: number;
  level: number;
}) => {
  const { opened, expand, collapse, collapse_state } = useSidebar();
  const onExpandMenu = (me: MenuEntry) => {
    if (me.children) {
      if (collapse_state[me.key]) {
        expand(me.key);
      } else {
        collapse(me.key);
      }
    }
  };
  return (
    <>
      <ListItemButton
        key={me.key}
        sx={{
          minHeight: 48,
          justifyContent: opened ? "initial" : "center",
          pr: 2.5,
          pl: 2.5 + 4 * level,
        }}
        onClick={() => onExpandMenu(me)}
      >
        {me.icon ? (
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: opened ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={me.icon} />
          </ListItemIcon>
        ) : null}
        <ListItemText primary={me.name} sx={{ opacity: opened ? 1 : 0 }} />

        {me.children && opened ? (
          !collapse_state[me.key] ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItemButton>

      {me.children && opened ? (
        <Collapse in={!collapse_state[me.key]} timeout="auto">
          <List component="div" disablePadding>
            {me.children.map((m, idx) => (
              // <ListItemButton sx={{ pl: 4 * level }} key={`${m.key}-${idx}`}>
              //   <ListItemIcon>
              //     <StarBorder />
              //   </ListItemIcon>
              //   <ListItemText primary="Starred" />
              // </ListItemButton>
              <MenuItem me={m} index={idx} level={level + 1} />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};

const SideBar = () => {
  const theme = useTheme();

  const { hide, opened, expand, collapse, collapse_state } = useSidebar();

  return (
    <Drawer open={opened} variant="permanent">
      <DrawerHeader>
        <IconButton onClick={hide}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {MenuData.map((me, index) => (
          <MenuItem me={me} index={index} level={0} />
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

const MainLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { show, opened } = useSidebar();
  return (
    <div
      className={`
      flex h-screen
    dark:text-dark-primary
    dark:bg-dark-bg
    `}
    >
      <AppBar position="fixed" open={opened}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={show}
            edge="start"
            sx={{
              marginRight: 5,
              ...(opened && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBar />
      <div className="p-8 flex-grow ">{children}</div>
    </div>
  );
};

export default MainLayout;
