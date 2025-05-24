# Node.js ETL Pipeline

## Overview

This repository contains a Node.js-based ETL (Extract, Transform, Load) pipeline designed to process data from various sources, transform it, and load it into a target database. The pipeline is modular and can be easily extended to accommodate different data sources and transformations.

## Implemented Providers
- **REST**: Reads data from CSV files.
- **SQLite**: Reads and writes data to a SQLite database.

## Getting Started
### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- SQLite3 (for SQLite provider)
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/dpirek/nodejs-etl-pipeline.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nodejs-etl-pipeline
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the ETL pipeline UI:
   ```bash
   npm start
   ```

### Usage
1. Open your web browser and navigate to `http://localhost:8080`.
2. Click 'run' to execute the ETL pipeline.
3. See output in the console.

