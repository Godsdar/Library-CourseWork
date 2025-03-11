import "normalize-css";
import "./styles.scss";
import navigate from "./js/functions/navigate.js";

const modes = ["main", "edit", "search", "report"];

for (let mode of modes)
  document.getElementById(mode).addEventListener("click", navigate(mode));

navigate("main")();
