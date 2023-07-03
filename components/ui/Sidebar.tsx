import { useContext } from "react";
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import { InboxOutlined, MailOutlineOutlined } from "@mui/icons-material";
import { UIContext } from "@/context/ui";

const menuItems: String[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
    const { isMenuOpen, closeMenu } = useContext(UIContext);

    return (
        <Drawer anchor="left" open={isMenuOpen} onClose={closeMenu}>
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: "5px 10px" }}>
                    <Typography variant="h4">Menu</Typography>
                </Box>
                <List>
                    {menuItems.map((text, i) => (
                        <ListItem button key={i}>
                            {i % 2 ? (
                                <InboxOutlined />
                            ) : (
                                <MailOutlineOutlined />
                            )}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {menuItems.map((text, i) => (
                        <ListItem button key={i}>
                            {i % 2 ? (
                                <InboxOutlined />
                            ) : (
                                <MailOutlineOutlined />
                            )}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};
