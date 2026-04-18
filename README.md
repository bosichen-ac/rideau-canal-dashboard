# Rideau Canal Skateway Web Dashboard

## Overview

This project is a real-time web dashboard for monitoring ice conditions on the Rideau Canal Skateway. It displays processed IoT sensor data including ice thickness, temperature, and safety status across three locations.

### Technologies Used

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express
* **Database:** Azure Cosmos DB
* **Charts:** Chart.js (via react-chartjs-2)
* **Deployment:** Azure App Service

## Features

* Real-time data display for:

  * Dow's Lake
  * Fifth Avenue
  * NAC
* Safety status indicators (Safe / Caution / Unsafe)
* Auto-refresh every 30 seconds
* Historical charts (last 1 hour)
* Overall system safety status

## Project Structure

```
rideau-canal-dashboard/
├── README.md
├── client/                # React Vite frontend
├── server.js              # Express backend API & Entry point for deployment
├── package.json           # Node dependencies & Root scripts (concurrently)
├── package-lock.json
├── .env.example           # Environment variables template
└── docs/
    └── api-documentation.md  # API endpoints documentation
```

## Installation

### 1. Clone the repository

`git clone https://github.com/bosichen-ac/rideau-canal-dashboard.git`

### 2. Install dependencies

```
npm run install:client
npm run install:server
```

## Configuration

Create a `.env` file by copying `.env.example` to the **root directory**:

```
PORT=3000
COSMOS_ENDPOINT=your_endpoint
COSMOS_KEY=your_key
COSMOS_DATABASE=RideauCanalDB
COSMOS_CONTAINER=SensorAggregations
```

## Running Locally

### Run both frontend and backend

```
npm run dev
```

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)

## API Endpoints

### GET `/api/analytics`

Returns aggregated sensor data.

#### Example Response:

```json
[
  {
    "location": "NAC",
    "AvgIceThickness": 33.64,
    "AvgSurfaceTemperature": -4.94,
    "MaxSnowAccumulation": 11.28,
    "safetyStatus": "Safe"
  }
]
```

## Dashboard Features

### Real-Time Updates

* Fetches new data every 30 seconds
* Updates UI automatically

### Location Cards

* Shows **latest record only**
* Displays:

  * Safety status
  * Ice thickness
  * Surface temperature
  * Snow accumulation

### Historical Charts

* Displays last **1 hour of data**
* Separate charts per location

### Overall Status

* Unsafe if ANY location is unsafe
* Caution if ANY location is caution
* Otherwise Safe

## Deployment (Azure App Service)

### Build frontend

```
npm run build
```

### Important Setup

Ensure:

* Root `package.json` has:

```
"start": "node server/server.js"
```

* App Service settings:

  * Node version: 24+
  * Startup command:

    ```
    npm start
    ```

### Environment Variables

Set in Azure:

- PORT
- COSMOS_ENDPOINT
- COSMOS_KEY
- COSMOS_DATABASE
- COSMOS_CONTAINER


## Troubleshooting

### No data showing

* Check Cosmos DB has data
* Verify API: `/api/analytics`

### Charts empty

* Ensure data is within last hour
* Check timestamp parsing

### CORS errors

* Ensure backend uses:

```
app.use(cors());
```

## AI Tools Used

* **Tool:** ChatGPT
* **Purpose:** Debugging and generating documentation
* **Extent:** Assisted with API integration, Chart.js logic, and deployment setup
