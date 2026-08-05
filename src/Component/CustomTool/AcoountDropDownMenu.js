import * as React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Grid,
  List,
  ListItemButton,
} from "@mui/material";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowDropDown,
  KeyboardArrowRight,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Inbox,
  ExpandLess,
  ExpandMore,
  StarBorder,
  Password,
  CreditCard,
  Logout,
  Settings,
  AccountCircle,
  Payment,
} from "@mui/icons-material";
import AlertResponsiveDialog from "./AlertResponsiveDialog";
import { fetchCIDetail } from "../API";
import { useEffect } from "react";
import Subscription from "../Subscription";
import CurrentPassword from "../CurrentPassword";

export default function AcoountDropDownMenu(props) {
  const {
    menuItems,
    activeMenu,
    setActiveMenu,
    mobileView,
    handleDrawerClose,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const [ARD, setARD] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [formData, setformData] = React.useState({
    txtCI: "",
    txtProductKey: "",
    txtlicensed: "",
    txtfromdate: "",
    txttodate: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    const reqData = {
      Op: "SubscriptionListFrmCI",
      bint_ci: localStorage.getItem("CI"),
    };
    fetchCIDetail(reqData)
      .then((res) => {
        let SubscriptionList = res.data.SubscriptionListFrmCI[0];
        setformData({
          txtCI: SubscriptionList.vac_citype,
          txtProductKey: "9QE3B1J0271828C2B0R0",
          txtlicensed: SubscriptionList.vac_ciname,
          txtfromdate: "04-Dec-2023",
          txttodate: SubscriptionList.dat_subenddate,
        });
      })
      .catch((error) => {
        console.log("Unknown error occurred in onFormLoad.", error);
      });
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSettingsOpen(false);
  };

  const handleToggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  };

  const handleClickSetting = () => {
    setSettingsDrawerOpen((prev) => !prev);
  };

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = (name) => {
    const nameParts = name?.trim().split(" ") || [];
    const firstInitial = nameParts[0]?.[0] || "";
    const secondInitial = nameParts[1]?.[0] || "";
    return {
      sx: { bgcolorToColor(name || "U") },
      children: `${firstInitial}${secondInitial}`,
    };
  };

  const selectedForColor = "#1565c0";
  const basicForColor = "#515151";

  const getDaysLeft = () => {
    const parseCustomDate = (str) => {
      if (!str || typeof str !== "string") return null;

      const [day, monthStr, year] = str.split("-");
      if (!day || !monthStr || !year) return null;

      // Normalize month string (e.g., "Dec" => "December")
      const monthMap = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December",
      };

      const normalizedMonthKey =
        monthStr.charAt(0).toUpperCase() + monthStr.slice(1, 3).toLowerCase();
      const fullMonth = monthMap[normalizedMonthKey];

      if (!fullMonth) return null;

      const dateStr = `${fullMonth} ${day}, ${year}`; // e.g., "May 31, 2025"
      const dateObj = new window.Date(dateStr);

      return isNaN(dateObj) ? null : dateObj;
    };

    const today = new window.Date();
    const dueDate = parseCustomDate(formData.txttodate); // make sure this field has correct value

    if (!dueDate) {
      console.error("Invalid due date format:", formData.txttodate);
      return "-";
    }

    // Reset time for date-only comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const timeDiff = dueDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return isNaN(daysLeft) ? "-" : daysLeft;
  };

  const openChangePassword = () => {
    setARD(null);
    let dialogContent = (
      <AlertResponsiveDialog
        alertMessage={<CurrentPassword nullARD={ARDNull} />}
        defaultOpenDialog={true}
        onYesClickCloseIfExeSuccessfully={true}
        handleOnClickNo={() => {
          setARD(null);
        }}
      />
    );
    setARD(dialogContent);
    console.log("ARD", ARD);
  };

  const ARDNull = () => {
    setARD(null);
  };

  const openArd = () => {
    setARD(null);
    const ARD = (
      <AlertResponsiveDialog
        alertMessage={
          <Subscription
            Days={getDaysLeft()}
            CI_Type={formData.txtCI}
            CI_Name={formData.txtlicensed}
            DueDate={formData.txttodate}
            FormDate={formData.txtfromdate}
            ProductKey={formData.txtProductKey}
          />
        }
        labelDisagree="Close"
        handleOnClickNo={() => {
          setARD(null);
        }}
        defaultOpenDialog={true}
        onYesClickCloseIfExeSuccessfully={true}
      />
    );

    setARD(ARD); // Set new ARD
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      {location.pathname != "/" ? (
        mobileView == true ? (
          <List>
            <ListItemButton onClick={handleClickDrawer}>
              <ListItemIcon style={{}}>
                <Avatar
                  {...stringAvatar(localStorage.getItem("UserName"))}
                  style={{ width: 35, height: 35 }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                primaryTypographyProps={{
                  fontWeight: "bold",
                  color: basicForColor,
                }}
              />
              {openDrawer ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openDrawer} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <List>
                  <ListItemButton /* sx={{ pl: 4 }} */>
                    <ListItemIcon>
                      <AccountCircle style={{ color: "#05699d" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={localStorage.getItem("UserName")}
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        // color: basicForColor,
                        color: "#05699d",
                      }}
                      sx={{ cursor: "default" }}
                    />
                  </ListItemButton>
                  <ListItemButton onClick={handleClickSetting}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText
                      primary="Settings"
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        color: basicForColor,
                      }}
                    />
                    {settingsDrawerOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={settingsDrawerOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {menuItems
                        .filter((item) => item.setVisible !== false) // Only show visible items
                        .map((item, index) => {
                          const color =
                            item.LinkSlug === activeMenu
                              ? selectedForColor
                              : basicForColor;

                          return (
                            <ListItemButton
                              key={index}
                              onClick={handleDrawerClose}
                              sx={{ pl: 9 }}
                            >
                              <NavLink
                                to={"/" + item.LinkSlug}
                                style={{
                                  textDecoration: "none",
                                  color,
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  width: "100%",
                                }}
                                onClick={() => setActiveMenu(item.LinkSlug)}
                              >
                                <ListItemText
                                  primary={item.menuText}
                                  primaryTypographyProps={{
                                    fontWeight: "bold",
                                    color,
                                  }}
                                />
                              </NavLink>
                            </ListItemButton>
                          );
                        })}
                    </List>
                  </Collapse>
                </List>
                <ListItemButton /* sx={{ pl: 4 }} */>
                  <ListItemIcon>
                    <Password />
                  </ListItemIcon>
                  <ListItemText
                    primary="Change Password"
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: basicForColor,
                    }}
                  />
                </ListItemButton>
                <ListItemButton /* sx={{ pl: 4 }} */ onClick={openArd}>
                  <ListItemIcon>
                    <CreditCard />
                  </ListItemIcon>
                  <ListItemText
                    primary="Subscription"
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: basicForColor,
                    }}
                  />
                </ListItemButton>
                <ListItemButton /* sx={{ pl: 4 }} */ onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText
                    primary="Log Out"
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: basicForColor,
                    }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        ) : (
          <>
            <Tooltip title="Profile" arrow>
              <Avatar
                {...stringAvatar(localStorage.getItem("UserName"))}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                style: {
                  minWidth: 200,
                  width: 230,
                  marginTop: "10px",
                  zIndex: 1000,
                },
              }}
            >
              <MenuItem
                sx={{
                  opacity: 1, // Keep full opacity
                  pointerEvents: "none", // Prevent interaction
                  borderBottom: "1px solid #d7d7d7ff",
                  // marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <ListItemIcon>
                  <AccountCircle style={{ color: "#05699d" }} />
                </ListItemIcon>
                <ListItemText
                  primary={localStorage.getItem("UserName")}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    // color: basicForColor,
                    color: "#05699d",
                  }}
                  sx={{ cursor: "default" }}
                />
              </MenuItem>
              <MenuItem onClick={handleToggleSettings}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: basicForColor,
                  }}
                />
                <ListItemIcon
                  style={{
                    // minWidth: 32,
                    // transform: settingsOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  {/* <ArrowRight /> */}
                  {settingsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </ListItemIcon>
              </MenuItem>

              <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 5 }}>
                  {menuItems
                    .filter((item) => item.setVisible !== false) // Only show visible items
                    .map((item, index) => {
                      const color =
                        item.LinkSlug === activeMenu
                          ? selectedForColor
                          : basicForColor;

                      return (
                        <MenuItem
                          key={index}
                          onClick={handleClose}
                          sx={{ px: 1.5 }}
                        >
                          <NavLink
                            to={"/" + item.LinkSlug}
                            style={{
                              textDecoration: "none",
                              color,
                              fontWeight: "bold",
                              fontSize: "15px",
                              width: "100%",
                              whiteSpace: "normal", // allow wrapping
                              wordBreak: "break-word", // break long words if needed
                            }}
                            onClick={() => setActiveMenu(item.LinkSlug)}
                          >
                            {item.menuText}
                          </NavLink>
                        </MenuItem>
                      );
                    })}
                </Box>
              </Collapse>

              {/* Other direct menu items */}
              <MenuItem onClick={openChangePassword}>
                <ListItemIcon>
                  <Password />
                </ListItemIcon>
                <ListItemText
                  primary="Change Password"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: basicForColor,
                  }}
                />
              </MenuItem>
              <MenuItem onClick={openArd}>
                <ListItemIcon>
                  <Payment />
                </ListItemIcon>
                <ListItemText
                  primary="Subscription"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: basicForColor,
                  }}
                />
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText
                  primary="Log Out"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                />
              </MenuItem>
            </Menu>
          </>
        )
      ) : (
        ""
      )}

      <Grid item>
        <Box display={{ xs: "none" }} style={{ textAlign: "right" }}>
          {ARD}
        </Box>
      </Grid>
    </div>
  );
}
