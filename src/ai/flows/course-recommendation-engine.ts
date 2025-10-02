'use server';

/**
 * @fileOverview A course recommendation AI agent.
 *
 * - recommendCourse - A function that provides course recommendations based on student interests and TECHNEXus edition focus.
 * - RecommendCourseInput - The input type for the recommendCourse function.
 * - RecommendCourseOutput - The return type for the recommendCourse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCourseInputSchema = z.object({
  interests: z
    .string()
    .describe('The interests of the student, which can be a single sentence or a few keywords.'),
});
export type RecommendCourseInput = z.infer<typeof RecommendCourseInputSchema>;

const RecommendCourseOutputSchema = z.object({
  courseRecommendation: z.string().describe('The recommended course based on the student\'s interests and TECHNEXus edition focus.'),
  reasoning: z.string().describe('The reasoning behind the course recommendation.'),
});
export type RecommendCourseOutput = z.infer<typeof RecommendCourseOutputSchema>;

export async function recommendCourse(input: RecommendCourseInput): Promise<RecommendCourseOutput> {
  return recommendCourseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCoursePrompt',
  input: {schema: RecommendCourseInputSchema},
  output: {schema: RecommendCourseOutputSchema},
  prompt: `You are an AI assistant designed to recommend the most suitable tech course from the TECHNEXus program for students. TECHNEXus is an upskilling and learning program hosted by the Department of Information Technology, University of Ilorin.

  Consider the student\'s interests and the current focus of the TECHNEXus 7th Edition when making your recommendation. The available courses are Web Development, Data Science, Cybersecurity, Cloud Computing, UI/UX, and AI/ML.

  Student Interests: {{{interests}}}

  Given the student\'s interests, which course do you recommend and why?

  Format your response as follows:
  Course Recommendation: [Recommended Course]
  Reasoning: [Explanation of why this course is recommended based on the student\'s interests and TECHNEXus focus]`,
});

const recommendCourseFlow = ai.defineFlow(
  {
    name: 'recommendCourseFlow',
    inputSchema: RecommendCourseInputSchema,
    outputSchema: RecommendCourseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
