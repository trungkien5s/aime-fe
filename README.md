# AIME Mask

A React application for data masking processing and management.

## System Requirements

- React (19.1.0)
- npm
- Git

## Installation and Running Guide

### 1. Clone repository

```bash
git clone https://github.com/trungkien5s/aime-fe.git
cd aime-mask
```

### 2. Install dependencies

Using npm:
```bash
npm install
```


### 3. Run application in development mode

```bash
npm start
```


The application will be launched at [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
```


Build files will be created in the `build/` directory

```

##  Technologies Used

### Frontend Framework
- **React 19.1.0** - Main framework
- **React Router DOM 6.22.3** - Navigation
- **React Hook Form 7.60.0** - Form management

### UI/UX Libraries
- **Ant Design 5.26.4** - Component library
- **Tailwind CSS 3.4.1** - CSS framework
- **Lucide React 0.525.0** - Icon library
- **Sass 1.89.2** - CSS preprocessor

### State Management & API
- **TanStack React Query 5.82.0** - State management and caching
- **Axios 1.10.0** - HTTP client

### Internationalization
- **i18next 21.10.0** - Internationalization library
- **react-i18next 11.18.6** - React integration for i18next
- **i18next-browser-languagedetector 8.2.0** - Automatic language detection

### Form Validation & Utils
- **Yup 1.6.1** - Schema validation
- **@hookform/resolvers 5.1.1** - Form validation resolver

### Additional Features
- **React Toastify 11.0.5** - Toast notifications
- **React World Flags 1.6.0** - Country flags display

## Project Structure

```
aime-mask/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── locale/
│   └── App.js
├── package.json
└── README.md
```

## Deployment Environment

The application is configured to deploy at the `/masking/app` path (see `homepage` in package.json).

##  Available Scripts

- `npm start` - Run application in development mode
- `npm run build` - Build application for production
- `npm test` - Run test suite
- `npm run eject` - Eject configuration (not recommended)

##  Configuration

### ESLint
The project uses the default ESLint configuration from Create React App.

### Browser Support
- Development: Latest versions of Chrome, Firefox, Safari

---

