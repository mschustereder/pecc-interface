# PECC Interface (Frontend)

This is the frontend repository for PECC (Population, Economy, Capital, Currency), an AI-powered data fetching application.

**[Live Application](https://mschustereder.github.io/pecc-interface/)**

This client-side Angular application provides a responsive UI that accepts user input, communicates with the PECC AI backend, and renders the structured JSON response into data cards. 

For the Python/LangChain backend that powers this interface, see the [backend repository](https://huggingface.co/spaces/mschustereder/pecc/tree/main).

## Tech Stack & Features
* **Framework:** Angular 21 (Standalone Components)
* **Language:** TypeScript
* **Styling:** SCSS (CSS Grid, Flexbox, responsive design)
* **Features:**
  * Dynamic layout scaling based on device width.
  * Strict interface binding to API responses.
  * Graceful frontend error handling and fallback UI states.

---

## Development Setup

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.6.

### Prerequisites
Ensure you have Node.js and the Angular CLI installed.

### Development Server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

*(Note: The live version is deployed to GitHub Pages via the `build_and_deploy_to_pages.sh` script).*
