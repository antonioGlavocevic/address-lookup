# Address Lookup Example

## Prerequisites

### Node Version

Tested on node v22.18.0 only but should work on anything v20.19+, v22.12+, or v24.0+ (main constraint is Prisma)

## Setup

Make sure to install dependencies:

```bash
npm install
```

Run the setup script to create sqlite db at ./dev.db and env at ./.env (only need to do this once or if db/env is deleted):

```bash
npm run setup
```

If you ever want to reset the db run:

```bash
npm run reset
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

# TODO

- Code clean up
- Check why address-history-item watch is firing so many times
