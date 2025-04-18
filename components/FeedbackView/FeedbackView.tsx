"use client";
import { ChevronLeft } from "lucide-react";
import { GiftSuggestion } from "@/app/types/giftSuggestion";
import { Profile } from "@/app/types/profile";
import { generateAndUpdateNewGiftSuggestion } from "@/lib/generateAndUpdateNewGiftSuggestion";
import { useState } from "react";

const FeedbackView = ({
  allGiftSuggestions,
  budget,
  gift,
  handleFeedback,
  onGiftUpdate,
  recipient,
}: {
  allGiftSuggestions: GiftSuggestion[];
  budget: string;
  gift: GiftSuggestion;
  handleFeedback: () => void;
  onGiftUpdate: (updatedGift: GiftSuggestion) => void;
  recipient: Profile | null;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFeedbackSubmit = async (feedback: string) => {
    setIsLoading(true);
    try {
      const updatedGift = await generateAndUpdateNewGiftSuggestion(
        allGiftSuggestions,
        budget,
        feedback,
        gift,
        recipient
      );

      if (updatedGift) {
        onGiftUpdate(updatedGift);
      } else {
        console.error("Failed to update gift suggestion");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col m-4 h-full">
      {isLoading ? (
        <>
          <div className="flex justify-center items-center h-full">
            <div className="border-t-4 border-red-500 border-solid w-12 h-12 rounded-full animate-spin"></div>
          </div>
        </>
      ) : (
        <>
          <ChevronLeft
            className="hover:cursor-pointer"
            onClick={handleFeedback}
          />
          <h1 className="text-sm text-[#21443D] font-bold mx-auto mt-4">
            Give Us Feedback
          </h1>
          <div className="flex flex-col justify-center mt-4 gap-4">
            {[
              { title: "Too Expensive", subtitle: "Show lower price range" },
              { title: "Not Their Style", subtitle: "Try different interests" },
              { title: "They Might Have This", subtitle: "Show alternatives" },
            ].map(({ title, subtitle }, index) => (
              <button
                key={index}
                className="bg-[#E5ECDF] w-72 h-20 rounded-xl hover:bg-[#DBE2D5]"
                onClick={() => handleFeedbackSubmit(`${title}: ${subtitle}`)}
              >
                <p className="text-sm font-bold">{title}</p>
                <p className="text-sm">{subtitle}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackView;
