# Internet Connectivity Monitor

A tool for monitoring internet connectivity by periodically pinging a remote server (8.8.8.8 - Google DNS) and logging the connection status, ping times, and any errors encountered.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Logs](#logs)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project is designed to continuously monitor internet connectivity by sending periodic `ping` requests to a remote server (Google DNS: 8.8.8.8). The tool logs connection status, ping times, and any errors that occur during the ping process. The tool is built with Node.js and can be configured to run as a service on your machine.

### Goals
- Continuously monitor the internet connection.
- Log connection status, including ping times, to a JSON file.
- Handle intermittent network issues and retries with configurable parameters.

## Features

- **Ping monitoring**: Pings Google DNS (8.8.8.8) every 5 seconds to check internet connectivity.
- **Error logging**: Logs connection issues or failed ping attempts.
- **Retry logic**: Automatically retries failed ping attempts up to a defined limit.
- **Configurable interval**: Customize the frequency of ping requests.
- **JSON logging**: Saves connection status and ping times in a JSON file for easy review.
- **Real-time notifications**: Emits logs in the console for real-time status updates.

## Requirements

To run this project, you'll need:

- [Node.js](https://nodejs.org/) (v14 or later)
- `npm` or `yarn` for managing dependencies

## Installation

### 1. Clone the repository:

``` bash
git clone https://github.com/VitorViana98/internet-connectivity-monitor.git
cd internet-connectivity-monitor
```

### 2. Install dependencies:

``` bash
npm install
```

## Usage

### 1. Run the application:

After installation, you can start the connectivity monitor with the following command:

``` bash
npm start
```

This will begin monitoring the internet connection, pinging every 5 seconds, and logging the status in the `connection-log.json` file.

### 2. Stopping the application:

To stop the monitor, press `CTRL + C` in the terminal where it is running.

## Configuration

The behavior of the monitor can be customized by editing the configuration file `config/index.js`:

- **pingCommand**: The command used to ping the server (can be modified if you want to change the target).
- **maxRetries**: The maximum number of retries after a failed ping attempt.
- **retryDelay**: The delay between retries, in milliseconds.
- **logPath**: The path to the JSON file where logs are stored.

Example of a `config/index.js`:

``` bash
export const connectionLogPath = "./logs/connection-log.json";
export const maxRetries = 3; // Max number of retries on ping failure
export const retryDelay = 5000; // Delay between retries (in ms)
```

## Logs

The tool generates logs that are stored in a JSON file (`connection-log.json`). Each log entry includes:

- **timestamp**: The time when the ping was executed.
- **status**: The connection status (`Connected` or `Disconnected`).
- **pingTime**: The time taken for the ping response (in milliseconds), or `N/A` if there was an error.

Log entries will look like this:

``` bash
{
  "timestamp": "2025-01-26T04:55:47.531Z",
  "status": "Connected",
  "pingTime": "38ms"
}
```

## Error Handling

Errors are logged if the ping command fails. The tool retries up to `maxRetries` times before marking the connection as `Disconnected`. A typical error log might look like this:

``` bash
{
  "timestamp": "2025-01-26T04:55:47.531Z",
  "status": "Disconnected",
  "pingTime": "N/A",
  "error": "Error executing ping: Command failed: ping -n 1 8.8.8.8"
}
```

## Contributing

We welcome contributions to improve the functionality and stability of this project. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Commit your changes (`git commit -am 'Add feature xyz'`).
4. Push to your branch (`git push origin feature-xyz`).
5. Create a new Pull Request.

### Code Style

Please adhere to the following coding standards:

- Use **ES6** syntax (e.g., `let`, `const`, arrow functions, etc.).
- Follow JavaScript best practices.
- Write clear and concise commit messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---