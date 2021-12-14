import { Button } from "@chakra-ui/button";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Circle,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "./Home";

const Sidebar = () => {
  const { friendList, setFriendList } = useContext(FriendContext);
  return (
    <VStack py="1.4rem">
      <HStack justify="space-evenly" w="100%">
        <Heading size="md">Add Friend</Heading>
        <Button>
          <ChatIcon />
        </Button>
      </HStack>
      <Divider />
      <VStack as={TabList}>
        {friendList.map(friend => (
          <HStack as={Tab}>
            <Circle
              bg={friend.connected ? "green.700" : "red.500"}
              w="20px"
              h="20px"
            />
            <Text>{friend.username}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Sidebar;
