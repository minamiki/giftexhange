module.exports = {
  name: 'Gift Exchange API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  base_url: process.env.BASE_URL || 'http://localhost:3000',
  db: {
    connectionLimit: 100,
    host: 'minamiki.com',
    port: '3306',
    database: 'gift_exchange',
    user: 'dev',
    password: 'zD9uUgXp'
  },
  email: {
    client_base_url: 'http://minamiki.com:8128',
    asset_base_url: 'http://giftexchange.minamiki.com/images',
    port: 25,
    host: 'localhost'
  }
}
