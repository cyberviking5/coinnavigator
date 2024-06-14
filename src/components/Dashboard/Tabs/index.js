import React from 'react'
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./styles.css";
import Grid from '../Grid';
import Button from "../../Common/Button";
import List from "../List";

function TabsComponent({coins}) {
  const [value, setValue] = React.useState("grid");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    color: "var(--white)",
    "& .Mui-selected": {
      color: "var(--blue) !important",
    },
    fontFamily: "Inter,sans-serif",
    fontWeight: 600,
    textTransform: "capitalize",
  };
  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} variant="fullWidth">
        <Tab label="Grid" value="grid" sx={style}/>
        <Tab label="List" value="list" sx={style}/>
      </TabList>
    <TabPanel value="grid">
      <div className="grid-flex">
        {coins.map((coin,i)=>{
          return (
            <Grid key={i} coin={coin}/>
          )
        })}
      </div>
    </TabPanel>
    <TabPanel value="list">
      <table className="list-flex">
      {coins.length > 0 ? (
            coins.map((coin, i) => (
              <List coin={coin} key={i} delay={(i % 8) * 0.2} />
            ))
          ) : (
            <div>
              <h1 style={{ textAlign: "center" }}>
                Sorry, Couldn't find the coin you're looking for 😞
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem",
                }}
              >
                <Button text="Clear Search" />
              </div>
            </div>
          )}
      </table>
    </TabPanel>
  </TabContext>
  )
}

export default TabsComponent
