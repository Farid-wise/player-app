import { App } from "./components/App";
import { PlayerComponent } from "./components/custom/custom-player.component";
import { usePlayer } from "./hooks/usePlayer";
import { createApp } from "./render/ createApp";

import "./style/app.css";

createApp({
  root: "#app",
  app: App,
  customComponents: [PlayerComponent],
  onInited() {

    const player = usePlayer();
    player.initApp();
  },

});
