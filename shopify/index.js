import { TOKEN, STORE, API_VERSION } from "../config.js";
import { http } from "../utils/index.js";

const URL = `https://${STORE}.myshopify.com/admin/api/${API_VERSION}/graphql.json`;

const HEADERS = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": TOKEN,
};

export const queryData = async (query, variables) => {
    const data = await http(URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ query, variables }),
    });

    return data;
};

export const mutateData = async (mutation, variables) => {
    const data = await http(URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ query: mutation, variables }),
    });

    return data;
};
