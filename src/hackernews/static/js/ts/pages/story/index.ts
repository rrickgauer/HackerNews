import { StoryPage } from "./StoryPage";

$(document).ready(async () => {
    const storyPage = new StoryPage();
    await storyPage.control();
});