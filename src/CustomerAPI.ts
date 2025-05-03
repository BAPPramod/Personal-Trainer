export const fetchCustomers = async () => {
    const response = await fetch(import.meta.env.VITE_CUSTOMER_API_URL);
    if (!response.ok) {
        throw new Error("Error in fetch: " + response.statusText);
    } else {
        return response.json();
    }
}