import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";

import { postThought } from "../../modules/thoughtModule";

const PostThoughtForm = () => {
  const token = useSelector((state) => state.user.token);
  const [body, setBody] = useState("");
  const [anoymous, setAnoymous] = useState(true);

  const [loading, setLoading] = useState(false);

  const handlePost = (e) => {
    setLoading(true);

    try {
      postThought(body, anoymous, token, (error, post) => {
        if (error) {
          alert(error.message);
          setLoading(false);
        } else if (post) {
          setLoading(false);
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
      border="2px solid #35373B"
      backgroundColor="#27292D"
      borderRadius="8px"
    >
      <Box>
        <Text color="#C5C7CA" fontSize="18px" fontWeight="500">
          Create Post
        </Text>
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
                <Center height="100%">{/* <ChatIcon />  */}🐼</Center>
              </Box>
            </Center>
          </Box>
          <Box width={["80%", "80%", "85%", "90%"]}>
            <Textarea
              placeholder="How are you feeling today?"
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
          </Box>
        </Flex>
      </Box>
      <Flex marginTop="20px" flexDirection="row-reverse">
        <Button
          isLoading={loading}
          isDisabled={!body.length}
          backgroundColor="#4A96FF"
          variant="solid"
          onClick={handlePost}
        >
          <Text
            color="#FFFFFF"
            fontSize="16px"
            fontWeight="500"
            css={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            Post
          </Text>
        </Button>
        <Spacer />
        <Checkbox defaultChecked onChange={(event) => setAnoymous(!anoymous)}>
          Post Anoymously
        </Checkbox>
      </Flex>
    </Box>
  );
};

export default PostThoughtForm;
