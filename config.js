if (process.env.NODE_ENV === 'prod') {
    module.exports = {
        mongoUri: process.env.LPS_MONGO_URI ,
        jwt: 'jwt',
        hostPort: 7100
    };
} else {
    module.exports = {
        mongoUri: 'mongodb://localhost:27017/lps',
        jwt: 'dev-jwt',
        hostPort: 5000
    };
}