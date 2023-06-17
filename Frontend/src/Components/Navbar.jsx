import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartData } from "../Redux/AppReducer/action";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const getCartData = useSelector((state) => state.AppReducer.getCartData);
  const token = JSON.parse(localStorage.getItem("mobioToken")) || "";
  const userData = JSON.parse(localStorage.getItem("userData")) || "";

  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = (e) => {
    if (e.target.value === "Login") {
      navigate("/login");
    } else if (e.target.value === "Logout") {
      localStorage.removeItem("mobioToken");
      localStorage.removeItem("userData");
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getUserCartData());
  }, []);

  return (
    <Stack
      direction={"row"}
      align={"center"}
      justifyContent={"space-between"}
      boxShadow={"md"}
      bg={"#fff"}
      position={"fixed"}
      top={0}
      zIndex={3}
      width={"100%"}
      p={4}
    >
      <Stack>
        <Heading fontSize={"21px"} fontWeight={500}>
          <Link href="/">Mobio</Link>
        </Heading>
      </Stack>
      <Stack direction={"row"} spacing={20} display={["none", "none", "flex"]}>
        <Button onClick={handleCart}>
          <FaShoppingCart /> &nbsp;{" "}
          <Text fontSize={"21px"}>{token ? getCartData?.length : ""}</Text>
        </Button>

        <Stack
          direction={"row"}
          align={"center"}
          spacing={userData.name ? 6 : 1}
        >
          <Button
            onClick={handleSignup}
            display={userData.name ? "none" : "block"}
          >
            Signup
          </Button>
          <Heading fontSize={"21px"} fontWeight={500}>
            {userData.name}
          </Heading>
          <Button
            onClick={(e) => handleLogin(e)}
            value={userData.name ? "Logout" : "Login"}
          >
            {userData.name ? "Logout" : "Login"}
          </Button>
        </Stack>
      </Stack>

      <Stack
        display={["flex", "flex", "none"]}
        spacing={[4, 12]}
        direction={"row"}
      >
        <Stack>
          <Button onClick={handleCart}>
            <FaShoppingCart /> &nbsp;{" "}
            <Text fontSize={"21px"}>{token ? getCartData?.length : ""}</Text>
          </Button>
        </Stack>

        <Stack>
          <Button colorScheme="blue" onClick={onOpen}>
            <FaBars />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Menu Options</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack align={"start"} spacing={userData.name ? 6 : 1}>
                  <Button
                    onClick={handleSignup}
                    display={userData.name ? "none" : "block"}
                  >
                    Signup
                  </Button>
                  <Heading fontSize={"21px"} fontWeight={500}>
                    {userData.name}
                  </Heading>
                  <Button
                    onClick={(e) => handleLogin(e)}
                    value={userData.name ? "Logout" : "Login"}
                  >
                    {userData.name ? "Logout" : "Login"}
                  </Button>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="whiteAlpha"
                  variant="ghost"
                  onClick={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Navbar;
