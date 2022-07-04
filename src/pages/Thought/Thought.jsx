import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import ThoughtBox from "../../components/ThoughtBox/ThoughtBox";
import { getThought } from "../../modules/thoughtModule";
import ReplyBox from "../../components/ReplyBox/ReplyBox";
import { postReply } from "../../modules/replyModule";

const Thought = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [thought, setThought] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { thought_id } = useParams();

  const [body, setBody] = useState("");
  const [anoymous, setAnoymous] = useState(true);

  useEffect(() => {
    const getSpecificThought = async () => {
      try {
        await getThought(thought_id, user.token, (error, receivedThought) => {
          if (error) {
            alert(error.message);
            setLoading(false);
          } else if (receivedThought) {
            setThought(receivedThought.data[0]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    getSpecificThought().then(setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePostReply = () => {
    try {
      postReply(
        body,
        anoymous,
        thought_id,
        user.token,
        (error, deleteSuccess) => {
          if (error) {
            alert(error.message);
          } else if (deleteSuccess) {
            onClose();
            alert(deleteSuccess.data);
            window.location.reload();
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      backgroundColor="#131319"
      color="white"
      className="noselect"
      width="100%"
    >
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Center>
          <Box width={["90vw", "80vw", "70vw", "70vw"]}>
            <Box>
              <ThoughtBox
                thought={{
                  ...thought,
                  replies: thought.replies ? thought.replies.length : 0,
                }}
              />
            </Box>
            <Box
              padding="10px"
              border="2px solid gray"
              marginBottom="20px"
              borderRadius="8px"
            >
              <Flex>
                <Center>
                  <Text fontSize="22px" fontWeight="700" letterSpacing="0.03em">
                    Replies
                  </Text>
                </Center>
                <Spacer />
                <Button colorScheme="blue" onClick={onOpen}>
                  Reply
                </Button>
              </Flex>
            </Box>
            <Box>
              {thought.replies
                ? thought.replies.map((reply, index) => (
                    <ReplyBox
                      key={index}
                      reply={reply}
                      thought_id={thought_id}
                    />
                  ))
                : null}
            </Box>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent
              padding="10px"
              backgroundColor="#27292D"
              color="white"
              border="1px solid white"
            >
              <ModalBody>
                <Box width={["80%", "80%", "85%", "90%"]}>
                  <Textarea
                    placeholder="Write your reply..."
                    border="none"
                    padding="10px 0px"
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
                    onChange={(event) => setBody(event.currentTarget.value)}
                  />
                  <Checkbox
                    defaultChecked
                    onChange={(event) => setAnoymous(!anoymous)}
                  >
                    Post Anoymously
                  </Checkbox>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handlePostReply}>
                  Reply
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Center>
      )}
    </Box>
  );
};

export default Thought;
