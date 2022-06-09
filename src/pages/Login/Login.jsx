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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <Box
      height="100vh"
      backgroundColor="#131319"
      color="white"
      className="noselect"
    >
      <Center height="100vh">
        <Flex flexDirection="column">
          <Box width={["90vw", "70vw", "50vw", "30vw"]}>
            <Center>
              <Box width="50px" height="50px">
                ☮️🏔️✨🙂
              </Box>
            </Center>
          </Box>
          <Box
            marginTop="50px"
            width={["90vw", "70vw", "50vw", "30vw"]}
            height="420px"
            padding="24px"
            border="2px solid"
            borderImageSource="linear-gradient(129.59deg, #969696 0%, #343434 98.18%)"
            backgroundColor="#27292D"
            borderRadius="8px"
          >
            <Box textAlign="center" marginBottom="45px" marginTop="16px">
              <Text
                color="#6B6C70"
                fontSize="14px"
                fontWeight="500"
                letterSpacing="0.03em"
              >
                WELCOME BACK
              </Text>
              <Text color="#FFFFFF" fontSize="18px" fontWeight="600">
                Log into your account
              </Text>
            </Box>
            <Box>
              <FormControl>
                <FormLabel
                  htmlFor="email"
                  color="#C5C7CA"
                  fontSize="14px"
                  fontWeight="500"
                >
                  Email or Username
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email or username"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl marginTop="16px">
                <Flex>
                  <FormLabel
                    htmlFor="email"
                    color="#C5C7CA"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    Password
                  </FormLabel>
                  <Spacer />
                  <FormLabel
                    htmlFor="email"
                    color="#C5C7CA"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    Forgot Password
                  </FormLabel>
                </Flex>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      colorScheme="#27292D"
                      variant="ghost"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? (
                        <ViewOffIcon color="#C5C7CA" />
                      ) : (
                        <ViewIcon color="#C5C7CA" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
            <Box marginTop="20px">
              <Button width="100%" backgroundColor="#4A96FF" variant="solid">
                <Text color="#FFFFFF" fontSize="16px" fontWeight="500">
                  Login Now
                </Text>
              </Button>
            </Box>
            <Box marginTop="12px">
              <Flex>
                <Text color="#7F8084" fontSize="14px" fontWeight="400">
                  Not registered yet?
                </Text>
                <Text
                  color="#C5C7CA"
                  fontSize="14px"
                  fontWeight="400"
                  marginLeft="5px"
                >
                  Register →
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

export default Login;
