export const fetchTrainings = async () => {
  const response = await fetch(import.meta.env.VITE_TRAINING_API_URL);
  if (!response.ok)
    throw new Error("Error in fetch: " + response.statusText);
  const data = await response.json();
  // Fetch the customer data for each training
  const trainingWithCustomerPromises = data._embedded.trainings.map(
    async (training: { _links: { customer: { href: string; }; }; }) => {
      const customerUrl = training._links.customer.href;
      const customerResponse = await fetch(customerUrl);
      if (!customerResponse.ok)
        throw new Error(
          "Error fetching customer: " + customerResponse.statusText
        );
      const customerData = await customerResponse.json();
      return { ...training, customer: customerData };
    }
  );
  return await Promise.all(trainingWithCustomerPromises);
}