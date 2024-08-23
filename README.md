# TaskEase - Learning Activity Organizer

# Introduction

TaskEase is a web-based application developed using HTML, SCSS, Vanilla JavaScript, and TypeScript. It helps users organize their learning activities by creating customized categories such as "Spanish Language" or "Programming" and allocating specific time intervals to individual tasks, such as "20 minutes for verbs" or "5 minutes for vocabulary."

<img width="1179" alt="ai_mobiles" src="https://github.com/MarioGrusz/task-ease-v2/assets/3mobiles_task.png">

# Features

- Category Creation: Users can create categories based on their learning needs, such as "Spanish Language" or "Programming."
- Task Addition: Users can add tasks with a countdown timer to each category. Upon completion of the allotted time, the task is automatically marked as complete, providing a streamlined tracking mechanism for learning progress.

## Getting Started

Prerequisites

Ensure you have Node.js and npm installed. You'll also need Vitest for testing, Playwright for end-to-end testing, and a CI/CD pipeline set up for automated deployment.

Clone the Project

```bash
  git clone https://github.com/MarioGrusz/task-ease-v2
```

Navigate to the Project Directory

```bash
  cd task-ease-v2
```

Install Dependencies

```bash
  npm install
```

Development

To start the development server, use:

```bash
  npm run dev
```

Testing

Unit Tests: Run unit tests using Vitest.

```bash
  npm run test
```

End-to-End Tests: Run end-to-end tests using Playwright.

```bash
  npm run test:e2e
```

Build

```bash
  npm run build
```

CI/CD

The project is set up with Continuous Integration and Continuous Deployment (CI/CD). The pipeline automates testing and deployment processes. The configuration for CI/CD can be found in the .github/workflows directory.
Project Page

## Project Page

[TaskEase](https://taskease-app.netlify.app/)

TaskEase
License

This project is licensed under the MIT License - see the LICENSE.md file for details.
Contributing

If you'd like to contribute to TaskEase, please submit a pull request or open an issue. Your contributions are welcome!
