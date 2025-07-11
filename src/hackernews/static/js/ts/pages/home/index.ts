import { HomePage } from "./home-page";

$(document).ready(async () => {
    const controller = new HomePage();
    await controller.control();
});