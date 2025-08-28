import type { Preview } from "@storybook/react";
import "../src/index.css"; // import Tailwind styles

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      // optional if you want dark mode toggle in Storybook UI
      current: "light",
    },
  },
};

export default preview;
