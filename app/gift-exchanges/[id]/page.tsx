"use client";

import { GiftExchange } from "@/app/types/giftExchange";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiftExchangeHeader } from "./GiftExchangeHeader";
import { JourneyCard } from "./JourneyCard";
import { MembersList } from "./MembersList";
import { InviteCard } from "./InviteCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { GiftExchangeMember } from "@/app/types/giftExchangeMember";
import { Profile } from "@/app/types/profile";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

export default function GiftExchangePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [giftExchangeData, setGiftExchangeData] = useState<GiftExchange>({
    id: "",
    name: "",
    description: "",
    budget: "",
    drawing_date: "",
    group_image: "",
    exchange_date: "",
    owner_id: "",
    status: "pending",
  });
  const [giftExchangeMembers, setGiftExchangeMembers] = useState<
    GiftExchangeMember[]
  >([]);

  const [giftMatch, setGiftMatch] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [giftExchangeResponse, membersResponse, giftSuggestionsResponse] =
          await Promise.all([
            fetch(`/api/gift-exchanges/${id}`),
            fetch(`/api/gift-exchanges/${id}/members`),
            fetch(`/api/gift-exchanges/${id}/giftSuggestions`),
          ]);

        const [giftExchangeResult, membersResult, giftSuggestionsResult] =
          await Promise.all([
            giftExchangeResponse.json(),
            membersResponse.json(),
            giftSuggestionsResponse.json(),
          ]);

        setGiftExchangeData(giftExchangeResult);
        setGiftExchangeMembers(membersResult);
        setGiftMatch(giftSuggestionsResult);
        console.log(giftMatch);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingSkeleton statsCount={4} cardItemCount={10} />;
  }

  const renderContent = () => {
    switch (giftExchangeData.status) {
      case "pending":
        return (
          <div className="flex flex-row w-full pt-12 gap-8 items-start">
            <JourneyCard
              drawingDate={giftExchangeData.drawing_date}
              exchangeDate={giftExchangeData.exchange_date}
            />
            <div className="flex flex-col gap-4 w-full max-w-md">
              <MembersList members={giftExchangeMembers} />
              <InviteCard />
            </div>
          </div>
        );
      case "active":
        return <div className="w-full pt-12"></div>;
    }
  };

  return (
    <main className="h-screen">
      <section className="mx-auto flex flex-col gap-4 px-4 md:px-16 lg:px-32 xl:px-52 pt-12 text-primary-foreground">
        <GiftExchangeHeader giftExchangeData={giftExchangeData} />
        {renderContent()}
      </section>
    </main>
  );
}
