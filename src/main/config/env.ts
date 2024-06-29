export default {
  mongoUrl: 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || '%42%mavinx9',
};
