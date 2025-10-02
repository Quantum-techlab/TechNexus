# TECHNEXus 7.0 Registration Portal

This is the official registration portal for the 7th Edition of TECHNEXus, an upskilling and learning program hosted by the Department of Information Technology, University of Ilorin. This full-stack application is built with Next.js and Firebase, providing a seamless registration experience for students and a comprehensive dashboard for administrators.

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

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project.
3.  In your project dashboard, create a new **Web App**.
4.  Copy the `firebaseConfig` object provided during the app creation.
5.  Enable **Firestore**, **Firebase Storage**, and **Firebase Authentication** (with Email/Password provider) in the console.

### 2. Local Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/technexus-portal.git
    cd technexus-portal
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of your project and populate it with your Firebase project credentials. You can get these from the `firebaseConfig` object you copied earlier.

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
    ```

4.  **Update Firebase Configuration in Code:**
    Replace the placeholder configuration in `src/lib/firebase.ts` with your actual `firebaseConfig` object.

### 3. Running the Application

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📂 Project Structure

```
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
```

## 🔐 Security Rules

The application includes basic security rules in `firestore.rules` and `storage.rules`. These are configured to:
- Allow public read/write access to the `registrations` collection for the form.
- Restrict access to authenticated admins for certain operations.

**Important:** For a production environment, you must refine these security rules to be more restrictive. Ensure that only authenticated admins can read and delete registration data.

## ☁️ Deployment

This project is configured for deployment with **Firebase App Hosting**. The `apphosting.yaml` file contains the basic configuration. To deploy, you can link your repository to a Firebase App Hosting backend in the Firebase console.

## 📞 Contact

For inquiries or issues, please reach out via WhatsApp or call: **08160805643**.
