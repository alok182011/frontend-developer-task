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

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/features/userSlice";

import { ViewIcon, ViewOffIcon, SpinnerIcon } from "@chakra-ui/icons";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../../modules/authModules";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const user = useSelector((state) => state.token);

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    code: 0,
    message: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);

    try {
      login(usernameOrEmail, password, (error, user) => {
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
                  onChange={(event) =>
                    setUsernameOrEmail(event.currentTarget.value)
                  }
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
                {loading ? (
                  <SpinnerIcon />
                ) : (
                  <Text
                    color="#FFFFFF"
                    fontSize="16px"
                    fontWeight="500"
                    onClick={handleSubmit}
                    css={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    Login Now
                  </Text>
                )}
              </Button>
            </Box>
            {errors.code === 404 ||
            errors.code === 401 ||
            errors.code === 400 ? (
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
                  Not registered yet?
                </Text>
                <Link to="/register">
                  <Text
                    color="#C5C7CA"
                    fontSize="14px"
                    fontWeight="400"
                    marginLeft="5px"
                  >
                    Register →
                  </Text>
                </Link>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

export default Login;
