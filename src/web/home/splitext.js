import React, { useState } from "react";
import Typewriter from "typewriter-effect";

export const Splitext = () => {
  const [showEffect, setshowEffect] = useState("");

  const [bordertype, setbordertype] = useState("");
  const handleMouseEnterr = () => {
    setbordertype("1px solid #484848");
    setshowEffect("cool animation right ? x)");
    setTimeout(()=>{
        setbordertype("");
        setshowEffect("");
    },2000)
    
  };

  return (
    <React.Fragment>
      <div
        style={{
          color:'white',
          border: `${bordertype}`,
          borderRadius: "8px",
        }}
      >
        {" "}
        <span
          onMouseEnter={handleMouseEnterr}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(100)

                .pauseFor(2500)
                .callFunction(() => {
                  console.log("All strings were deleted");
                })
                .start();
            }}
            options={{
              strings: [
                "Welcome to Algo fun",
                "Where i miss around with some algorithms and play around",
                "check it out and feel free to join me :D",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </div>
      <h4
      style ={{
        color : 'grey'
      }}     >
      {showEffect}
      </h4>

    </React.Fragment>
  );
};
