import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { ChatIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

const PostThoughtForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
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
            />
          </Box>
        </Flex>
      </Box>
      <Flex marginTop="20px" flexDirection="row-reverse">
        <Button backgroundColor="#4A96FF" variant="solid">
          <Text color="#FFFFFF" fontSize="16px" fontWeight="500">
            Post
          </Text>
        </Button>
        <Spacer />
        <Checkbox defaultChecked>Post Anoymously</Checkbox>
      </Flex>
    </Box>
  );
};

export default PostThoughtForm;
