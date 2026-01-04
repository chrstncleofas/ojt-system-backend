# GitHub Actions CI/CD Setup

## Required GitHub Secrets

Para sa deployment, kailangan i-configure ang mga secrets sa GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

### For SSH Deployment (deploy-to-ec2 job)
- `EC2_HOST` - EC2 instance public IP or domain
- `EC2_USERNAME` - SSH username (usually `ubuntu` for Ubuntu AMI)
- `EC2_SSH_KEY` - Private SSH key for EC2 access
- `EC2_PORT` - (Optional) SSH port, default is 22

### For Docker Deployment (deploy-docker job)
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password or access token
- `EC2_HOST` - EC2 instance public IP or domain
- `EC2_USERNAME` - SSH username
- `EC2_SSH_KEY` - Private SSH key for EC2 access
- `EC2_PORT` - (Optional) SSH port

## Workflows

### 1. **lint-and-test-backend**
- Runs on every push and PR to main/develop branches
- TypeScript compilation check
- Installs dependencies with pnpm

### 2. **build-and-test-frontend**
- Runs on every push and PR
- Builds React production bundle
- Validates frontend compilation

### 3. **deploy-to-ec2** (PM2 Deployment)
- Runs only on main branch pushes
- Uses PM2 for process management
- Backend on port 3000, frontend on port 3001
- Requires PM2 installed on EC2: `npm install -g pm2`

### 4. **deploy-docker** (Docker Deployment)
- Runs only on main branch pushes
- Builds and pushes Docker images to Docker Hub
- Pulls and restarts containers on EC2
- Requires docker-compose.yml on EC2

## EC2 Setup Requirements

### For PM2 Deployment:
```bash
# Install Node.js and pnpm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm pm2

# Clone repository
cd /home/ubuntu
git clone <your-repo-url> ojt-system

# Setup PM2 startup
pm2 startup
pm2 save
```

### For Docker Deployment:
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Clone repository
cd /home/ubuntu
git clone <your-repo-url> ojt-system
```

## Testing Locally

Test workflow syntax:
```bash
# Install act (GitHub Actions local runner)
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run workflows locally
act push
```

## Choosing Deployment Strategy

Uncomment/modify workflows based on your preference:

- **PM2 only**: Remove `deploy-docker` job
- **Docker only**: Remove `deploy-to-ec2` job
- **Both**: Keep both (useful for staging vs production)
