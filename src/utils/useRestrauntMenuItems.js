import { useEffect, useState } from "react";

const useRestrauntMenuItems = (resId) => {
  const [restrauntItems, setRestrauntItems] = useState();

  const fetchData = async () => {
    // const data = await fetch(
    //   `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6378568&lng=77.23810859999999&restaurantId=${resId}`
    // );
    const data = await fetch(
      `https://proxy.cors.sh/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6378568&lng=77.23810859999999&restaurantId=${resId}`,
      {
        headers: {
          "x-cors-api-key": "temp_950bc8658fbca3c61bf5e4e12caca84b",
        },
      }
    );
    const dataJSON = await data.json();
    setRestrauntItems(
      dataJSON?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  return restrauntItems;
};

export default useRestrauntMenuItems;
