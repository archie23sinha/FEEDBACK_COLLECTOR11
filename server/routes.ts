import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all feedbacks
  app.get("/api/feedbacks", async (req, res) => {
    try {
      const feedbacks = await storage.getFeedbacks();
      return res.json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      return res.status(500).json({ 
        message: "Failed to fetch feedback entries" 
      });
    }
  });

  // Submit new feedback
  app.post("/api/submit-feedback", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertFeedbackSchema.parse(req.body);
      
      // Store feedback
      const newFeedback = await storage.createFeedback(validatedData);
      
      return res.status(201).json(newFeedback);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message
        });
      }
      
      console.error("Error submitting feedback:", error);
      return res.status(500).json({
        message: "Failed to submit feedback"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
