var Local = {};

Local.validationToken = process.env.VALID_TOKEN || "validation";
Local.fbAccessToken =  process.env.FB_TOKEN || "";

module.exports = Local;