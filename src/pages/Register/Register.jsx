import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
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

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { register } from "../../modules/authModule";
import { userLogin } from "../../redux/features/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const user = useSelector((state) => state.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState({
    code: 0,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = (e) => {
    setLoading(true);

    try {
      register(username, email, password, (error, user) => {
        if (error) {
          setErrors({ code: error.code, message: error.message });
          setLoading(false);
        } else if (user) {
          dispatch(userLogin(user.data));
          setLoading(false);
          navigate("/home");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      height="100vh"
      backgroundColor="#131319"
      color="white"
      className="noselect"
    >
      <Center height="100vh">
        <Box
          width={["90vw", "70vw", "50vw", "30vw"]}
          height="506px"
          padding="24px"
          border="2px solid"
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
              SIGN UP
            </Text>
            <Text color="#FFFFFF" fontSize="18px" fontWeight="600">
              Create an account to continue
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
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl marginTop="16px">
              <FormLabel
                htmlFor="username"
                color="#C5C7CA"
                fontSize="14px"
                fontWeight="500"
              >
                Username
              </FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Choose a preferred username"
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl marginTop="16px">
              <Flex>
                <FormLabel
                  htmlFor="password"
                  color="#C5C7CA"
                  fontSize="14px"
                  fontWeight="500"
                >
                  Password
                </FormLabel>
                <Spacer />
                <FormLabel color="#C5C7CA" fontSize="14px" fontWeight="500">
                  Forgot Password
                </FormLabel>
              </Flex>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Choose a strong password"
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
            <Button
              width="100%"
              isLoading={loading}
              backgroundColor="#4A96FF"
              variant="solid"
              onClick={handleRegister}
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
                Continue
              </Text>
            </Button>
          </Box>
          {errors.code === 404 || errors.code === 409 || errors.code === 400 ? (
            <Alert
              height="5px"
              marginTop="5px"
              borderRadius="8px"
              status="error"
              fontSize="14px"
              color="black"
            >
              <AlertDescription>{errors.message}</AlertDescription>
            </Alert>
          ) : null}
          <Box marginTop="12px">
            <Flex>
              <Text color="#7F8084" fontSize="14px" fontWeight="400">
                Already have an account?
              </Text>
              <Link to="/">
                <Text
                  color="#C5C7CA"
                  fontSize="14px"
                  fontWeight="400"
                  marginLeft="5px"
                >
                  Login →
                </Text>
              </Link>
            </Flex>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Register;
