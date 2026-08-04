import { useState } from "react";

export function useParams() {
  const today = new Date();
  const [location, setLocation] = useState("");
  const [month, setMonth] = useState(today.getMonth().toString());
  // Function to update Location and Month
  function updateParameters(type: string, value: string) {
    if (type === "location") {
      setLocation(value);
    } else {
      setMonth(value);
    }
  }
  return { updateParameters, location, month };
}
