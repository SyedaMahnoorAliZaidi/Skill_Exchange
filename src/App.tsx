import React from "react";
import MyRouter from "routers/index";
import Socket from "containers/Sockets/WebSocketProvider";

function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Socket />
      {/* <Header3 /> */}
      {/* <LandingPageHeader /> */}
      {/* <PageHome2 /> */}
      {/* <SiteHeader /> */}
      {/* <WebSocketClient /> */}
      <MyRouter />
    </div>
  );
}

export default App;
