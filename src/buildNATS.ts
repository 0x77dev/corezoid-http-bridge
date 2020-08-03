import nats from "nats";
export const buildNC = () => nats.connect({ json: true });

export default buildNC;
