module.exports = {
  async rewrites() {
    return [{ source: "/submit_phone", destination: "/api" }];
  },
};