import "normalize-css";
import "./styles.scss";
import navigate from "./js/functions/navigate.js";

const modes = ["edit", "search", "report"];

for (let mode of modes)
  document.getElementById(mode).addEventListener("click", navigate(mode));

navigate("edit")();
