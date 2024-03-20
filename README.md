# Logistics Serverless IT platform
Simple Logistics Serverless IT platform for managing logistics operations,  tracking shipments and forecasting.

## Table of Contents


### Minimum Requirements:
- [A run-down on the design highlighting the different components](#Design-Rundown)
- [Explain why and how it scales under load, and what ‘bottlenecks’ or limitations still exist](#explain-why-and-how-it-scales-under-load-and-what-bottlenecks-or-limitations-still-exist)
- [The code for one of the backend solutions (can be Lambda) in your solution. Use a language that you see fit](#code-solution-documentation)
- [Extras](#extras)

### Design Rundown 
The Logistics Serverless IT platform is designed to be a serverless, scalable, and cost-effective solution. 

![System Design](./system-desiagn.jpg)

#### AWS Kinesis and Firehose
The platform uses AWS Kinesis and Firehose to ingest and process data from the IoT Message Bus and mobile scanner bus. Kinesis will ingest and process real-time data streams to Firehose every 10 seconds, and Firehose will (optionally transform) processed the data to S3 as historic storage and send the only latest data to the The Ketenplanning platform Lambda.

#### AWS S3
S3 to store and manage the historic data from the IoT Message Bus and mobile scanner bus. Which allow us to store data cost effectively, configure glacier for old file and less accessed data and also the abily to add analytics and data viewing.

#### AWS AppSync
AppSync provide us a managed GraphQL API for the IoT and mobile bus data from firehose and providing graphql endpoint for the forecast team to pull and push data and also api endpoint for planning and operator frontend. appsync allows us to easily scale and add addition of new connection features. 

#### AWS Lambda
We use Lambda to process and save/update the IoT location, Mobile Scanner, Daily capacity, weekly capacity and forecast data to our redis database. The platform uses Lambda to run code in response to events such as Kinesis Firehose data, task scheduling to pull in and process excel capacity data and recieve/send data to through appsync. 

#### AWS Elasticache (Redis)
The platform uses AWS Elasticache to provide a managed Redis datastore for the real-time data cost effectively with high-performance, and low-latency. 

#### AWS CloudWatch
The platform uses AWS CloudWatch to monitor and log the system behavior. The platform uses CloudWatch to monitor the system metrics, set alarms, and log the system and application behavior.

### Explain why and how it scales under load, and what ‘bottlenecks’ or limitations still exist
The platform is architected to be serverless and scalable, utilizing AWS Kinesis and Firehose for processing real-time data from IoT and Mobile Scanner sources. This design choice enables the platform to efficiently handle varying workloads, ensuring scalability, cost-effectiveness, and high availability.

By leveraging AWS Lambda as the compute service, the platform benefits from automatic scaling capabilities under load. Lambda scales out as needed to accommodate increased traffic and processing demands without the need for manual intervention, minimizing the risk of performance bottlenecks.

While the current design may lack explicit considerations for security, it's important to highlight that AWS provides robust security features that can be integrated into the platform. AWS Identity and Access Management (IAM), Amazon Cognito, and API security features in AWS AppSync can be utilized to secure the platform, ensuring data privacy, access control, and compliance with regulatory requirements.

Though the platform demonstrates scalability under load through its serverless architecture and use of AWS services, potential limitations or bottlenecks may still exist in areas such as data processing inefficiencies, resource constraints, or integration complexities. Regular monitoring, performance tuning, and continuous optimization can help address and mitigate these limitations to further enhance the platform's scalability and resilience under varying workloads.


### Code Solution Documentation:
#### Installation

* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Node.js - [Install Node.js 18](https://nodejs.org/en/), including the npm package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

```sh
# cd into the project directory and install the dependencies
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


## Extra

### Explain why it is a cost-effective solution.
Using AWS Lambda as the core compute service for the application, based on its pay-per-use pricing model, helps optimize costs by only paying for the resources consumed during request processing and execution time. This flexibility allows for fine-tuning resource allocation to maximize cost-efficiency.

Leveraging services like Kinesis and Firehose for ingesting and processing data from IoT and mobile sources enables real-time data processing in a cost-effective manner. By managing throughput and efficiently passing only necessary data to Lambda functions, unnecessary costs are minimized. Storing historical data on S3 further reduces costs by providing long-term storage without the need for managing additional infrastructure.

Elasticache, specifically using Redis as a managed datastore for real-time data, offers high-performance and low-latency at a cost-effective rate. By avoiding continuous storage of redundant data and working with small data sets, cost savings are achieved without compromising on performance.

Utilizing services like S3 for storage and Redis for real-time data needs enables cost savings by eliminating the need to manage infrastructure and storage resources independently. Additionally, AWS AppSync streamlines the development process by offering GraphQL capabilities without the overhead of managing and implementing a separate GraphQL server. This not only saves time and resources but also reduces the complexity of the application, resulting in lower costs associated

<!-- since it accesses as an API, as the application grows bigger, an alternative solution might be packaging the application into a container image and deploy to and Elastic Kubernetes Service (EKS) cluster. With EKS, the cost of nodes can be fixed since a specified number of nodes can be setup and pods are scaled as necessary. -->

### Explain how you choose the different AWS services, and what made you prefer the presented services over alternatives. How would you approach the design, build, test, and deploy of this platform AWS 'cloud natively', and 'as-a-service'?

Choosing AWS services involves weighing the cost of the service, regional availability, regulatory requirements, and latency requirements. AWS services are already tightly coupled which makes all the services work together with less friction and ensures applications are running within a secure environment. 


For this implementation, I would select AWS Code Commit to host the application’s repository, taking advantage of its high availability and encryption at rest. To build and test the application, I would take advantage of AWS Code build, this will allow running all the necessary test to ensure the application is performant and secure. And for deployment, AWS Code Deploy will be used.

All these services will be managed using infrastructure as code with the AWS CDK, documenting the entire setup and allowing team members to collaborate effortlessly and not worry about tooling.


### How would you approach automated testing to verify acceptance criteria and functionality? If acceptance criteria are missing, please use your imagination or email us your questions to get more context. Automated tests are important for us. We value TDD/BDD.

To ensure that acceptance criteria and functionality are verified through automated testing, I would follow a Test-Driven Development (TDD) or Behavior-Driven Development (BDD) approach. 

Firstly, I would ensure that unit tests are created for every new feature and bug fix, adhering to the provided acceptance criteria and covering edge cases. This would help in verifying that the individual components of the application are functioning correctly.

Additionally, integration tests would be implemented to test the interactions between different components of the application and ensure that they work together as expected.

To further enhance the testing process, a review app would be generated before merging to production. This review app would be tested using tools like ZAP for Dynamic Application Security Testing (DAST) to identify any potential vulnerabilities and ensure that the application behaves as intended, including handling edge cases effectively.

### How would you describe your plan to load test your solution?

We can leverage Grafana Lab’s Load testing tool, k6 to test the resiliency of the system.

### It is desired to see Infrastructure as Code and version control flow. We would like to know how you manage versioning of code contributions, release versioning and how you automate infrastructure build/deploy. You are free to use tools like Terraform, CloudFormation, CDK if each resource you use for computing, storage, database, network, integration/message bus, etc. is deployed using infrastructure as code.

