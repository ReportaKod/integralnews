import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...coreWebVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
  },
  {
    // Generated files
    ignores: ["schema.json", "sanity.types.ts", ".next/**", "node_modules/**"],
  },
];

export default config;
