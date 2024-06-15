import React, { useEffect, useState } from "react";
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import TopButton from "../components/Common/TopButton";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log(response.data);
        setCoins(response.data);
        setPaginatedCoins(response.data.slice(0,10)) ;
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  var filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
  );
  const handlePageChange = (event, value) => {
    setPage(value);
    var initialCount = (value - 1) * 10;
    setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
  };
  return (
    <div>
      <Header/>
      <TopButton /> 
      {loading?(<Loader/>):(
        <>
      <Search search={search} handleChange={handleChange}/>
      <TabsComponent coins={search ? filteredCoins : paginatedCoins}/>
      {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}</>)}

    </div>
  )
}

export default Dashboard
