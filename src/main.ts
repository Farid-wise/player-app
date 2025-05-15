import { App } from "./components/App";
import { usePlayer } from "./hooks/usePlayer";
import { createApp } from "./render/ createApp";
import { defineCustomTag } from "./utils/custom-elems";

import "./style/app.css";

createApp({
  root: "#app",
  app: App,
  middlewares: [() => {}],
  onInited() {
    const player = usePlayer();
    player.initApp();
  },
  beforeInited() {
    defineCustomTag<{ name: string }>(
      "user-card",
      (props) => `
     <div>${props.name}</div>
    
    `,
      `
     div {
        color: red;
     }
    
    `
    );
  },
});
