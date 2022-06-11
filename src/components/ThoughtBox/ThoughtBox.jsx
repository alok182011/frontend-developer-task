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

const ThoughtBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
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
            <Center height="100%">{/* <ChatIcon />  */}🐼</Center>
          </Box>
          <Box marginLeft="16px">
            <Text color="#C5C7CA" fontSize="16px" fontWeight="500">
              Name
            </Text>
            <Text color="#7F8084" fontSize="14px">
              Time
            </Text>
          </Box>
          <Spacer />
          <Box
            height="25px"
            width="25px"
            borderRadius="50%"
            backgroundColor="#000000"
            css={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <Center height="100%">☢️</Center>
          </Box>
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
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.Amet minim mollit
              non deserunt ullamco est sit aliqua dolor do amet sint. Velit
              officia consequat duis enim velit mollit. Exercitation veniam
              consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco
              est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit. Exercitation veniam consequat sunt nostrud
              amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor
              do amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </Text>
          </Box>
        </Flex>
      </Box>
      <Flex marginTop="12px">
        <Center>
          <ChatIcon />{" "}
          <Text marginLeft="10px" color="#7F8084" fontsize="14px">
            24 comments
          </Text>
        </Center>
      </Flex>
    </Box>
  );
};

export default ThoughtBox;
