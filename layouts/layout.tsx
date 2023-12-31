import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import { Navbar, Sidebar } from "@/components/ui";

interface Props {
    title?: string;
    children: ReactNode;
}

export const Layout: FC<Props> = ({ title, children }) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title ?? "Open Jira"}</title>
            </Head>
            <Navbar />
            <Sidebar></Sidebar>

            <Box sx={{ padding: "10px 20px" }}>{children}</Box>
        </Box>
    );
};
