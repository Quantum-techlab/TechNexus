import type { Timestamp } from "firebase/firestore";

export type Registration = {
    id: string;
    fullName: string;
    department: string;
    matricNumber: string;
    email: string;
    whatsappNumber: string;
    course: string;
    receiptUrl: string;
    timestamp: Timestamp;
};
