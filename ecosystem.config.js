module.exports = {
  apps: [
    {
      name: "sully-website",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/home/deploy/workspace/sully-website.eductool.com",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
