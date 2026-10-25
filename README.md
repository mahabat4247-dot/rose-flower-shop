# Grow and Learn

A modern, friendly, and responsive daycare and preschool website designed for young children and their parents. This repository is structured specifically as a clean and beginner-friendly DevOps lab project.

---

## 📁 File-by-File Explanation

* **`src/index.html`**: The main HTML structure of the website. Includes the header navigation, hero welcome section, three program cards (Toddlers, Preschool, Early Learning), About Us section, Contact section with form, and footer.
* **`src/styles.css`**: CSS stylesheet providing responsive layout, styling, and color palette (soft green, cream, and light yellow).
* **`src/script.js`**: Lightweight JavaScript handling form submission feedback.
* **`package.json`**: Node.js project manifest defining devDependencies (`eslint`, `htmlhint`) and scripts (`lint`, `build`).
* **`package-lock.json`**: Lockfile ensuring consistent, reproducible dependency installations across CI environments.
* **`eslint.config.js`**: Flat configuration file for ESLint code quality checks on JavaScript source files.
* **`.gitignore`**: Specifies files and directories that Git should ignore (such as `node_modules/` and `dist/`).
* **`sonar-project.properties`**: Configuration for SonarQube code quality scanning (`sonar.projectKey=grow-and-learn`).
* **`Dockerfile`**: Container specification using `nginx:alpine` to serve static assets from the `dist/` build directory on port 80 with a non-root `nginx` user.
* **`.dockerignore`**: Excludes unnecessary local files (like `node_modules/`, `.git/`) from being copied into the Docker build context.
* **`.github/workflows/ci.yml`**: GitHub Actions CI/CD pipeline executing six ordered jobs:
  1. **Lint** (`npm run lint`)
  2. **Build Application** (`npm run build`)
  3. **SonarQube Scan** (`sonar-project.properties`)
  4. **Trivy Security Scan** (Filesystem vulnerability scan)
  5. **Docker Build** (`docker build`)
  6. **Push to Amazon ECR** (Triggers on pushes to `main` only)

---

## 🚀 Setup & Local Execution Instructions

### Prerequisites
- Node.js 20+
- npm 9+
- Docker (optional for container testing)

### Step 1: Install Dependencies
```bash
npm ci
```

### Step 2: Run Linter
```bash
npm run lint
```

### Step 3: Build Application
```bash
npm run build
```
This generates the static distribution files inside `dist/`.

### Step 4: Run via Docker (Local Testing)
```bash
docker build -t grow-and-learn:latest .
docker run -d -p 80:80 grow-and-learn:latest
```

---

## 🔑 Required GitHub Secrets Configuration

To run the full GitHub Actions CI/CD pipeline and push images to Amazon ECR, configure the following repository secrets in GitHub (**Settings > Secrets and variables > Actions**):

* `SONAR_TOKEN`: Authentication token for SonarQube.
* `SONAR_HOST_URL`: Endpoint URL for SonarQube server.
* `AWS_ACCESS_KEY_ID`: AWS IAM Access Key ID.
* `AWS_SECRET_ACCESS_KEY`: AWS IAM Secret Access Key.
* `AWS_REGION`: Target AWS Region (e.g., `us-east-1`).
* `ECR_REPOSITORY`: *(Optional)* Name of Amazon ECR repository (defaults to `grow-and-learn`).
