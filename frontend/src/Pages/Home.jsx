import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import TransactionTable from "../Components/TransactionTable";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import Pagination from "../Components/Pagination";
import { Accoding_Month, AllData, Searching_Data } from "../Redux/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MonthModal from "../Components/MonthModal";
import SelectTag from "../Components/SelectTag";

const Home = () => {
  const [search, setSearch] = useState("");
  const { Transactions } = useSelector(
    (details) => ({
      Transactions: details.TransactionData.data,
    }),
    shallowEqual
  );
  const [page, setPage] = useState(1);
  const limit = useRef(10);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (search === "") {
  //     dispatch(AllData(page, limit.current));
  //   } else {
  //     dispatch(Searching_Data(search));
  //   }
  // }, [search, page, dispatch]); // Include dispatch in the dependency array

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   setTimeout(() => {
  //     setSearch(value); // No need to spread search here
  //   }, 2000);
  // };

  const handleMonth = (e) => {
    dispatch(Accoding_Month(e.target.value));
  };

  return (
    <div className="min-h-[70vh] w-12/12 shadow-2xl m-auto bg-white mt-2">
      <Box className="m-auto w-[95%]">
        <Flex className="justify-between items-center p-4">
          <Flex className="justify-center items-center" gap="10px">
            <FaUserCircle style={{ color: "#1d4ed8", fontSize: "30px" }} />
            <Text className="text-lg text-slate-600">Transactions</Text>
          </Flex>
          {/* <input
            type="text"
            className="rounded-md py-2 px-6"
            placeholder="Search..."
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            onChange={handleChange}
          /> */}
          <SelectTag name="Select Month" fun={handleMonth} />
          <MonthModal />
          <Link to="/chart" className="w-20">
            <Button
              style={{ background: "#1527e6", color: "white" }}
              w="100%"
            >
              Stats
            </Button>
          </Link>
        </Flex>
        <TableContainer mt="20px">
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Category</Th>
                <Th>Sold</Th>
                <Th>Image</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Transactions.length > 0 &&
                Transactions.map((ele, i) => (
                  <TransactionTable key={i} {...ele} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination page={page} setPage={setPage} />
      </Box>
    </div>
  );
};

export default Home;
