# Prosperify SDK

The Prosperify SDK is a TypeScript library designed to facilitate interaction with the Prosperify API. This SDK provides a set of client classes and resource management tools to streamline API calls and handle responses effectively.

## Features

- **Easy API Access**: Simplifies the process of making API calls to the Prosperify platform.
- **Resource Management**: Provides dedicated classes for managing different resources such as assistants, chat, files, organizations, and users.
- **Error Handling**: Includes robust error handling mechanisms to manage API errors gracefully.
- **TypeScript Support**: Fully typed with TypeScript for better development experience and type safety.

## Installation

To install the Prosperify SDK, use npm or yarn:

```bash
npm install prosperify-sdk
```

or

```bash
yarn add prosperify-sdk
```

## Usage

Here is a basic example of how to use the Prosperify SDK:

```typescript
import { ProsperifyClient } from 'prosperify-sdk';

const client = new ProsperifyClient({ apiKey: 'YOUR_API_KEY' });

async function createAssistant() {
    const assistant = await client.assistants.create({ name: 'Customer Support Assistant' });
    console.log('Assistant created:', assistant);
}

createAssistant().catch(console.error);
```

## Documentation

For detailed documentation on how to use each resource and method, please refer to the API documentation provided by Prosperify.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.