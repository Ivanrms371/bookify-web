# Bookify Web

Public booking website for **Bookify**, a multi-tenant SaaS platform for appointment-based businesses such as barbershops, beauty salons, tattoo studios, and spas.

Bookify Web provides the customer-facing experience of the platform, allowing customers to access a business through its public page and book appointments online.

## Features

- Public business pages
- Business-specific URLs
- Service selection
- Professional selection
- Real-time availability
- Date and time-slot selection
- Public appointment booking
- Responsive customer-facing interface
- Multi-tenant business resolution
- Integration with the Bookify Backend API

## Tech Stack

- **Astro**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query**
- **Zustand**
- **Motion**
- **date-fns**

## Application

Bookify Web is the public-facing application of the Bookify platform.

Each business can be accessed through its unique public URL. Customers can explore available services and professionals, check available time slots, and create appointments without accessing the management dashboard.

Astro provides the foundation for the public web experience, while React is used for interactive parts of the booking flow. TanStack Query handles server state and API synchronization, Zustand manages client-side booking state, Motion provides interface animations and transitions, and date-fns is used for date and time manipulation throughout the booking experience.

Business information, services, professionals, availability, and bookings are provided by the Bookify Backend through its public API.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

The **Bookify Backend** should also be running locally for API-dependent functionality.

### 1. Clone the repository

```bash id="d2t1zn"
git clone <repository-url>
cd bookify-web
```

### 2. Install dependencies

```bash id="9w3pgj"
npm install
```

### 3. Configure environment variables

Create your local environment file from the provided example:

```bash id="05zqkd"
cp .env.example .env
```

Update the values according to your local environment.

### 4. Start the development server

```bash id="93p0dm"
npm run dev
```

The public website will typically be available at:

```text id="v9b3gn"
http://localhost:4321
```

## Public Booking

Businesses are exposed through unique public routes:

```text id="28syij"
/b/{business-slug}
/b/{business-slug}/book
```

The booking flow communicates with the Bookify Backend public API to retrieve business information, services, professionals, availability, and available time slots.

## Environment Variables

See `.env.example` for the environment variables required by the application.

Client-side environment variables must not contain secrets or private credentials.

## Related Applications

Bookify is divided into three applications:

- **Bookify Web** — Public website and customer booking experience
- **Bookify App** — Management dashboard for businesses and staff
- **Bookify Backend** — NestJS API and business logic

Each application is maintained in its own repository.

## Development Status

Bookify is currently under active development.

The project is being developed as a complete SaaS platform and may contain features or interfaces that are still evolving.

## License

Copyright © 2026 Iván Rodríguez. All rights reserved.

This source code is publicly available for viewing and portfolio purposes only.

No permission is granted to copy, modify, distribute, sublicense, sell, or use this software or substantial portions of it for commercial purposes without prior written permission from the author.
