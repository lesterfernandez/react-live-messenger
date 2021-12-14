import { VStack } from "@chakra-ui/layout";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";

const Chat = () => {
  return (
    <VStack>
      <TabPanels>
        <TabPanel>friend one</TabPanel>
        <TabPanel>friend two</TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
