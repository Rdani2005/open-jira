import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useContext } from "react";
import { UIContext } from "@/context/ui";
import NextLink from "next/link";
export const Navbar = () => {
    const { openMenu } = useContext(UIContext);

    return (
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <IconButton size="large" edge="start" onClick={openMenu}>
                    <MenuOutlinedIcon></MenuOutlinedIcon>
                </IconButton>
                <NextLink href={"/"} passHref>
                    {/* <Link underline="none" color={"white"}> */}
                    <Typography variant="h6">OpenJira</Typography>
                    {/* </Link> */}
                </NextLink>
            </Toolbar>
        </AppBar>
    );
};
