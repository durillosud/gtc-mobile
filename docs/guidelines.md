# Gtc Mobile Development Guidelines

This document provides essential information for developers working on the `gtc-mobile` project.

## Build/Configuration Instructions

### Prerequisites
- Node.js v26.x or higher
- Expo CLI
- Emulator (iOS/Android) or Expo Go app

### Setting Up the Environment

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment files**:
   Create a `.env` file in the root of the project:
   ```env
   EXPO_PUBLIC_API_URL=http://gnuteca-ng.local/api/v1
   ```
   > [!NOTE]
   > For Android Emulators running on local machines, host resolution of `gnuteca-ng.local` might fail. In this case, you can point the API URL to the host machine's gateway IP (`http://10.0.2.2:80`) or adjust the hosts file inside the emulator.

3. **Running the development server**:
   ```bash
   npm run start
   ```

## Architecture & Conventions

### Styling
- **React Native StyleSheet**: Custom styled components using standard React Native StyleSheets.
- **Theme**: Follows the system color scheme (Dark/Light mode) loaded dynamically via `useColorScheme`.

### Form Validation
- **React Hook Form**: Handles input lifecycles, values, and validation triggers.
- **Zod**: Used to declare schemas and infer TypeScript types for inputs.

### Authentication & Cookie Management
- **HttpOnly Cookies**: Mobile clients communicate with the Swoole BFF using secure HttpOnly cookies (`SID_ACC` and `SID_REF`).
- **Axios Configuration**: The HTTP client (`src/services/api.ts`) is configured with `withCredentials: true`.
- **Native OS Cookie Jar**: Because React Native networking stack is built on native iOS (`NSURLSession`) and Android (`OkHttpClient`) libraries, cookies are automatically retained and forwarded for matched domains across requests and app restarts, without requiring manual token storage in JavaScript.
- **AuthContext**: The `AuthProvider` (`src/contexts/AuthContext.tsx`) manages login/logout state and verifies session validity on application mount.
