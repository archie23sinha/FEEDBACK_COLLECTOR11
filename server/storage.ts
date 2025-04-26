import { feedbacks, type Feedback, type InsertFeedback } from "@shared/schema";

export interface IStorage {
  getFeedbacks(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
}

export class MemStorage implements IStorage {
  private feedbacks: Map<number, Feedback>;
  private currentId: number;

  constructor() {
    this.feedbacks = new Map();
    this.currentId = 1;
  }

  async getFeedbacks(): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values()).sort((a, b) => {
      // Sort by createdAt in descending order (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.currentId++;
    const now = new Date();
    const feedback: Feedback = { 
      ...insertFeedback, 
      id, 
      createdAt: now 
    };
    
    this.feedbacks.set(id, feedback);
    return feedback;
  }
}

export const storage = new MemStorage();
