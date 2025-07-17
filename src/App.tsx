import React from "react";
import MyRouter from "routers/index";
import Socket from "containers/Sockets/WebSocketProvider";
import { AuthProvider } from "./context/AuthContext";
import { ListingFormProvider } from "./context/ListingFormProvider";
import ChatBot from "components/ChatBot/ChatBot";


function App() {
  return (
    <AuthProvider>
    <ListingFormProvider>
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      {/* <Socket /> */}
      {/* <Header3 /> */}
      {/* <LandingPageHeader /> */}
      {/* <PageHome2 /> */}
      {/* <SiteHeader /> */}
      {/* <WebSocketClient /> */}
      <MyRouter />
      <ChatBot />
    </div>
    </ListingFormProvider>
    </AuthProvider>
  );
}

export default App;
