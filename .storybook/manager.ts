import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: "Travel Components UI",
    brandUrl: "https://your-portfolio-link.com",
    brandImage: "https://storybook.js.org/images/logos/icon-storybook.png",
    brandTarget: "_self",
  },
});
