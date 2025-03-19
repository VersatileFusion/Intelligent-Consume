# Intelligent Consume API

Backend API for analyzing and optimizing home energy consumption (electricity, water, and gas).

## Author

Erfan Ahmadvand
Phone: +989109924707

## Description

This API provides endpoints for analyzing home energy consumption patterns and offering practical suggestions to optimize usage and reduce costs. It allows users to manually input data from utility bills or connect smart home devices for real-time monitoring.

## Features

- User registration and authentication
- Energy consumption data tracking (electricity, water, gas)
- Data analysis and pattern recognition
- Customized optimization suggestions
- Visual feedback through charts and graphs (when connected to frontend)

## Setup

### Prerequisites

- Node.js 16+
- pnpm 7+

### Installation

1. Clone the repository
```
git clone https://github.com/erfanahmadvand/intelligent-consume.git
cd intelligent-consume/backend
```

2. Install dependencies
```
pnpm install
```

3. Create a `.env` file with the following variables
```
PORT=3000
NODE_ENV=development
```

4. Start the development server
```
pnpm dev
```

5. The API will be available at http://localhost:3000
6. API documentation is available at http://localhost:3000/api-docs

## API Documentation

This project uses Swagger for API documentation. After starting the server, visit `/api-docs` to see the interactive API documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. 