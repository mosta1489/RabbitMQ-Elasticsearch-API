# RabbitMQ-Elasticsearch-API

### **Node.js app with Docker, ingests data from a message broker, indexes in Elasticsearch, and exposes REST API for querying**

---

## Overview

The project consists of three microservices:

1- **Data Queuing Service**: This service receives a file containing data and sends it to RabbitMQ. It exposes an endpoint to receive new elements and send them to the message queue.

2- **Index Data Service**: This service consumes the elements from the queue and indexes them using Elasticsearch. It processes each element one by one.

3- **Query Service**: This service provides endpoints for querying the indexed data. It has two endpoints: one that displays all the data in the index, and another that filters the data based on a query.

## Installation and Setup

1. **Clone the repository**:

```bash
git clone https://github.com/your/repository.git
```

2. **Make the .sh file executable**:

```bash
chmod +x up.sh
```

3. **put the data.json file that you want to index in the Elasticsearch**

4. change the env variables in the .env file if you want:

   - the name of index
   - the name of the queue
   - the port number of the services
   - the host of the Elasticsearch

5. **Run the .sh file**:

```bash
./up.sh
```

## API Endpoints

### Data Queuing Service :

- Retrieves all the data in the Elasticsearch index.

  - **GET /all**

- Retrieves the data that matches the query (search using 'name').

  - **GET /search-name?name=`<your-query>`**

- Retrieves the data that matches the query (search using 'about').

  - **GET /search-about?about=`<your-query>`**

- Delete the index.

  - **DELETE /delete**

### Data Queuing Service :

- create a new element in the queue.

  - **POST /create**

    - body: { "data": { `your data ` } }

## Deployment

- **AZURE** VM was utilized for the deployment process
- **Elasticsearch Cloud** was utilized for this project

## Access the services:

- Query Service: [http://172.190.14.21:8080](http://172.190.14.21:8080/all)

- Data Queuing Service: [http://172.190.14.21:8081](http://172.190.14.21:8081/all)

## Technologies

- RabbitMQ
- Elasticsearch
- Docker
- Node.js
- Express
