import React, { useEffect } from 'react';
import { Box, Button, Flex, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCartData, removeDataFromCart, updateCartData } from '../Redux/AppReducer/action';
import { FaMinus, FaPlus } from 'react-icons/fa';

function Cartpage() {

    const dispatch = useDispatch();
    const getCartData = useSelector((state) => state.AppReducer.getCartData);


    const handleCartUpdateDecrease = (elem) => {
        const id = elem._id;
        const quantity = elem.quantity;
        if(quantity>1){
            dispatch(updateCartData(id,{quantity: quantity-1})).then((res) => {
                if(res){
                    dispatch(getUserCartData());
                }
            })
        }
        else if(quantity==1){
            console.log("amit")
            dispatch(removeDataFromCart(id)).then((res) => {
                if(res){
                    dispatch(getUserCartData());
                }
            })
        }
    }

    const handleCartUpdateIncrease = (elem) => {
        const id  = elem._id;
        const quantity  = elem.quantity;
        console.log(id,quantity)

        dispatch(updateCartData(id,{quantity: quantity+1})).then((res) => {
            if(res){
                dispatch(getUserCartData());
            }
        })
    }

    useEffect(() => {
        dispatch(getUserCartData());
    },[])

    return (
        <Stack width={["90%","90%","60%"]} spacing={3}>
            {
                getCartData?.map((elem) => (
                  <Flex key={elem._id} p={3} direction={["column", "row","row"]} align={"start"} boxShadow={"md"} bg={"#fff"} borderRadius={12} >
                    <Box height={"200px"}>
                        <Image objectFit="contain" width="100%" height="100%" src={elem.image_url} alt={elem.title} />
                    </Box>

                    <Flex border={"0px solid red"} w={["auto","auto","auto","full"]} direction={["column","column","column","row"]} justifyContent={"space-between"}>

                    <VStack align={"start"} py={[0,0,2,4]} px={4} mb={2} spacing={1}>
                        <Heading fontSize={"18px"} fontWeight={500}>{elem.title}</Heading>
                        <Text color={"GrayText"}>Brand: {elem.brand}</Text>
                        <Text color={"GrayText"}>Category: {elem.subCategory}</Text>
                        <Heading fontSize={"20px"} fontWeight={500}>Price: ${elem.price}</Heading>
                    </VStack>

                    <HStack  border={"0px solid red"} px={4}>
                        <Text>quantity:</Text>
                            <Button height={"40px"} width={"40px"} onClick={() => handleCartUpdateDecrease(elem)} colorScheme="purple"><FaMinus size={"27px"} /></Button>
                            <Text>{elem.quantity}</Text>
                            <Button height={"40px"} width={"40px"} onClick={() => handleCartUpdateIncrease(elem)} colorScheme="purple"><FaPlus size={"27px"} /></Button>
                    </HStack>


                    </Flex>


                  </Flex>
                ))
            }

        </Stack>
    );
}

export default Cartpage;