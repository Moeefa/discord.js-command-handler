export default (bot, rate) => {
    console.log(`Rate limited ${rate.method.toUpperCase()} at ${rate.path} for ${rate.timeout}ms (limit: ${rate.limit}).`);
};