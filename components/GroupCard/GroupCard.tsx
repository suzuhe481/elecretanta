import { GiftExchangeWithMemberCount } from "@/app/types/giftExchange";
import { formatDate } from "@/lib/utils";
import { ChevronRight, Users } from "lucide-react";
import Link from "next/link";

type GroupCardProps = {
  giftExchange: GiftExchangeWithMemberCount;
};

export const GroupCardSkeleton = () => {
  return (
    <div className="h-28 flex items-center p-4 rounded-xl bg-groupCardGreen animate-pulse">
      <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-xl bg-gray-600" />
      <div className="flex flex-col flex-grow justify-center h-full ml-4 gap-2">
        <div className="h-6 w-48 bg-gray-600 rounded" />
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <div className="h-6 lg:h-8 w-6 lg:w-8 bg-gray-600 rounded" />
            <div className="h-4 w-20 bg-gray-600 rounded" />
          </div>
          <div className="h-4 w-32 bg-gray-600 rounded" />
        </div>
      </div>
      <div className="h-6 w-6 bg-gray-600 rounded" />
    </div>
  );
};

const GroupCard = ({ giftExchange }: GroupCardProps) => {
  return (
    <Link href={`/gift-exchanges/${giftExchange.gift_exchange_id}`}>
      <div className="h-28 flex items-center p-4 rounded-xl bg-groupCardGreen">
        <img
          className="h-16 w-16 lg:h-20 lg:w-20 rounded-xl"
          src={giftExchange.group_image}
          alt={`${giftExchange.name} image`}
        />
        <div className="flex flex-col flex-grow justify-center h-full ml-4 gap-2">
          <h2 className="font-semibold text-white text-base lg:text-lg">
            {giftExchange.name}
          </h2>
          <div className="flex gap-4 items-center">
            <span className="flex gap-2 items-center">
              <Users className="text-white opacity-70 h-6 lg:h-8" />
              <p className="text-white text-xs lg:text-sm">
                {giftExchange.member_count}{" "}
                {giftExchange.member_count === 1 ? "member" : "members"}
              </p>
            </span>
            <p className="text-white text-xs lg:text-sm">
              Draw: {formatDate(giftExchange.drawing_date)}
            </p>
          </div>
        </div>
        <ChevronRight className="text-groupCardArrow" />
      </div>
    </Link>
  );
};

export default GroupCard;
