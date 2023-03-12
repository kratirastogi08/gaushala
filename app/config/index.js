const { env } = process;
let envFile = ".env";

if (env.NODE_ENV)
{
    switch (env.NODE_ENV.toString().trim())
    {
        case "development":
            envFile = ".env.development";
            break;
        case "production":
            envFile = ".env.production";
            break;
        case "test":
            envFile = ".env.test";
    }
}
require('dotenv').config({ path: `./${envFile}`, silent: true })
module.exports = {
  host: env.HOST,
  httpPort: env.HTTP_PORT,
  httpsPort: env.HTTPS_PORT,
  secret: env.SECRET,
  resetPasswordUrl: env.RESET_PASSWORD_URL,
  mongodbUserUri: env.MONGODB_USER_URI,
  SERVER_URL: env.SERVER_URL,
  appName: env.APP_NAME,
  writeLogsToFile: env.WRITE_LOGS_TO_FILE === true,
  expiresIn: env.EXPIRES_IN,
};