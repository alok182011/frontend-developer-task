import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import PostThoughtForm from "../../components/PostThoughtForm/PostThoughtForm";

const Home = () => {
  return (
    <Box
      height="100vh"
      backgroundColor="#131319"
      color="white"
      className="noselect"
    >
      <Center>
        <Box width={["90vw", "80vw", "70vw", "70vw"]} border="2px solid white">
          <Box marginTop="69px" marginBottom="40px" border="1px solid red">
            <Text color="#C5C7CA" fontWeight="500" fontSize="28px">
              Hello Jane
            </Text>
            <Text
              marginTop="12px"
              fontWeight="400"
              fontSize="16px"
              color="#7F8084"
            >
              How are you doing today? Would you like to share something with
              the community 🤗
            </Text>
          </Box>
          <Box>
            <PostThoughtForm />
          </Box>
          <Box>Thoughts</Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Home;