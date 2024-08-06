import React, { useEffect } from "react";
import useAlert from "../..//hooks/useAlert";
import "./Alert.css";

function Alert() {
  const { message, setMessage } = useAlert();

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(undefined), 6000);
    }
  }, [message]);

  const height = message ? "1.5rem" : 0;

  return (
    <div className="alert-wrapper">
      <div className="alert" style={{ height }}>
        {message}
      </div>
    </div>
  );
}

export default Alert;
