import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { NavLink, Route, Routes } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function DropDownMenu(props) {
  const [isHoverMenuItem, setHoverMenuItem] = React.useState([]);
  const { MenuText, MenuItems, activeMenu, setActiveMenu } = props;
  const basicForColor = "#515151";
  const selectedForColor = "#1565c0";
  const hoverForColor = "#ED1C24";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (openLink = undefined, menuSlug = undefined) => {
    setAnchorEl(null);
    if (openLink !== undefined) {
      // console.log(openLink)
    }
    /* if (menuSlug !== undefined && menuSlug !== "backdropClick") {
            setActiveMenu(menuSlug)
        } */
  };

  const isSlugExistsInMenuItems = () => {
    let itemFound = 0;
    MenuItems.map((MenuItem) => {
      if (MenuItem.LinkSlug === activeMenu) {
        itemFound++;
      }
    });
    return itemFound;
  };

  const buttonForColor =
    isSlugExistsInMenuItems() > 0 ? selectedForColor : basicForColor;

  const handleOnMenuItemMouseEnter = (indexMI) => {
    if (indexMI >= isHoverMenuItem.length) {
      let hoverMenuItems = isHoverMenuItem;
      hoverMenuItems.push(true);
      setHoverMenuItem(hoverMenuItems);
    } else {
      let hoverMenuItems = isHoverMenuItem.map((menuItem, i) => {
        return i === indexMI ? true : false;
      });
      setHoverMenuItem(hoverMenuItems);
    }
  };
  const handleOnMenuItemMouseLeave = (indexMI) => {
    if (indexMI >= isHoverMenuItem.length) {
      let hoverMenuItems = isHoverMenuItem;
      hoverMenuItems.push(false);
      setHoverMenuItem(hoverMenuItems);
    } else {
      let hoverMenuItems = isHoverMenuItem.map((menuItem, i) => {
        return i === indexMI ? false : menuItem;
      });
      setHoverMenuItem(hoverMenuItems);
    }
  };

  const initializeMenuItemHover = (indexMI) => {
    if (indexMI >= isHoverMenuItem.length) {
      let hoverMenuItems = isHoverMenuItem;
      hoverMenuItems.push(false);
      setHoverMenuItem(hoverMenuItems);
    }
  };

  return (
    <div style={{ display: "inline", marginTop: "49px" }}>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <label
          className="CustMenuButton"
          style={{
            display: "inline-flex",
            color: buttonForColor,
            fontWeight: "bold",
            fontSize: "15px",
            textTransform: "none",
            cursor: "pointer",
          }}
        >
          {MenuText}
          {open ? <ExpandLess /> : <ExpandMore />}
        </label>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ marginTop: "15px" }}
      >
        {MenuItems.map((menuItem, indexMI) => {
          initializeMenuItemHover(indexMI);
          const menuItemColor =
            menuItem.LinkSlug === activeMenu ? selectedForColor : basicForColor;
          const menuVisible =
            menuItem.setVisible !== undefined
              ? menuItem.setVisible === false
                ? "none"
                : "block"
              : "block";
          return (
            <MenuItem
              className="menufont"
              // onClick={(props) => { handleClose(props, menuItem.LinkSlug) }}
              style={{ display: menuVisible }}
            >
              <NavLink
                className={"SubMenuNavLink"}
                to={"/" + menuItem.LinkSlug}
                style={{
                  textDecoration: "none",
                  color: isHoverMenuItem[indexMI]
                    ? hoverForColor
                    : menuItemColor,
                  fontWeight: "bold",
                  fontSize: "15px",
                  width: "100%",
                  display: "block",
                }}
                onMouseEnter={() => {
                  handleOnMenuItemMouseEnter(indexMI);
                }}
                onMouseLeave={() => {
                  handleOnMenuItemMouseLeave(indexMI);
                }}
                onClick={() => {
                  setActiveMenu(menuItem.LinkSlug);
                  handleClose(props, menuItem.LinkSlug);
                  // console.log(
                  //   "isHoverMenuItem from Mouse Leave",
                  //   isHoverMenuItem
                  // );
                }}
              >
                {menuItem.menuText}
              </NavLink>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
