# Personal Trainer Frontend App

This is a React-based frontend application for managing customer and training data for a Personal Trainer company. The app interacts with a provided REST API to handle customers, their trainings, and provides various features to manage and display the data intuitively.

## Table of Contents

* <ins>Technologies</ins>
* <ins>Features</ins>

## Technologies

This project is built using the following technologies:

* **React:** The core library for building the frontend UI.
* **Material-UI:** For the design components and styling.
* **React Router:** For navigation between different pages (Customer list, Training list, Calendar, Statistics).
* **Day.js:** For date formatting.
* **Lodash:** For data manipulation, including grouping and summing data.
* **Recharts:** For rendering bar charts to display training statistics.

## Features

### Task 1:
* **Customer List Page:** Display a list of customers with sorting and searching functionality.
* **Training List Page:** Display a list of trainings with customer names and formatted dates, and functionality for sorting and searching.

### Task 2:
* **CRUD Operations:**
  - Add & Edit customers.
  - Delete customers with a confirmation dialog.
  - Add training to a customer using a date picker component.
  - Delete training with a confirmation dialog.

### Task 3:
* **Export Functionality:** Export the customer list to a CSV file, filtering out unnecessary data.
* **Calendar Page:** Display all scheduled trainings in a calendar view (monthly, weekly, and daily).

### Task 4:
* **Statistics Page:** Display statistics showing the amount of minutes spent on different activities, visualized in a bar chart.
