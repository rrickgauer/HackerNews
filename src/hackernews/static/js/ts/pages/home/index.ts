import { HomePage } from "./HomePage";

$(document).ready(async () => {
    const controller = new HomePage();
    await controller.control();
});