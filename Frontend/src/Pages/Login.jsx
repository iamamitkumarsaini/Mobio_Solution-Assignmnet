import React, { useState } from "react";
import {
  Button,
  VStack,
  InputGroup,
  InputRightElement,
  Link,
  Input,
  Stack,
  Text,
  HStack,
  FormLabel,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { postLoginUser } from "../Redux/AuthReducer/action";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AuthReducer.isLoading);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailEmpty(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordEmpty(false);
  };

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      setIsEmailEmpty(true);
    }
    if (password.trim() === "") {
      setIsPasswordEmpty(true);
    } else {
      dispatch(postLoginUser({ email, password }))
        .then((res) => {
          if (res.payload[0].message === "Logged In successfully") {
            toast({
              title: res.payload[0].message,
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top",
            });

            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            toast({
              title: res.payload[0].message,
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Stack align={"center"} bgColor={"blackAlpha.50"} height={"99vh"}>
      <VStack
        align={["start", "center"]}
        spacing={isEmailEmpty ? [2] : [4]}
        width={["90%", "410px"]}
        py={["45px"]}
        px={[8]}
        mt={16}
        mb={16}
        borderRadius={"md"}
        boxShadow={["md"]}
        bgColor={["#fff"]}
      >
        <Text mb={4} fontSize={"20px"}>
          Login to get Started
        </Text>
        <InputGroup pb={isEmailEmpty ? "0px" : 4} border={"0px solid red"}>
          <VStack alignItems="flex-start" width="100%">
            <FormLabel
              color={isEmailEmpty ? "red" : "grey"}
              mb={"-7px"}
              fontSize={"16px"}
              fontWeight="thick"
            >
              Email
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={isEmailEmpty}
            />
            {isEmailEmpty && (
              <Text color="red.500" fontSize={"15px"} fontWeight={500}>
                Email is required
              </Text>
            )}
          </VStack>
        </InputGroup>
        <InputGroup border={"0px solid red"} pb={3}>
          <VStack alignItems="flex-start" width="100%">
            <FormLabel
              color={isPasswordEmpty ? "red" : "grey"}
              mb={"-7px"}
              fontSize={"16px"}
              fontWeight="thick"
            >
              Password
            </FormLabel>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              isInvalid={isPasswordEmpty}
            />
            <HStack
              justifyContent={!isPasswordEmpty ? "right" : "space-between"}
              w={"100%"}
            >
              {isPasswordEmpty && (
                <Text color="red.500" fontSize={"15px"} fontWeight={500}>
                  Password is required
                </Text>
              )}
              <Link color="blue.500" fontSize={"15px"} fontWeight={500}>
                Forgot password?
              </Link>
            </HStack>
          </VStack>
          <InputRightElement mt={["26px"]}>
            <Button variant="ghost" size="sm" onClick={handlePasswordShow}>
              {showPassword ? (
                <ViewOffIcon fontSize={"21px"} />
              ) : (
                <ViewIcon fontSize={"21px"} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        {isLoading ? (
          <Spinner size={"md"} />
        ) : (
          <Button
            colorScheme="blue"
            px={[0, 16]}
            width={["100%", "auto"]}
            borderRadius={24}
            h={"40px"}
            onClick={handleSubmit}
          >
            Login
          </Button>
        )}

        <HStack alignSelf={"start"}>
          <Text>Not Registered? Signup</Text>
          <Link color={"blue.400"} href="/signup">
            here
          </Link>
        </HStack>
      </VStack>
    </Stack>
  );
}

export default Login;
