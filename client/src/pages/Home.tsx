import { useState, useEffect } from "react";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

export default function Home() {
  const [showFeedbackList, setShowFeedbackList] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation on page load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleFeedbackList = () => {
    setShowFeedbackList((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 transition-colors duration-500 dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
      <div 
        className={`container mx-auto max-w-3xl px-4 py-8 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Header */}
        <header className="mb-10 text-center animate-fade-in-down">
          <div className="inline-block mb-3 relative">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Feedback Collector
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md mx-auto">
            We value your feedback. Please share your thoughts with us.
          </p>
        </header>

        {/* Theme Toggle */}
        <div className="mb-6 flex justify-end animate-fade-in">
          <ThemeToggle />
        </div>

        {/* Feedback Form */}
        <div className="mb-10 rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-700 dark:shadow-gray-900/30 animate-fade-in-up">
          <h2 className="mb-5 text-xl font-semibold">
            <span className="inline-flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 text-blue-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Submit Feedback
            </span>
          </h2>
          <FeedbackForm />
        </div>

        {/* Admin Toggle */}
        <div className="mb-8 flex justify-center animate-fade-in">
          <button
            className="flex items-center rounded-full bg-gradient-to-r from-gray-200 to-gray-300 px-5 py-3 font-medium transition-all duration-300 hover:shadow-md hover:scale-105 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 animate-pulse-glow"
            onClick={toggleFeedbackList}
          >
            <span>View Submitted Feedback</span>
            <svg
              className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${
                showFeedbackList ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Feedback List */}
        <div className={`transition-all duration-500 overflow-hidden ${showFeedbackList ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {showFeedbackList && <FeedbackList />}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
