import React, { useContext, useEffect, useState } from "react";
import RestrauntCard, { withOneDeliveryLabel } from "./RestrauntCard";
import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";

import Unservicable from "./Unservicable";

const Body = () => {
  const [allRestraunts, setAllRestraunts] = useState([]);
  const [filteredRestraunts, setFilteredRestraunts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [showUnservicable, setShowUnservicable] = useState(false);
  const RestrauntCardWithLabel = withOneDeliveryLabel(RestrauntCard);

  const coords = useSelector((store) => store.location.location);
  const city = useSelector((store) => store.location.address.city);
  async function getRestraunt() {
    // const data = await fetch(
    //   // `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    //   // `https://www.swiggy.com/mapi/homepage/getCards?lat=18.5204&lng=73.8567`
    // );

    if (navigator.userAgent.match("Android")) {
      const data = await fetch(
        `https://proxy.cors.sh/https://www.swiggy.com/mapi/homepage/getCards?lat=${coords.latitude}&lng=${coords.longitude}`,
        {
          headers: {
            "x-cors-api-key": "temp_950bc8658fbca3c61bf5e4e12caca84b",
          },
        }
      );
      const dataJSON = await data.json();

      setAllRestraunts(
        dataJSON.data.success.cards[1].gridWidget.gridElements.infoWithStyle
          .restaurants
      );
      setFilteredRestraunts(
        dataJSON.data.success.cards[1].gridWidget.gridElements.infoWithStyle
          .restaurants
      );
    } else {
      const data = await fetch(
        `https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coords.latitude}&lng=${coords.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
        {
          headers: {
            "x-cors-api-key": "temp_950bc8658fbca3c61bf5e4e12caca84b",
          },
        }
      );
      const dataJSON = await data.json();
      if (dataJSON.data.cards[0].card.card.id == "swiggy_not_present") {
        setShowUnservicable(true);
      }

      if (
        dataJSON.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      ) {
        setAllRestraunts(
          dataJSON.data.cards[1].card.card.gridElements.infoWithStyle
            .restaurants
        );
        setFilteredRestraunts(
          dataJSON.data.cards[1].card.card.gridElements.infoWithStyle
            .restaurants
        );
      } else if (
        dataJSON.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      ) {
        setAllRestraunts(
          dataJSON.data.cards[2].card.card.gridElements.infoWithStyle
            .restaurants
        );
        setFilteredRestraunts(
          dataJSON.data.cards[2].card.card.gridElements.infoWithStyle
            .restaurants
        );
      } else {
        setAllRestraunts(
          dataJSON.data.cards[3].card.card.gridElements.infoWithStyle
            .restaurants
        );
        setFilteredRestraunts(
          dataJSON.data.cards[3]?.card.card.gridElements.infoWithStyle
            .restaurants
        );
      }
    }
  }

  useEffect(() => {
    getRestraunt();
  }, []);

  return showUnservicable ? (
    <Unservicable />
  ) : allRestraunts?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="w-full px-[5rem] mt-[66px] max-md:px-1 max-md:mb-[120px]">
      <div className="w-full h-[60px] max-md:h-auto flex justify-between items-center mt-[80px]  max-md:flex-col  max-md:items-start gap-2">
        <div className="w-[50%]  h-[80%] flex justify-between max-md:w-full max-md:text-xl">
          <input
            type="text"
            placeholder="What are you cravinng for..?"
            className="w-full max-md:h-[60px] outline-none px-4 rounded-l-md border-2 border-[#FC8112F]"
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
              className="px-5 py-2 bg-[#FC8112]  text-white rounded-r-md"
              onClick={() => {
                if (searchText !== "") {
                  const matchingRestraunts = allRestraunts.filter((e) =>
                    e.info.name.toLowerCase().includes(searchText)
                  );
                  setFilteredRestraunts(matchingRestraunts);
                  setShowSearch(false);
                }
              }}
            >
              Search
            </button>
          ) : (
            <button
              className="px-5 py-2 bg-[#FC8112]  text-white rounded-r-md"
              onClick={() => {
                setSearchText("");
                setFilteredRestraunts(allRestraunts);
                setShowSearch(true);
              }}
            >
              Cancel
            </button>
          )}
        </div>

        <button
          className=" px-5 py-2 bg-[#FC8112]  text-white duration-200 rounded-md text-xl font-[600] "
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
      <h1 className="text-3xl font-[700] my-5 text-slate-700 ">
        Top Restraunts in {city}
      </h1>
      <div className="grid grid-cols-4 gap-4 justify-items-center max-md:grid-cols-1 max-md:gap-8">
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
