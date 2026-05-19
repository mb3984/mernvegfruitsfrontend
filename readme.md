🍏 Veg & Fruits Shopping Platform - Frontend Engine

The optimized, highly responsive user interface engine for the Veg & Fruits MERN Shopping Platform. This repository contains the complete decoupled frontend architecture built using React.js, structured with robust client-side state models, and styled using a custom mobile-first framework.

---

## 🚀 Key Technical Highlights (Frontend)

- **State Hydration & Session Persistence:** Engineered robust `useEffect` hooks to dynamically hydrate user authentication profiles and recent transactional payloads (`recentOrder`) directly from local storage structures on component mount.
- **Component-Driven Architecture:** Structured using reusable, modular React components ensuring optimal reconciliation performance and strict separation of UI layout from business logic.
- **Responsive Mobile-First Interface:** Styled using custom semantic CSS variables and media query overrides (optimized at `480px` viewports) to ensure flawless data rendering, fluid grid reflows, and zero text clipping across modern smartphones, tablets, and desktops.
- **Efficient Invoice Computation:** Implemented a clean, linear array-reduce implementation ($O(N)$ time complexity) inside the billing modules to compute live cart and checkout totals dynamically without lagging the main UI thread.

---

## 🛠️ Tech Stack & Tooling

- **Core Framework:** React.js (Hooks & Stateful Logic Management)
- **Global/Component State:** React Context API & Integrated Browser Storage (`localStorage`)
- **Styling & Layout:** Modern HTML5, Custom CSS3 (Flexbox & Responsive Grid Layouts), Bootstrap Utilities
- **API Interaction Client:** Native Fetch API / Axios Layer tailored for RESTful backend endpoints
- **Developer Tools:** Git, GitHub, Vercel Build Engine
