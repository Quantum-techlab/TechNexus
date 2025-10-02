# # TECHNEXus 7.0 Registration Portal

This is the official registration portal for the 7th Edition of TECHNEXus, an upskilling and learning program hosted by the Department of Information Technology, University of Ilorin. This full-stack application is built with Next.js and Firebase, providing a seamless registration experience for students and a comprehensive dashboard for administrators.

To get started, take a look at `src/app/page.tsx`

![TECHNEXus Registration Portal Screenshot](https://i.imgur.com/example.png) <!-- Replace with an actual screenshot URL -->

## ✨ Features

- **Student Registration:** A user-friendly, multi-step form for students to register for available tech courses.
- **AI-Powered Course Recommendation:** An intelligent assistant to help students choose the best course based on their interests.
- **Secure File Uploads:** Functionality for students to upload payment receipts, which are stored securely in Firebase Storage.
- **Admin Dashboard:** A private, authenticated route for administrators to view, filter, search, and manage all student registrations.
- **Authentication:** Secure email and password authentication for the admin panel using Firebase Authentication.
- **Real-time Data:** The admin dashboard reflects real-time registration data from Firestore.
- **Responsive Design:** A modern, mobile-first interface built with ShadCN UI and Tailwind CSS.
- **Engaging UI/UX:** Smooth animations and transitions powered by Framer Motion for an enhanced user experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore, Firebase Storage, Firebase Authentication)
- **Generative AI:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Form Handling:** React Hook Form with Zod for validation
- **Deployment:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- A Google account to create a Firebase project.

### 1. Set Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. In your project dashboard, create a new **Web App**.
4. Copy the `firebaseConfig` object provided during the app creation.
5. Enable **Firestore**, **Firebase Storage**, and **Firebase Authentication** (with Email/Password provider) in the console.

### 2. Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Quantum-techlab/TechNexus.git
   cd TechNexus
npm install
npm run dev
.
├── src
│   ├── app                 # Next.js App Router pages and layouts
│   │   ├── admin           # Admin dashboard page and layout
│   │   ├── login           # Admin login page
│   │   └── page.tsx        # Homepage and registration form
│   ├── components          # Reusable React components (UI, forms, etc.)
│   │   ├── ui              # ShadCN UI components
│   │   └── auth            # Authentication-related components
│   ├── context             # React context providers (e.g., AuthContext)
│   ├── lib                 # Helper functions and Firebase configuration
│   ├── hooks               # Custom React hooks
│   └── ai                  # Genkit flows for AI features
├── public                  # Static assets
├── firebase.json           # Firebase project configuration
└── firestore.rules         # Firestore security rules
