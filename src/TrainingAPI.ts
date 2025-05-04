export const fetchTrainings = async () => {
  const response = await fetch(import.meta.env.VITE_TRAINING_API_URL);
  if (!response.ok)
    throw new Error("Error in fetch: " + response.statusText);

  const data = await response.json();
  if (!data._embedded || !data._embedded.trainings) return [];

  const trainingWithCustomerPromises = data._embedded.trainings.map(
    async (training: { _links: { customer: { href: string } } }) => {
      try {
        const customerUrl = training._links.customer.href;
        const customerResponse = await fetch(customerUrl);
        if (!customerResponse.ok)
          throw new Error("Error fetching customer: " + customerResponse.statusText);

        const customerData = await customerResponse.json();
        return { ...training, customer: customerData };
      } catch (err) {
        console.error("Error fetching customer:", err);
        return { ...training, customer: null };
      }
    }
  );

  return await Promise.all(trainingWithCustomerPromises);
};


export const saveTraining = async (newTraining: { date: string; duration: string; activity: string; customer: string; }) =>  {
  return fetch(import.meta.env.VITE_TRAINING_API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTraining),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in saving: " + response.statusText);

    return response.json();
  });
}

export const deleteTraining = async (url: string) => {
  return fetch(url, { method: "DELETE" }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete: " + response.statusText);
    return response.json();
  });
}

