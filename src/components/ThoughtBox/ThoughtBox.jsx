import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { deleteThought } from "../../modules/thoughtModule";

const ThoughtBox = ({ thought }) => {
  const user = useSelector((state) => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [thoughtId, setThoughtId] = useState(null);

  const handleDeleteButtonClick = (thought_id) => {
    setThoughtId(thought_id);
    onOpen();
  };
  console.log(thought);
  const handleThoughtDelete = () => {
    try {
      deleteThought(thoughtId, user.token, (error, deleteSuccess) => {
        if (error) {
          alert(error.message);
        } else if (deleteSuccess) {
          onClose();
          alert(deleteSuccess.data);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      padding="20px"
      margin="20px 0"
      border="2px solid #35373B"
      backgroundColor="#27292D"
      borderRadius="8px"
    >
      <Box>
        <Flex>
          <Box
            height="48px"
            width="48px"
            borderRadius="50%"
            backgroundColor="#000000"
          >
            {thought.anoymous ? (
              <Center height="100%">{/* <ChatIcon />  */}🐼</Center>
            ) : (
              <Link to={`/profile/${thought.username}`}>
                <Center height="100%">{/* <ChatIcon />  */}🐼</Center>
              </Link>
            )}
          </Box>
          {thought.anoymous ? (
            <Box marginLeft="16px">
              <Text color="#C5C7CA" fontSize="16px" fontWeight="500">
                {thought.username ? thought.username : "Anoymous"}
              </Text>
              <Text color="#7F8084" fontSize="14px">
                {moment(thought.createdAt).fromNow(true)} ago
              </Text>
            </Box>
          ) : (
            <Link to={`/profile/${thought.username}`}>
              <Box marginLeft="16px">
                <Text color="#C5C7CA" fontSize="16px" fontWeight="500">
                  {thought.username ? thought.username : "Anoymous"}
                </Text>
                <Text color="#7F8084" fontSize="14px">
                  {moment(thought.createdAt).fromNow(true)} ago
                </Text>
              </Box>
            </Link>
          )}
          <Spacer />
          {thought.user_id === user.id || thought.username === user.username ? (
            <Box
              height="25px"
              width="25px"
              css={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Center height="100%">
                <DeleteIcon
                  onClick={() => handleDeleteButtonClick(thought._id)}
                />
              </Center>
            </Box>
          ) : null}
        </Flex>
        <Flex
          width="100%"
          backgroundColor="#191920"
          borderRadius="8px"
          marginTop="16px"
        >
          <Box width={["20%", "20%", "15%", "10%"]}>
            <Center height="100%">
              <Box
                height="48px"
                width="48px"
                borderRadius="50%"
                backgroundColor="#27292D"
              >
                <Center height="100%">🙂</Center>
              </Box>
            </Center>
          </Box>
          <Box width={["80%", "80%", "85%", "90%"]}>
            <Text
              color="#7F8084"
              fontSize="16px"
              fontWeight="400"
              padding="10px 0px"
              overflow="auto"
              height="80px"
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "gray",
                  borderRadius: "24px",
                },
              }}
            >
              {thought.body}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Flex marginTop="12px">
        <Center>
          <ChatIcon />{" "}
          <Text marginLeft="10px" color="#7F8084" fontSize="14px">
            {thought.replies}
          </Text>
        </Center>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent padding="10px" backgroundColor="#27292D" color="white">
          <ModalBody>Are you sure ???</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleThoughtDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ThoughtBox;
