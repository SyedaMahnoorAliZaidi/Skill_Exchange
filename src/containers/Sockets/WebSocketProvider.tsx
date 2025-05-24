import React, { useEffect } from "react";

const WebSocketClient = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };
    socket.onmessage = (event) => {
      console.log("WebSocket message:", event.data);
    };
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return <div>WebSocket Client Active (check console logs)</div>;
};

export default WebSocketClient;
