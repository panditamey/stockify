# Stockify

Stockify is a project that provides stock price predictions based on the given stock symbol and time period. It utilizes various technologies such as Next.js, Chakra UI, React Icons, Flask, Facebook's Prophet, Docker, and hosts the backend on Hugging Face's Spaces while the frontend is hosted on Vercel.

## Overview

Stockify aims to assist users in making informed decisions by predicting stock prices for a specified time period. By leveraging historical stock data and the power of Facebook's Prophet forecasting model, Stockify provides valuable insights into the potential future performance of a given stock.

## Features

- **Stock Symbol Input**: Users can enter the stock symbol they want to analyze and receive predictions for.
- **Time Period Selection**: Users can specify the desired time period for which they want the stock price predictions.
- **Predictions**: Stockify generates predictions for the specified stock symbol and time period using the Facebook Prophet forecasting model.
- **User-friendly Interface**: The frontend is built using Next.js, Chakra UI, and React Icons to provide an intuitive and visually appealing user experience.

## Tech Stack

- **Next.js**: Next.js is a popular React framework for building server-side rendered (SSR) and statically generated websites.
- **Chakra UI**: Chakra UI is a modular and accessible component library for building React applications with ease.
- **React Icons**: React Icons provides a comprehensive library of customizable icons for React applications.
- **Flask**: Flask is a micro web framework used for building the backend of Stockify.
- **Facebook's Prophet**: Prophet is a forecasting model developed by Facebook's Core Data Science team, providing robust time series forecasting capabilities.
- **Docker**: Docker is used to containerize the application, ensuring easy deployment and scalability.
- **Hugging Face's Spaces**: The backend of Stockify is hosted on Hugging Face's Spaces, providing a reliable infrastructure for running machine learning models.
- **Vercel**: Vercel is a cloud platform for deploying and hosting the frontend of Stockify, ensuring fast and reliable performance.

## Setup Instructions

To set up Stockify locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd stockify`
3. Install the required dependencies:
   - For the frontend:
     - Navigate to the `frontend` directory: `cd frontend`
     - Run `npm install` to install the frontend dependencies.
   - For the backend:
     - Navigate to the `backend` directory: `cd backend`
     - Run `pip install -r requirements.txt` to install the backend dependencies.
4. Run the application:
   - For the frontend:
     - Navigate to the `frontend` directory: `cd frontend`
     - Run `npm run dev` to start the frontend server.
   - For the backend:
     - Navigate to the `backend` directory: `cd backend`
     - Run `python app.py` to start the backend server.
5. Access the application:
   - Open your web browser and visit `http://localhost:3000` to access Stockify.

## Deployment

Stockify can be deployed using the following steps:

1. Frontend Deployment:
   - Sign up for an account on Vercel (https://vercel.com/) and create a new project.
   - Follow the instructions provided by Vercel to deploy the frontend application.

2. Backend Deployment:
   - Sign up for an account on Hugging Face's Spaces (https://huggingface.co/) and create a new space.
   - Upload the backend code to the created space on Hugging Face's Spaces.
   - Follow the instructions provided by Hugging Face's Spaces to deploy the backend application.

##
