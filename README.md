# Chit Fund Management System

A comprehensive web application for managing chit fund operations, built with Next.js, React, and Tailwind CSS.

## Features

- **Member Management**: Add, edit, and track member details
- **Payment Tracking**: Monitor monthly payments with status indicators
- **Visual Analytics**: Charts and graphs for collection trends
- **Dashboard Overview**: Key metrics and statistics at a glance
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chit-management-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy automatically with each push

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The static files will be generated in the `out` directory

## Project Structure

```
├── components/
│   └── ChitManagementSystem.js  # Main application component
├── pages/
│   ├── _app.js                  # App configuration
│   └── index.js                 # Home page
├── styles/
│   └── globals.css              # Global styles
├── package.json                 # Dependencies and scripts
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

## Configuration

The application is configured for:
- 25 members
- 26-month chit cycle
- ₹6,000 monthly contribution
- Total fund value: ₹39,00,000

You can modify these values in the `ChitManagementSystem.js` component.

## Features Overview

### Dashboard
- Current month indicator
- Monthly collection amount
- Active member count
- Collection rate percentage

### Member Management
- Editable member details (name, phone, address)
- Payment history tracking
- Outstanding amount calculation

### Payment Tracking
- Monthly payment status (Paid/Partial/Unpaid)
- Payment date recording
- Partial payment amount entry

### Analytics
- Monthly collection trend chart
- Individual member progress tracking
- Visual payment status indicators

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions, please open an issue in the GitHub repository.
