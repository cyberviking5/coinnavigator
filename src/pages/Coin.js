import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import Info from "../components/CoinPage/Info";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingCoinObject } from "../functions/settingCoinObject";
function Coin() {
    const { id } = useParams();
    const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    setLoading(true);
    let coinData = await getCoinData(id, setError);
    // console.log("Coin DATA>>>>", coinData);
    // setCoin(coinData);
    settingCoinObject(coinData, setCoin);
    // console.log(coin)
    // console.log("dsdvasdva>>"+coin)
    console.log("ajnaosjn>>"+coin.price_change_percentage_24h)
    if (coinData) {
      const prices = await getPrices(id, days, priceType, setError);
      if (prices) {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Header/>
      {loading?(<div>"hi"</div>):(<>
       <div className="grey-wrapper">
            <List coin={coin} delay={0.5} />
          </div> 
           <Info title={coin.name} desc={coin.desc} /> </>)}
    </div>
  )
}

export default Coin
