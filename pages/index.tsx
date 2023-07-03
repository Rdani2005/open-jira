import { NextPage } from "next";
import { Layout } from "@/layouts";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { EntryList } from "../components/ui/EntryList";
import { NewEntry } from "../components/ui/NewEntry";

const Home: NextPage = () => {
    return (
        <Layout title="Open Jira">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            height: "calc(100vh - 100px)",
                        }}
                    >
                        <CardHeader title="Pendings" />
                        <CardContent>
                            <NewEntry />
                            <EntryList status="Pending" />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            height: "calc(100vh - 100px)",
                        }}
                    >
                        <CardHeader title="In Progress" />
                        <CardContent>
                            <EntryList status="in-progress" />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            height: "calc(100vh - 100px)",
                        }}
                    >
                        <CardHeader title="Completed" />
                        <CardContent>
                            <EntryList status="finished" />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Home;
