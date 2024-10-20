export const http = async (url, config) => {
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(JSON.stringify(err, null, 2));
        throw err;
    }
};
