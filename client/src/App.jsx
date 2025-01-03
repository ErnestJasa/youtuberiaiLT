import { Route, Router, Switch } from "wouter";
import Home from "./pages/Home";
import Moderation from "./pages/Moderation";
import { useEffect } from "react";
import { getChannels } from "./api";
import { ModerationProvider } from "./context/ModerationContext";
import Suggestion from "./pages/Suggestion";

// bg-[#0f0f0f]
function App() {
  return (
    <main className="min-h-full font-bbz-Regular">
      <Router base="/">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/kanalu-pasiulymai">
            <Suggestion />
          </Route>
          <Route path="/electrical">
            <ModerationProvider>
              <Moderation />
            </ModerationProvider>
          </Route>
          <Route path="/*">
            <div className="w-full flex justify-center text-center text-4xl pt-24 text-white">
              Page Not Found
            </div>
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
