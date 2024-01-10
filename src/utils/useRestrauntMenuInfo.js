import { useEffect, useState } from "react";

const useRestrauntMenuInfo = (resId) => {
  const [restrauntInfo, setRestrauntInfo] = useState();

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
      console.log(dataJSON, "info");
      setRestrauntInfo(dataJSON.data.cards[2].card.card.info);
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
      setRestrauntInfo(dataJSON?.data?.cards[0]?.card?.card?.info);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return restrauntInfo;
};

export default useRestrauntMenuInfo;
