import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Feedback } from "@shared/schema";
import { useState, useEffect } from "react";

export default function FeedbackList() {
  const [isVisible, setIsVisible] = useState(false);
  
  const {
    data: feedbacks,
    isLoading,
    isError,
    error,
  } = useQuery<Feedback[]>({
    queryKey: ["/api/feedbacks"],
  });
  
  // Animation delay for the entire component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent shadow-lg"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading feedback...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-8 rounded-xl bg-red-100 p-6 text-red-800 dark:bg-red-900/30 dark:text-red-200 shadow-md animate-fade-in">
        <div className="flex items-center">
          <svg className="h-6 w-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-medium">Failed to load feedback: {error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </div>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="rounded-xl bg-gray-100 p-10 text-center dark:bg-gray-700/50 shadow-inner animate-fade-in">
        <div className="mb-6 rounded-full bg-gray-200 dark:bg-gray-600 p-4 inline-block mx-auto">
          <svg
            className="mx-auto h-14 w-14 text-gray-400 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-200">No Feedback Yet</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          It looks like no one has submitted any feedback yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="mb-6 text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
        Submitted Feedback
      </h2>
      
      <div className="grid gap-5 md:grid-cols-2 staggered-animation">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="feedback-card rounded-xl bg-white p-6 shadow-lg dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-medium text-lg">
                    {feedback.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{feedback.name}</h3>
              </div>
              <span className="text-sm bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                {format(new Date(feedback.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <div className="mb-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {feedback.email}
            </div>
            <div className="mt-4 border-t border-gray-100 dark:border-gray-600 pt-4">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{feedback.message}</p>
            </div>
            <div className="mt-3 text-xs text-right text-gray-400 dark:text-gray-500">
              {format(new Date(feedback.createdAt), "h:mm a")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
