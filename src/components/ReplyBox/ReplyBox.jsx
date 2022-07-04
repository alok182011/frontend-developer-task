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

import { DeleteIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { deleteReply } from "../../modules/replyModule";

const ReplyBox = ({ reply, thought_id }) => {
  const user = useSelector((state) => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [replyId, setReplyId] = useState(null);

  const handleDeleteButtonClick = (reply_id) => {
    setReplyId(reply_id);
    onOpen();
  };

  const handleReplyDelete = () => {
    try {
      deleteReply(thought_id, replyId, user.token, (error, deleteSuccess) => {
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
      backgroundColor="#27292D"
      margin="20px 0"
      border="2px solid #35373B"
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
            {reply.anoymous ? (
              <Center height="100%">🐼</Center>
            ) : (
              <Link to={`/profile/${reply.username}`}>
                <Center height="100%">🐼</Center>
              </Link>
            )}
          </Box>
          {reply.anoymous ? (
            <Box marginLeft="16px">
              <Text color="#C5C7CA" fontSize="16px" fontWeight="500">
                {reply.username ? reply.username : "Anoymous"}
              </Text>
              <Text color="#7F8084" fontSize="14px">
                {moment(reply.createdAt).fromNow(true)} ago
              </Text>
            </Box>
          ) : (
            <Link to={`/profile/${reply.username}`}>
              <Box marginLeft="16px">
                <Text color="#C5C7CA" fontSize="16px" fontWeight="500">
                  {reply.username ? reply.username : "Anoymous"}
                </Text>
                <Text color="#7F8084" fontSize="14px">
                  {moment(reply.createdAt).fromNow(true)} ago
                </Text>
              </Box>
            </Link>
          )}
          <Spacer />
          {reply.user_id === user.id || reply.username === user.username ? (
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
                  onClick={() => handleDeleteButtonClick(reply._id)}
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
              {reply.body}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent padding="10px" backgroundColor="#27292D" color="white">
          <ModalBody>Are you sure ???</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleReplyDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReplyBox;
