import { Box, Button, Flex, Grid, GridItem, Heading, Image, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Stack, Text, VStack, useToast, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsData, getUserCartData, postAddToCartData } from '../Redux/AppReducer/action';
import { FaShoppingCart } from 'react-icons/fa';
import { BsFilterLeft } from "react-icons/bs";
import { Search2Icon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";

function Homepage() {

    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const initialPage = parseInt(queryParams.get("page")) || 1;
    const initialSort = queryParams.get("sort") || "";
    const initialSearch = queryParams.get("search") || "";

    const [page, setPage] = useState(initialPage);
    const [sort, setSort] = useState(initialSort);
    const [search, setSearch] = useState(initialSearch);
    const [isClicked, setIsClicked] = useState(false)
    

    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();

    const dispatch = useDispatch();
    const products = useSelector((state) => state.AppReducer.products);
    const totalCount = useSelector((state) => state.AppReducer.totalCount);
    const isLoading = useSelector((state) => state.AppReducer.isLoading);
    const getCartData = useSelector((state) => state.AppReducer.getCartData);

    const userData = JSON.parse(localStorage.getItem("userData")) || ""

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
    
        const searchParams = new URLSearchParams(location.search);
        const sortParams = searchParams.get("sort");
        const searchingParams = searchParams.get("search");
    
        if (sortParams && searchingParams) {
          searchParams.set("page", nextPage);
          navigate(`${location.pathname}?${searchParams.toString()}`);
        } else if (sortParams) {
          searchParams.set("page", nextPage);
          navigate(`${location.pathname}?${searchParams.toString()}`);
        } else if (searchingParams) {
          searchParams.set("page", nextPage);
          navigate(`${location.pathname}?${searchParams.toString()}`);
        } else {
          navigate(`${location.pathname}?page=${nextPage}`);
        }
      };


      const handlePreviousPage = () => {
        const prevPage = page - 1;
        setPage(prevPage);
    
        const searchParams = new URLSearchParams(location.search);
        const sortParams = searchParams.get("sort");
        const searchingParams = searchParams.get("search");
    
        if (prevPage === 1) {
          searchParams.delete("page");
        } else {
          if (sortParams && searchingParams) {
            searchParams.set("page", prevPage);
          } else if (sortParams) {
            searchParams.set("page", prevPage);
          } else if (searchingParams) {
            searchParams.set("page", prevPage);
          } else {
            searchParams.set("page", prevPage);
          }
        }
    
        navigate(`${location.pathname}?${searchParams.toString()}`);
      };

      const handleInputChange = (e) => {
        const val = e.target.value;
        setSearch(val);
    
        const searchParams = new URLSearchParams(location.search);
        const pageParams = searchParams.get("page");
        const sortParams = searchParams.get("sort");
    
        if (val === "") {
          searchParams.delete("search");
        } else {
          if (sortParams && pageParams) {
            searchParams.set("search", val);
          } else if (sortParams) {
            searchParams.set("search", val);
          } else if (pageParams) {
            searchParams.set("search", val);
          } else {
            searchParams.set("search", val);
          }
        }
    
        navigate(`${location.pathname}?${searchParams.toString()}`);
      };

 

    const handleSelectChange = (e) => {
        const selected = e.target.value || e.target.dataset.value;
        setSort(selected);
    
        const searchParams = new URLSearchParams(location.search);
        const pageParams = searchParams.get("page");
        const searchingParams = searchParams.get("search");
    
        if (!selected) {
          searchParams.delete("sort");
        } else {
          if (searchingParams && pageParams) {
            searchParams.set("sort", selected);
          } else if (searchingParams) {
            searchParams.set("sort", selected);
          } else if (pageParams) {
            searchParams.set("sort", selected);
          } else {
            searchParams.set("sort", selected);
          }
        }
    
        navigate(`${location.pathname}?${searchParams.toString()}`);
        handleClose();
      };

      const handleAddToCart = (elem) => {
        const { title, image_url, brand, subCategory, price } = elem;
        const product_id = elem._id;
        const quantity = 1;

        dispatch(postAddToCartData({title,image_url,brand,subCategory,price,product_id,quantity}))
        .then((res) => {
            if(res.payload[0].message){
                toast({
                    title: res.payload[0].message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                  });

                  dispatch(getUserCartData())
            }
        })
      }

      getCartData.length>0 && console.log(getCartData)
    useEffect(() => {
        dispatch(getProductsData(page,search,sort))
        dispatch(getUserCartData())
    },[page,sort,search])

    return (
        <Stack border={"2px solid red"} width={"98%"} m={"auto"} bg={"blackAlpha.100"} >

        <Flex
            align={"center"}
            justify={"space-between"}
            bg={"#fff"}
            px={[2,6]}
            py={3}
            mb={3}
        >
            <Stack borderBottom={"2px solid gray"}>
              <InputGroup>
                <InputLeftElement>
                  <Search2Icon color="gray.300" />
                </InputLeftElement>
                <Input
                  border={"none"}
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Stack>

            <Stack
              direction={"row"}
              display={["none", "none", "flex"]}
              minW={["30%", "18%", "28%", "20%"]}
              align={"center"}
            >
              <Text color={"gray.500"} fontSize={"16px"}>
                Sort&nbsp;By&nbsp;:
              </Text>
              <Select
                onChange={handleSelectChange}
                fontSize={"16px"}
                fontWeight={400}
                color={"blackAlpha.900"}
                value={sort}
              >
                <option value="">Select any</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
              </Select>
            </Stack>

            <Box display={["block", "block", "none"]}>
              <BsFilterLeft
                _hover={{ cursor: "pointer" }}
                fontSize={"2rem"}
                onClick={handleOpen}
              />

              <Modal
                isOpen={isOpen}
                onClose={handleClose}
                motionPreset="slideInBottom"
              >
                <ModalOverlay />
                <ModalContent
                  position="fixed"
                  maxW={["90%", "60%"]}
                  top={[16]}
                >
                  <ModalHeader>Sort Products By</ModalHeader>
                  <ModalCloseButton />

                  <ModalBody>
                    <Stack spacing={3} pb={2}>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value=""
                        onClick={handleSelectChange}
                      >
                        Reset
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="title"
                        onClick={handleSelectChange}
                      >
                        Title
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="price"
                        onClick={handleSelectChange}
                      >
                        Price
                      </Text>
                    </Stack>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>



            <Grid mb={12} templateColumns={["repeat(1,1fr)","repeat(2,1fr)","repeat(3,1fr)","repeat(4,1fr)",]} columnGap={4} rowGap={4}>
            {
                products?.map((elem) => {
                
                    const isAddToCart = getCartData?.some((ele) => ele.product_id === elem._id)
                    console.log(isAddToCart);
                
                return (
                    <GridItem key={elem._id} gap={3} boxShadow={"md"} bg={"#fff"} >
                        <Box p={4} height={"300px"}><Image objectFit="contain" width="100%" height="100%" src={elem.image_url} alt={elem.title} /></Box>
                        <VStack align={"start"} p={4} mb={2} spacing={1}>
                        <Heading fontSize={"18px"} fontWeight={500}>{elem.title}</Heading>
                        <Text color={"GrayText"}>Brand: {elem.brand}</Text>
                        <Text color={"GrayText"}>Category: {elem.subCategory}</Text>
                        <Heading fontSize={"20px"} fontWeight={500}>Price: ${elem.price}</Heading>
                        </VStack>
                        <Stack mb={8}>
                            <Button colorScheme='blue' alignSelf={"center"} isDisabled={isAddToCart} onClick={() => handleAddToCart(elem)} >
                                {
                                    isAddToCart ? "Added To Cart" : "Add to Cart"
                                }
                                &nbsp;<FaShoppingCart /> </Button>
                        </Stack>
                    </GridItem>
                )
              })
            }
            </Grid>

            <Stack 
            align={"center"}
            justifyContent={"center"}
            direction={"row"}
            mb={16}
          >
            <Button
              isDisabled={page == 1}
              colorScheme="teal"
              onClick={handlePreviousPage}
            >
              Prev
            </Button>
            <Text fontWeight={500} fontSize={"24px"} px={2}>
              {page}
            </Text>
            <Button
              isDisabled={page == Math.ceil(totalCount / 12)}
              colorScheme="teal"
              onClick={handleNextPage}
            >
              Next
            </Button>
          </Stack>
        </Stack>
    );
}

export default Homepage;