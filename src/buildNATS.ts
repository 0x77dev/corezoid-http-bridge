import nats from "nats";
export const buildNC = () => nats.connect(process.env.NATS_HOST, { json: true, pass: process.env.NATS_PASSWORD, user: process.env.NATS_USERNAME });

export default buildNC;
