import React, { useContext, useEffect, useState } from "react";
import RestrauntCard, { withOneDeliveryLabel } from "./RestrauntCard";
import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";

const Body = () => {
  const [allRestraunts, setAllRestraunts] = useState([]);
  const [filteredRestraunts, setFilteredRestraunts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const RestrauntCardWithLabel = withOneDeliveryLabel(RestrauntCard);
  const coords = useSelector((store) => store.location.location);
  const city = useSelector((store) => store.location.city.city);
  async function getRestraunt() {
    // const data = await fetch(
    //   `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    // );
    const data = await fetch(
      // `https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      `https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coords.latitude}&lng=${coords.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "x-cors-api-key": "temp_950bc8658fbca3c61bf5e4e12caca84b",
        },
      }
    );
    const dataJSON = await data.json();
    setAllRestraunts(
      // dataJSON.data.cards[3]?.card?.card?.gridElements?.infoWithStyle
      //   // ?.restaurants
      dataJSON.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestraunts(
      // dataJSON.data.cards[3]?.card?.card?.gridElements?.infoWithStyle
      //   ?.restaurants
      dataJSON.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );
  }

  useEffect(() => {
    getRestraunt();
  }, []);

  return allRestraunts?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="w-full px-[5rem] mt-[66px]">
      <div className="w-full h-[60px] flex justify-between items-center ">
        <div className="w-[50%] bg-red-300 h-[80%] flex justify-between">
          <input
            type="text"
            placeholder="What are you cravinng for..?"
            className="w-full outline-none px-4"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value.toLowerCase());
              if (event.target.value == "") {
                setFilteredRestraunts(allRestraunts);
                setShowSearch(true);
              }
            }}
          />

          {showSearch ? (
            <button
              className="px-5 py-2 bg-gray-300 hover:bg-gray-400"
              onClick={() => {
                const matchingRestraunts = allRestraunts.filter((e) =>
                  e.info.name.toLowerCase().includes(searchText)
                );
                setFilteredRestraunts(matchingRestraunts);
                setShowSearch(false);
              }}
            >
              Search
            </button>
          ) : (
            <button
              className="px-5 py-2 bg-gray-300 hover:bg-gray-400"
              onClick={() => {
                setSearchText("");
                setFilteredRestraunts(allRestraunts);
              }}
            >
              Cancel
            </button>
          )}
        </div>
        {/* <label htmlFor="username">USername : </label>
        <input
          type="text"
          name="username"
          className="bg-red-400"
          onChange={(e) => setUserName(e.target.value)}
        /> */}
        <button
          className="bg-gray-300 px-5 py-2 hover:bg-gray-400 duration-200"
          onClick={() => {
            const filteredList = allRestraunts.filter(
              (res) => res.info.avgRating >= 4.3
            );
            setAllRestraunts(filteredList);
          }}
        >
          Top Rated
        </button>
      </div>
      <h1>Top Restraunts in {city}</h1>
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {filteredRestraunts?.map((e) => {
          return e.info.id % 2 == 0 ? (
            <RestrauntCardWithLabel
              resData={e}
              key={`withLabel_${e.info.id}`}
            />
          ) : (
            <RestrauntCard resData={e} key={`withoutLabel_${e.info.id}`} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
