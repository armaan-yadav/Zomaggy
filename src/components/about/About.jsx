import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-[70px] flex flex-col text-3xl font-[600] px-3 gap-5">
      <span>kya karoge hamare baare jaan kar?</span>
      <span>
        <Link
          to={"https://github.com/armaan-yadav/Swiggy-Clone"}
          target="_blank"
        >
          Click here for Source Code
        </Link>
      </span>
    </div>
  );
};

export default About;
