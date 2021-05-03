// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://femmor2u:femmor2u@reactreserve.qh756.mongodb.net/reserve?retryWrites=true&w=majority",
    JWT_SECRET: "jdkshdf73j4346sghd",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/femmycodes/image/upload",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
