import InitPagination from "./init.js";
document.addEventListener("DOMContentLoaded", async function () {
  const initPagination = new InitPagination(
      "https://reqres.in/api/users",
       2,
      "root"
  );

  await initPagination.init();
});
