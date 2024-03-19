# Logistics Serverless IT platform
    Simple Logistics Serverless IT platform for managing logistics operations,  tracking shipments and forecasting.

## Table of Contents


### Minimum Requirements:
- [A run-down on the design highlighting the different components](#a-run-down-on-the-design-highlighting-the-different-components)
- [Explain why and how it scales under load, and what ‘bottlenecks’ or limitations still exist](#explain-why-and-how-it-scales-under-load-and-what-bottlenecks-or-limitations-still-exist)
- [The code for one of the backend solutions (can be Lambda) in your solution. Use a language that you see fit](#code-solution-documentation)
- [Extras](#extras)

### Design Rundown 
The Logistics Serverless IT platform is designed to be a serverless, scalable, and cost-effective solution. The platform is designed to be a cloud-native, as-a-service solution that leverages AWS managed services to provide a scalable, cost-effective, and highly available solution.

![System Design](./system-desiagn.jpg)

### Explain why and how it scales under load, and what ‘bottlenecks’ or limitations still exist
The platform is designed to be serverless and scalable. The platform leverages AWS managed services to provide a scalable, cost-effective, and highly available solution. The platform is designed to be cloud-native, as-a-service solution that leverages AWS managed services to provide a scalable, cost-effective, and highly available solution.

### Code Solution Documentation:

#### Installation

```sh
npm install
```

#### Running the app

```sh
# development
npm run build

# Run Lambda event locally for Add Location
npm run lambda:addLocation

# Run Lambda event locally for Add Scanning 
npm run lambda:addScanning

# Run Lambda event locally for Get Observations data 
npm run lambda:getObservations

# Run Lambda event locally for Load Daily capacity
npm run lambda:loadDailyCapacity

# Run Lambda event locally for Load Weekly capacity
npm run lambda:loadWeeklyCapacity

# Run Lambda event locally for Get Depot data
npm run lambda:getDepotData
```

#### Test

```sh
# unit/integration tests
npm run test
```
