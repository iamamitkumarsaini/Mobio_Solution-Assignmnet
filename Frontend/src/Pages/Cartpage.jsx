import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartData,
  getUserCartData,
  removeDataFromCart,
  updateCartData,
} from "../Redux/AppReducer/action";
import { FaMinus, FaPlus } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

function Cartpage() {
  const dispatch = useDispatch();
  const getCartData = useSelector((state) => state.AppReducer.getCartData);
  const defaultValue = "cod";

  const toast = useToast();

  const totalPrice = getCartData?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalQuantity = getCartData?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const userData = JSON.parse(localStorage.getItem("userData")) || "";
  const navigate = useNavigate();

  const handleCartUpdateDecrease = (elem) => {
    const id = elem._id;
    const quantity = elem.quantity;
    if (quantity > 1) {
      dispatch(updateCartData(id, { quantity: quantity - 1 })).then((res) => {
        if (res) {
          dispatch(getUserCartData());
        }
      });
    } else if (quantity == 1) {
      dispatch(removeDataFromCart(id)).then((res) => {
        if (res) {
          dispatch(getUserCartData());
        }
      });
    }
  };

  const handleCartUpdateIncrease = (elem) => {
    const id = elem._id;
    const quantity = elem.quantity;

    dispatch(updateCartData(id, { quantity: quantity + 1 })).then((res) => {
      if (res) {
        dispatch(getUserCartData());
      }
    });
  };

  const handleOrder = () => {
    if (getCartData.length > 0) {
      dispatch(deleteCartData(userData._id)).then((res) => {
        if (res.payload[0]?.message) {
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
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getUserCartData());
  }, []);

  return (
    <Stack bg={"blackAlpha.100"}>
      <Navbar />
      <Stack
        width={["97%", "97%", "99%"]}
        margin={"auto"}
        spacing={3}
        mt={"100px"}
        py={4}
        minH={"99vh"}
        direction={["column", "column", "row"]}
        bg={"blackAlpha.100"}
        justify={["normal", "normal", "space-between"]}
      >
        <Stack
          display={["block", "block", "none"]}
          w={"90%"}
          ml={"5%"}
          p={4}
          boxShadow={"md"}
          bgColor={"#fff"}
          borderRadius={12}
        >
          <Heading fontSize={"24px"} fontWeight={600}>
            Summary
          </Heading>
          <Flex px={[3, 4]} gap={[1, 4]} direction={["column", "row"]}>
            <Heading fontSize={"20px"} fontWeight={500}>
              Total Items: {getCartData?.length}
            </Heading>
            <Heading fontWeight={500} fontSize={"20px"}>
              Total Price: ${getCartData.length > 0 ? totalPrice : 0}
            </Heading>
          </Flex>

          <Stack my={2} px={[3, 4]}>
            <Heading fontWeight={500} fontSize={"21px"}>
              Method of Payment:
            </Heading>
            <RadioGroup name="payment" defaultValue={defaultValue}>
              <VStack align="start" spacing={2}>
                <Radio value="cod" isChecked={defaultValue === "cod"}>
                  Cash on Delivery
                </Radio>
                <Radio
                  value="cards"
                  isChecked={defaultValue === "cards"}
                  isDisabled={true}
                >
                  Credit/Debit Card
                </Radio>
              </VStack>
            </RadioGroup>
          </Stack>

          <Box mt={2} align={"center"}>
            <Button onClick={handleOrder} colorScheme="green">
              Place Order
            </Button>
          </Box>
        </Stack>

        <Stack width={["90%", "90%", "60%"]} ml={["5%", "5%", "2%"]}>
          {getCartData?.map((elem) => (
            <Flex
              key={elem._id}
              p={3}
              direction={["column", "row", "row"]}
              align={["start"]}
              boxShadow={"md"}
              bg={"#fff"}
              borderRadius={12}
            >
              <Box width={["100%", "auto"]} height={["250px", "200px"]}>
                <Image
                  objectFit="contain"
                  width="100%"
                  height="100%"
                  src={elem.image_url}
                  alt={elem.title}
                />
              </Box>

              <Flex
                w={["auto", "auto", "auto", "full"]}
                direction={["column", "column", "column", "row"]}
                justifyContent={"space-between"}
              >
                <VStack
                  align={"start"}
                  py={[0, 0, 2, 4]}
                  px={4}
                  mb={2}
                  spacing={1}
                >
                  <Heading fontSize={"18px"} fontWeight={500}>
                    {elem.title}
                  </Heading>
                  <Text color={"GrayText"}>Brand: {elem.brand}</Text>
                  <Text color={"GrayText"}>Category: {elem.subCategory}</Text>
                  <Heading fontSize={"20px"} fontWeight={500}>
                    Price: ${elem.price}
                  </Heading>
                </VStack>

                <HStack px={4}>
                  <Text>quantity:</Text>
                  <Button
                    height={"40px"}
                    width={"40px"}
                    onClick={() => handleCartUpdateDecrease(elem)}
                    colorScheme="purple"
                  >
                    <FaMinus size={"27px"} />
                  </Button>
                  <Text>{elem.quantity}</Text>
                  <Button
                    height={"40px"}
                    width={"40px"}
                    onClick={() => handleCartUpdateIncrease(elem)}
                    colorScheme="purple"
                  >
                    <FaPlus size={"27px"} />
                  </Button>
                </HStack>
              </Flex>
            </Flex>
          ))}
        </Stack>

        <Stack
          bg={"#fff"}
          height={"99vh"}
          p={3}
          align={"start"}
          display={["none", "none", "block"]}
          w={["0", "0", "30%"]}
        >
          <Heading mb={8} fontWeight={500}>
            Summary
          </Heading>
          <Stack spacing={1}>
            <Heading fontWeight={500} fontSize={"21px"}>
              Total Items: {getCartData?.length}
            </Heading>
            <Heading fontWeight={500} fontSize={"21px"}>
              Total Quantity: {getCartData.length > 0 ? totalQuantity : 0}
            </Heading>
            <Heading fontWeight={500} fontSize={"21px"}>
              Total Price: ${getCartData.length > 0 ? totalPrice : 0}
            </Heading>
          </Stack>

          <Stack my={12}>
            <Heading fontWeight={500} fontSize={"21px"}>
              Method of Payment
            </Heading>
            <RadioGroup name="payment" defaultValue={defaultValue}>
              <VStack align="start" spacing={2}>
                <Radio value="cod" isChecked={defaultValue === "cod"}>
                  Cash on Delivery
                </Radio>
                <Radio
                  value="cards"
                  isChecked={defaultValue === "cards"}
                  isDisabled={true}
                >
                  Credit/Debit Card
                </Radio>
              </VStack>
            </RadioGroup>
          </Stack>

          <Stack mt={24}>
            <Button onClick={handleOrder} colorScheme="green">
              Place Order
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Cartpage;
