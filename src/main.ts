import { App } from "./components/App";
import { usePlayer } from "./hooks/usePlayer";
import { createApp } from "./render/ createApp";

import "./style/app.css";

createApp({
  root: "#app",
  app: App,
  middlewares: [() => {}],
  onInited() {

    const player = usePlayer()
    player.initApp()



  },
  beforeInited() {
  },

 
 
});




