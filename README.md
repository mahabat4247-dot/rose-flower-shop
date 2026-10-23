# Rose Flower Shop

A modern, elegant, and responsive flower shop web application crafted with blush pink, cream, and gold aesthetics. This repository features a full catalog of handpicked floral arrangements, an interactive shopping cart, contact information, accessible HTML, and a complete CI/CD pipeline using GitHub Actions, SonarQube, Trivy, Docker, and Amazon ECR.

---

## 🌟 Table of Contents

- [Features](#features)
- [Project Architecture & Structure](#project-architecture--structure)
- [Local Installation & Setup](#local-installation--setup)
- [Available Scripts](#available-scripts)
- [Docker Setup](#docker-setup)
- [Required GitHub Repository Secrets](#required-github-repository-secrets)
- [CI/CD Pipeline & Deployment Workflow](#cicd-pipeline--deployment-workflow)
- [SonarQube & Security Scanning](#sonarqube--security-scanning)

---

## 🌹 Features

- **Elegant Design Palette:** Designed with blush pink, soft cream, and gold accents.
- **Hero Section:** Introducing Rose Flower Shop and current promotions.
- **Interactive Floral Catalog:** Browse roses, tulips, peonies, lilies, bouquets, and mixed flower arrangements with real-time category filtering.
- **Interactive Shopping Cart:** Supports adding/removing items, adjusting item quantities, calculating subtotal and total, and saving state to `localStorage`.
- **Boutique Contact & Opening Hours:** Store address, direct phone, email form, and business hours.
- **Accessibility & Mobile Responsiveness:** Skip-to-content navigation, semantic HTML tags, accessible labels, and drawer navigation for mobile devices.

---

## 📁 Project Architecture & Structure

```
rose-flower-shop/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI/CD Pipeline
├── dist/                      # Production build output (generated)
├── eslint.config.js           # ESLint configuration
├── .gitignore                 # Git ignore rules
├── Dockerfile                 # Docker container specification (Nginx)
├── index.html                 # Main website HTML markup
├── package.json               # Node.js project configuration and scripts
├── package-lock.json          # Node.js package lock file
├── README.md                  # Project documentation
├── script.js                  # Application logic and cart functionality
├── sonar-project.properties   # SonarQube scanner properties
└── styles.css                 # Custom CSS styling and responsive layout
```

---

## 🚀 Local Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher recommended)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Step 1: Clone the Repository

```bash
git clone https://github.com/mahabat4247-dot/rose-flower-shop.git
cd rose-flower-shop
```

### Step 2: Install Dependencies

```bash
npm ci
```

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm run lint`

Validates HTML using `htmlhint` and JavaScript code using `eslint`.

```bash
npm run lint
```

### `npm run build`

Creates a production-ready `dist/` directory containing all static web assets (`index.html`, `styles.css`, `script.js`).

```bash
npm run build
```

---

## 🐳 Docker Setup

The project includes a multi-stage Docker configuration that serves the static website assets using **Nginx** on port `80`.

### Build Docker Image

```bash
npm run build
docker build -t rose-flower-shop:latest .
```

### Run Docker Container

```bash
docker run -d -p 8080:80 --name rose-flower-shop-container rose-flower-shop:latest
```

Access the application in your browser at `http://localhost:8080`.

---

## 🔑 Required GitHub Repository Secrets

To enable automated scanning, quality gating, and deployment to Amazon ECR, configure the following secrets in your GitHub repository (**Settings > Secrets and variables > Actions**):

| Secret Name | Description |
| :--- | :--- |
| `SONAR_TOKEN` | Authentication token for SonarQube / SonarCloud. |
| `SONAR_HOST_URL` | Endpoint URL of your SonarQube instance (e.g., `https://sonarcloud.io`). |
| `AWS_ACCESS_KEY_ID` | AWS IAM Access Key ID with permissions to Amazon ECR. |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Secret Access Key. |
| `AWS_REGION` | Target AWS Region for Amazon ECR (e.g., `us-east-1`). |
| `ECR_REPOSITORY` | Amazon ECR Repository name (e.g., `rose-flower-shop`). |

---

## 🔄 CI/CD Pipeline & Deployment Workflow

The GitHub Actions workflow defined in `.github/workflows/ci.yml`automates code quality checks, vulnerability scans, and container image publishing.

### Pipeline Jobs Breakdown

1. **`lint` Job:** Runs `npm run lint` (`htmlhint` and `eslint`) on Node.js 20 to ensure code style and markup correctness.
2. **`build` Job:** Runs `npm run build` to package website assets into `dist/` and uploads the artifact for downstream jobs.
3. **`sonarqube` Job:** Executes SonarQube code quality and security analysis using `SonarSource/sonarqube-scan-action`.
4. **`trivy` Job:** Performs a filesystem vulnerability scan on project dependencies and source code using `aquasecurity/trivy-action`.
5. **`docker-build` Job:** Verifies that the Docker container builds successfully with the static assets in `dist/`.
6. **`push-ecr` Job:** Authenticates with AWS ECR, tags the Docker image with `IMAGE_TAG` (`github.sha`) and `latest`, and pushes the image to Amazon ECR.

### Lifecycle & Expected Workflow

```
GitHub Branch ──> Pull Request ──> Trigger CI Checks (lint, build, sonarqube, trivy, docker-build)
                                              │
                                              ▼
                                   Merge into 'main' Branch
                                              │
                                              ▼
                               Trigger CI Pipeline + Push to Amazon ECR
                                              │
                                              ▼
                                 Automated / Manual Deployment to EC2
```

1. **Pull Requests:** When a PR is created targeting `main`, jobs `lint`, `build`, `sonarqube`, `trivy`, and `docker-build` execute. The `push-ecr` job is automatically skipped.
2. **Merge into `main`:** When changes are merged into `main`, all jobs execute. Upon success of security and build jobs, `push-ecr` builds, tags, and pushes the production Docker image to Amazon ECR.
3. **EC2 Deployment:** The deployed EC2 instance pulls the latest Docker image from Amazon ECR and restarts the Nginx web container.

---

## 🔍 SonarQube & Security Scanning

SonarQube analysis is configured via `sonar-project.properties`:
- **Project Key:** `rose-flower-shop`
- **Exclusions:** `node_modules/**`, `dist/**`, `.scannerwork/**`, `coverage/**`

No access tokens, AWS credentials, or passwords are hardcoded in source files or configuration properties.

---

&copy; Rose Flower Shop. Handcrafted with care and elegance.
