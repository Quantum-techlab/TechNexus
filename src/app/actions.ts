"use server";

import { z } from "zod";
import { recommendCourse } from "@/ai/flows/course-recommendation-engine";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  department: z.string().min(2, "Department is required."),
  matricNumber: z.string().min(5, "Matric/Registration number is required."),
  email: z.string().email("Please enter a valid email."),
  whatsappNumber: z.string().min(10, "Please enter a valid WhatsApp number."),
  course: z.string({ required_error: "Please select a course." }),
  receipt: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Payment receipt is required.")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB."
    )
    .refine(
      (file) => ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      "Only PDF, JPEG, and PNG files are allowed."
    ),
});

export type RegistrationState = {
  errors?: {
    fullName?: string[];
    department?: string[];
    matricNumber?: string[];
    email?: string[];
    whatsappNumber?: string[];
    course?: string[];
    receipt?: string[];
    _form?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function registerStudent(
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const validatedFields = FormSchema.safeParse({
    fullName: formData.get("fullName"),
    department: formData.get("department"),
    matricNumber: formData.get("matricNumber"),
    email: formData.get("email"),
    whatsappNumber: formData.get("whatsappNumber"),
    course: formData.get("course"),
    receipt: formData.get("receipt"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
      success: false,
    };
  }

  const { receipt, ...registrationData } = validatedFields.data;

  try {
    const storageRef = ref(storage, `receipts/${Date.now()}_${receipt.name}`);
    await uploadBytes(storageRef, receipt);
    const receiptUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, "registrations"), {
      ...registrationData,
      receiptUrl,
      timestamp: serverTimestamp(),
    });

    revalidatePath("/admin");

    return { message: "Registration successful!", success: true };
  } catch (error) {
    console.error("Registration Error:", error);
    let errorMessage = "An unknown error occurred during registration.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return {
        errors: { _form: [errorMessage] },
        message: "Database Error: Failed to register student.", 
        success: false 
    };
  }
}

export type DeleteState = {
  success?: boolean;
  message?: string;
};

export async function deleteRegistration(registrationId: string, receiptUrl: string): Promise<DeleteState> {
  try {
    // Delete receipt from storage
    if (receiptUrl) {
      // Create a reference from the full URL.
      // This is the correct way to get a reference to a file when you only have the download URL.
      const storageRef = ref(storage, receiptUrl);
      await deleteObject(storageRef);
    }
    
    // Delete document from firestore
    await deleteDoc(doc(db, 'registrations', registrationId));

    revalidatePath('/admin');
    return { success: true, message: 'Registration deleted successfully.' };
  } catch (error) {
    console.error("Delete Error:", error);
    let errorMessage = "An unknown error occurred during deletion.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, message: `Deletion failed: ${errorMessage}` };
  }
}

export type RecommendationState = {
  courseRecommendation?: string;
  reasoning?: string;
  error?: string;
};

export async function recommendCourseAction(
  interests: string
): Promise<RecommendationState> {
  if (!interests || interests.trim().length < 10) {
    return { error: "Please describe your interests in a bit more detail." };
  }

  try {
    const result = await recommendCourse({ interests });
    return result;
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { error: "Failed to get a recommendation. Please try again later." };
  }
}
