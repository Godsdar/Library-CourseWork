import anime from "animejs";
import selectTableHandler from "../../edit-mode.js";
import searchHandler from "../../search-mode.js";
import createReportBookLending from "../../report-mode.js";

function navigate (mode) {
  return async function () {
    const response = await fetch(`//localhost:3000/modes/${mode}-mode.php`);
    const content = await response.text();
    document.querySelector(".page-content").innerHTML = content;
    switch (mode) {
      case "edit":
        document.forms["select-table-form"].addEventListener("submit", selectTableHandler);
        anime({
          targets: "fieldset",
          duration: 5000,
          opacity: 1,
        });
        break;
      case "search":
        document.forms["search-form"].addEventListener("submit", searchHandler);
        anime({
          targets: "fieldset",
          duration: 5000,
          opacity: 1,
        });
        break;
      case "report":
        document.forms["report-form"].addEventListener("submit", createReportBookLending);
        anime({
          targets: "fieldset",
          duration: 5000,
          opacity: 1,
        });
        break;
    }
  }
}

export default navigate;
