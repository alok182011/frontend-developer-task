import React, { useEffect, useState } from "react";
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

import { useSelector } from "react-redux";

import "./Profile.css";

import { Link } from "react-router-dom";
import PostThoughtForm from "../../components/PostThoughtForm/PostThoughtForm";
import ThoughtBox from "../../components/ThoughtBox/ThoughtBox";
import { getAllThoughts } from "../../modules/thoughtModule";
import InfiniteScroll from "react-infinite-scroll-component";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [thoughts, setThoughts] = useState([]);
  const [offset, setOffset] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    try {
      getAllThoughts(0, 10, user.token, (error, receivedThoughts) => {
        if (error) {
          alert(error.message);
          setLoading(false);
        } else if (receivedThoughts) {
          setThoughts(receivedThoughts.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = () => {
    try {
      getAllThoughts(offset, 10, user.token, (error, receivedThoughts) => {
        if (error) {
          alert(error.message);
        } else if (receivedThoughts) {
          if (receivedThoughts.data.length === 0) {
            setHasMore(false);
          }
          setThoughts([...thoughts, ...receivedThoughts.data]);
        }
      });
    } catch (error) {
      console.log(error);
    }

    setOffset(offset + 10);
  };

  return (
    <Box
      backgroundColor="#131319"
      color="white"
      className="noselect"
      width="100%"
    >
      <Center>
        <Box width={["90vw", "80vw", "70vw", "70vw"]}>
          <Box marginTop="69px" marginBottom="40px">
            <Text color="#C5C7CA" fontWeight="500" fontSize="28px">
              Hello {user.username}
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
          <Box>
            <InfiniteScroll
              dataLength={thoughts.length}
              hasMore={hasMore}
              next={fetchMoreData}
              loader={<h2>Loading...</h2>}
              className="example"
            >
              <Box>
                {thoughts.map((thought, index) => (
                  <ThoughtBox key={index} thought={thought} />
                ))}
              </Box>
            </InfiniteScroll>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Profile;
