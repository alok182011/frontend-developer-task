import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";

import moment from "moment";

import { useSelector } from "react-redux";

import "./Profile.css";

import { useParams } from "react-router-dom";

import ThoughtBox from "../../components/ThoughtBox/ThoughtBox";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUserInfo, getUserThoughts } from "../../modules/userModule";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [thoughts, setThoughts] = useState([]);
  const [offset, setOffset] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [receivedUser, setReceivedUser] = useState({
    username: "",
    createdAt: "",
  });

  const { username } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        await getUserInfo(username, user.token, (error, receivedUser) => {
          if (error) {
            alert(error.message);
            setLoading(false);
          } else if (receivedUser) {
            setReceivedUser(receivedUser.data[0]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserThoughts = async () => {
      try {
        await getUserThoughts(
          username,
          0,
          10,
          user.token,
          (error, receivedThoughts) => {
            if (error) {
              alert(error.message);
              setLoading(false);
            } else if (receivedThoughts) {
              if (receivedThoughts.data.length < 10) {
                setHasMore(false);
              }
              setThoughts(receivedThoughts.data);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchUserDetails().then(fetchUserThoughts());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    try {
      await getUserThoughts(
        username,
        offset,
        10,
        user.token,
        (error, receivedThoughts) => {
          if (error) {
            alert(error.message);
          } else if (receivedThoughts) {
            if (receivedThoughts.data.length === 0) {
              setHasMore(false);
            }
            setThoughts([...thoughts, ...receivedThoughts.data]);
          }
        }
      );
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
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Center>
          <Box width={["90vw", "80vw", "70vw", "70vw"]}>
            <Box
              padding="10px"
              border="2px solid #35373B"
              backgroundColor="#27292D"
              borderRadius="8px"
              marginTop="40px"
            >
              <Box>
                <Flex width="100%" borderRadius="8px">
                  <Box width={["20%", "20%", "15%", "10%"]}>
                    <Center height="100%">
                      <Box
                        height="48px"
                        width="48px"
                        borderRadius="50%"
                        backgroundColor="#000000"
                      >
                        <Center height="100%">🐼</Center>
                      </Box>
                    </Center>
                  </Box>
                  <Box width={["80%", "80%", "85%", "90%"]}>
                    <Text color="#FFFFFF" fontSize="18px" fontWeight="700">
                      {receivedUser.username ? receivedUser.username : null}
                    </Text>
                    <Text color="#FFFFFF" fontSize="12px" fontWeight="400">
                      joined {moment(receivedUser.createdAt).fromNow(true)} ago
                    </Text>
                  </Box>
                </Flex>
              </Box>
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
      )}
    </Box>
  );
};

export default Profile;
