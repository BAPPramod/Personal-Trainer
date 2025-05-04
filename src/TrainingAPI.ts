import { NewTraining, Training, Customer, TrainingWithCustomer } from "./types";

export const fetchTrainings = async (): Promise<TrainingWithCustomer[]> => {
  const response = await fetch(import.meta.env.VITE_TRAINING_API_URL);
  if (!response.ok)
    throw new Error("Error fetching trainings: " + response.statusText);
  const data = await response.json();

  if (!data._embedded || !data._embedded.trainings) return []; // Ensure trainings exist

  const trainingWithCustomerPromises = data._embedded.trainings.map(
    async (training: Training) => {
      try {
        const customerUrl = training._links.customer.href;
        const customerResponse = await fetch(customerUrl);
        if (!customerResponse.ok)
          throw new Error("Error fetching customer: " + customerResponse.statusText);
        const customerData: Customer = await customerResponse.json();
        return { ...training, customerData }; // Ensure customerData is included
      } catch (err) {
        console.error("Error fetching customer:", err);
        return { ...training, customerData: null }; // Handle missing customer data gracefully
      }
    }
  );

  return await Promise.all(trainingWithCustomerPromises);
};

export const saveTraining = async (training: NewTraining) => {
  const response = await fetch(import.meta.env.VITE_TRAINING_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(training),
  });
  if (!response.ok)
    throw new Error("Error saving training: " + response.statusText);
};

export const deleteTraining = async (url: string) => {
  return fetch(url, { method: "DELETE" }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete: " + response.statusText);
    return response.json();
  });
}

