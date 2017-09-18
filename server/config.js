module.exports = {
  name: 'Gift Exchange API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  base_url: process.env.BASE_URL || 'http://localhost:3000',
  db: {
    uri: process.env.MYSQL_URI || 'mysql://minamiki.com:3306',
    name: 'gift_exchange',
    user: 'dev',
    password: 'zD9uUgXp'
  }
}
