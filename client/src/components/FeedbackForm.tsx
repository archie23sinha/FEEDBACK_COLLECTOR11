import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFeedbackSchema, type InsertFeedback } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InsertFeedback>({
    resolver: zodResolver(insertFeedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertFeedback) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/submit-feedback", data);
      
      // Show success message
      setShowSuccess(true);
      // Reset form
      reset();
      // Invalidate feedbacks query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/feedbacks"] });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit feedback",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div className="relative">
        <input
          type="text"
          id="name"
          placeholder=" "
          className={`w-full rounded-lg border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } bg-white p-3 pt-6 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800`}
          {...register("name")}
        />
        <label
          htmlFor="name"
          className="absolute left-3 top-3 origin-left transform text-gray-500 transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-blue-500 dark:text-gray-400"
        >
          Full Name
        </label>
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          id="email"
          placeholder=" "
          className={`w-full rounded-lg border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } bg-white p-3 pt-6 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800`}
          {...register("email")}
        />
        <label
          htmlFor="email"
          className="absolute left-3 top-3 origin-left transform text-gray-500 transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-blue-500 dark:text-gray-400"
        >
          Email Address
        </label>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Feedback Field */}
      <div className="relative">
        <textarea
          id="message"
          rows={4}
          placeholder=" "
          className={`w-full rounded-lg border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } bg-white p-3 pt-6 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800`}
          {...register("message")}
        />
        <label
          htmlFor="message"
          className="absolute left-3 top-3 origin-left transform text-gray-500 transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-blue-500 dark:text-gray-400"
        >
          Your Feedback
        </label>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center rounded-full bg-blue-500 px-6 py-2 text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-gray-800"
      >
        <span>Submit Feedback</span>
        {isSubmitting && (
          <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        )}
      </button>

      {/* Success Message */}
      {showSuccess && (
        <div className="mt-4 rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900 dark:text-green-100">
          <div className="flex items-center">
            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p>Thank you for your feedback! We appreciate your input.</p>
          </div>
        </div>
      )}
    </form>
  );
}
