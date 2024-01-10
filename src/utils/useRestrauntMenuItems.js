import { useEffect, useState } from "react";

const useRestrauntMenuItems = (resId) => {
  const [restrauntItems, setRestrauntItems] = useState();

  const fetchData = async () => {
    // const data = await fetch(
    //   `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6378568&lng=77.23810859999999&restaurantId=${resId}`
    // );
    if (navigator.userAgent.match("Android")) {
      const data = await fetch(
        `https://proxy.cors.sh/https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.390357109608406&lng=76.75831396132708&restaurantId=${resId}&isMenuUx4=true&submitAction=ENTER`,
        {
          headers: {
            "x-cors-api-key": "temp_950bc8658fbca3c61bf5e4e12caca84b",
          },
        }
      );
      const dataJSON = await data.json();
      console.log(dataJSON);
      setRestrauntItems(
        dataJSON.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards
      );
    } else {
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return restrauntItems;
};

export default useRestrauntMenuItems;
