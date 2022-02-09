import Paginator from "./paginator.js";

document.addEventListener("DOMContentLoaded", async function () {
    const paginator = new Paginator(
        "https://reqres.in/api/users",
        2,
        "root"
    );

    await paginator.init();
});
