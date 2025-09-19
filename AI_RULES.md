# AI Application Rules and Tech Stack Overview

This document outlines the core technologies used in this application and provides guidelines for their usage.

## Tech Stack

1.  **React:** The primary JavaScript library for building user interfaces.
2.  **TypeScript:** Used throughout the codebase for type safety, improved maintainability, and better developer experience.
3.  **Tailwind CSS:** A utility-first CSS framework for rapidly styling components with a consistent design system.
4.  **Vite:** The build tool and development server, providing a fast and efficient development workflow.
5.  **Firebase:** Utilized for backend services, specifically:
    *   **Firebase Authentication:** For user registration, login, and session management.
    *   **Firestore:** A NoSQL cloud database for storing user profiles and application data.
6.  **Google Generative AI (`@google/generative-ai`):** Powers the AI-driven cultural intelligence features, generating responses and insights.
7.  **Lucide React:** A collection of beautiful and customizable open-source icons, integrated for visual elements.
8.  **React Router:** (Future/Recommended) For declarative client-side routing, managing navigation between different pages and views.
9.  **Shadcn/ui:** (Recommended) A collection of re-usable components built with Radix UI and Tailwind CSS, providing accessible and customizable UI elements.

## Library Usage Rules

*   **UI Development (React):** All user interface components must be built using React.
*   **Type Safety (TypeScript):** Always use TypeScript for new files and when modifying existing ones to ensure strong typing.
*   **Styling (Tailwind CSS):** All styling should be implemented using Tailwind CSS utility classes. Avoid writing custom CSS unless absolutely necessary for complex, unique scenarios not covered by Tailwind.
*   **Backend & Authentication (Firebase):** For all authentication flows (sign-up, sign-in, password reset, Google sign-in) and user data storage, leverage Firebase Authentication and Firestore services.
*   **AI Capabilities (Google Generative AI):** All AI-powered features, such as generating cultural advice or chat responses, must use the `@google/generative-ai` library.
*   **Icons (Lucide React):** Use icons from the `lucide-react` library for all graphical symbols in the UI.
*   **Routing (React Router):** When implementing new navigation or pages, use React Router for managing routes. Keep the main routing configuration in `src/App.tsx`.
*   **UI Components (Shadcn/ui):** Prioritize using pre-built components from the shadcn/ui library for common UI elements (e.g., buttons, forms, dialogs) to maintain consistency and accessibility. If a specific component is not available or requires significant customization, create a new component following the project's styling guidelines.