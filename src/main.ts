import { App } from "./components/App";
import { createApp } from "./render/ createApp";
import "./style/app.css";

const app = createApp({
  root: "#app",
  app: App,
  middlewares: [() => console.log(2)],
  onInited() {

    console.log(1);
  },
  beforeInited() {
    console.log(3);
  },

 
 
});


console.log(app);