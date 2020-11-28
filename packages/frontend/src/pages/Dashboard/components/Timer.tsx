import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [startTimer, setStartTimer] = useState(Date());
  const [actualTimer, setActualTimer] = useState(Date());

  console.log("before effect");
  useEffect(() => {
    setStartTimer(Date());
    console.log("in effect");
    
  });

return <div>{startTimer}</div>;
};
