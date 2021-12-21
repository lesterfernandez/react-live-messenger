import { Text, VStack } from "@chakra-ui/layout";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useContext, useEffect, useRef } from "react";
import ChatBox from "./ChatBox";
import { FriendContext, MessagesContext } from "./Home";

const Chat = ({ userid }) => {
  const { friendList } = useContext(FriendContext);
  const { messages } = useContext(MessagesContext);
  const bottomDiv = useRef(null);

  useEffect(() => {
    bottomDiv.current?.scrollIntoView();
  });

  return friendList.length > 0 ? (
    <VStack h="100%" justify="end">
      <TabPanels overflowY="scroll">
        {friendList.map(friend => (
          <VStack
            flexDir="column-reverse"
            as={TabPanel}
            key={`chat:${friend.username}`}
            w="100%"
          >
            <div ref={bottomDiv} />
            {messages
              .filter(
                msg => msg.to === friend.userid || msg.from === friend.userid
              )
              .map((message, idx) => (
                <Text
                  m={
                    message.to === friend.userid
                      ? "1rem 0 0 auto !important"
                      : "1rem auto 0 0 !important"
                  }
                  maxW="50%"
                  key={`msg:${friend.username}.${idx}`}
                  fontSize="lg"
                  bg={message.to === friend.userid ? "blue.100" : "gray.100"}
                  color="gray.800"
                  borderRadius="10px"
                  p="0.5rem 1rem"
                >
                  {message.content}
                </Text>
              ))}
          </VStack>
        ))}
      </TabPanels>
      <ChatBox userid={userid} />
    </VStack>
  ) : (
    <VStack
      justify="center"
      pt="5rem"
      w="100%"
      textAlign="center"
      fontSize="lg"
    >
      <TabPanels>
        <TabPanel>
          <Text>No friend :( Click add friend to start chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
