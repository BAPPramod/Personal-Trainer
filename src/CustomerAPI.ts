export const fetchCustomers = async () => {
    const response = await fetch(import.meta.env.VITE_CUSTOMER_API_URL);
    if (!response.ok) {
        throw new Error("Error in fetch: " + response.statusText);
    } else {
        return response.json();
    }
}

export const deleteCustomer = async (url: string) => {
    return fetch(url, { method: "DELETE" }).then((response) => {
        if (!response.ok)
            throw new Error("Error in delete: " + response.statusText);

        return response.json();
    });
}

export const getCustomerById = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
    return await response.json();
}

export const saveCustomer = async (newCustomer: { [key: string]: any }) => {
    const response = await fetch(import.meta.env.VITE_CUSTOMER_API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newCustomer),
    });
    if (!response.ok)
        throw new Error("Error in saving: " + response.statusText);
    return await response.json();
}

export const updateCustomer = async (url: string, updatedCustomer: { [key: string]: any }) => {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedCustomer),
    }).then((response) => {
        if (!response.ok)
            throw new Error("Error in update: " + response.statusText);

        return response.json();
    });
}
