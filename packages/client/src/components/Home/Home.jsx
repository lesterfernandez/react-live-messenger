import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
      <GridItem colSpan="3" borderRight="1px solid gray">
        <Sidebar />
      </GridItem>
      <GridItem colSpan="7">
        <Chat />
      </GridItem>
    </Grid>
  );
};

export default Home;
