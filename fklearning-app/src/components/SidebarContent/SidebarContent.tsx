import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  MdOutlineOndemandVideo,
  MdOutlineSearch,
  MdOutlineEuroSymbol,
  MdAccountCircle,
  MdOutlineShoppingCart,
  MdLogout,
} from "react-icons/md";

import { LuBellRing } from "react-icons/lu";

export default function SidebarContent() {
  return (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        <List>
          <ListItem
            key={"Danbee Korean"}
            disablePadding
          >
              <ListItemText
                primary="Danbee Korean"
                className="text-2xl font-bold text-center"
              />
          </ListItem>
        </List>
        <List>
          {["Level Test", "Pricing", "Video Catalog"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? (
                    <MdOutlineSearch />
                  ) : index === 1 ? (
                    <MdOutlineEuroSymbol />
                  ) : (
                    <MdOutlineOndemandVideo />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["My Account", "Subscriptions", "Orders"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? (
                    <MdAccountCircle />
                  ) : index === 1 ? (
                    <LuBellRing />
                  ) : (
                    <MdOutlineShoppingCart />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          {["Sign Out"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <MdLogout />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
