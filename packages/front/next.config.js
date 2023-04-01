/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    domains: ["picsum.photos"],
    loader: "akamai",
    path: "",
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: true,
    images: {
      allowFutureImage: true,
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "variables";
                  @import "mixins";`,
  },
};

module.exports = nextConfig;
