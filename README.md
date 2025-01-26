# React + TypeScript + Vite

This project is a minimal setup for building React applications with TypeScript and Vite. It includes hot module replacement (HMR), basic ESLint rules, and an easy-to-extend configuration.

---

## Requirements

- **Node.js**: Version 18+ recommended
- **npm** or **yarn**: Your preferred package manager

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Using `npm`:

```bash
npm install
```

Or, using `yarn`:

```bash
yarn install
```

---

## Running the Development Server

To start the development server with HMR:

```bash
npm run dev
```

Or:

```bash
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Building the App

To create a production-ready build:

```bash
npm run build
```

Or:

```bash
yarn build
```

The build output will be located in the `dist` folder.

---

## Previewing the Production Build

After building the app, you can preview it locally:

```bash
npm run preview
```

Or:

```bash
yarn preview
```

---

## Linting and Code Quality

This project includes ESLint for code quality checks. To run linting:

```bash
npm run lint
```

Or:

```bash
yarn lint
```

You can expand the ESLint configuration as needed by adding plugins like `eslint-plugin-react` or enabling stricter rules. See the [ESLint documentation](https://eslint.org/docs/latest/) for more details.

---

## Adding ESLint Type-Aware Rules

To enable type-aware linting for better TypeScript support:

1. Update `eslint.config.js`:

   ```js
   import tseslint from '@typescript-eslint/eslint-plugin';

   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
     rules: {
       // Your additional rules here
     },
   });
   ```

2. Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `strictTypeChecked` for stricter linting.

---

## Additional Commands

- **Clean Dependencies:**

  ```bash
  npm run clean
  ```

- **Check for Updates:**

  ```bash
  npm outdated
  ```

---

## Contributing

Feel free to fork this repository, open issues, or submit pull requests to help improve the template.

---

If you need more help, consult the official documentation:
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
