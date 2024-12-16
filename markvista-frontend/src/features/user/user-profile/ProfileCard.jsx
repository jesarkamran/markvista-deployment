import useUser from "../../../stores/user-context/useUser";
import ImagePreview from "../ImagePreview";
import { BiBell } from "react-icons/bi";
import ButtonPopup from "../ButtonPopup";
import NotificationSettings from "./NotificationSettings";
import Card from "./Card";
import Button from "@components/Button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

import { ChevronDown } from "lucide-react";
import CommunityActivity from "./CommuntiyActivity";

const userData = {
  username: "JohnDoe",
  communityStats: { totalInteractions: 5420 },
  achievements: [
    /* array of achievements */
  ],
  recentActivity: [
    { description: "Helped resolve a community issue" },
    { description: "Posted a helpful tutorial" },
  ],
  contributionLevel: 2,
  joinDate: new Date("2023-01-15"),
  totalContributions: 247,
  specialBadges: ["Top Contributor", "Community Helper", "Problem Solver"],
};

const ProfileCard = () => {
  const { user } = useUser();
  return (
    <div className="flex max-h-max w-full flex-col space-y-4 rounded-lg bg-gradient-to-br from-white to-gray-100 p-6 text-gray-600 shadow-md dark:from-[var(--color-section)] dark:to-stone-800 dark:text-gray-100">
      <div className="flex w-full justify-between">
        <div className="flex">
          <ImagePreview
            addStyles="mr-6 h-16 w-16"
            photo={user.photo}
            alt={user.name[0].toUpperCase()}
          />
          <div className="mt-2">
            <h2 className="text-xl font-semibold text-blue-500">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        <div>
          <ButtonPopup Logo={BiBell}>
            <Card>
              <NotificationSettings />
            </Card>
          </ButtonPopup>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="balance" className="mb-6">
        <TabsList>
          <TabsTrigger value="balance">Balance</TabsTrigger>
          <TabsTrigger value="market">Markets</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="balance">
          <Balance />
        </TabsContent>
        <TabsContent value="market">
          <Market />
        </TabsContent>

        <TabsContent value="community">
          <CommunityActivity userData={userData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileCard;

const Balance = () => {
  return (
    <div className="mb-8 rounded-lg bg-slate-200 p-6 dark:bg-[var(--color-background)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Estimated Balance</h3>
        <div className="flex space-x-2">
          <Button type="large">Deposit</Button>
          <Button type="large">Withdraw</Button>
          <Button type="large">Cash In</Button>
        </div>
      </div>
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-2xl font-bold">******</span>
        <span>BTC</span>
        <ChevronDown className="h-4 w-4" />
      </div>
      <div className="text-sm text-gray-400">Today&apos;s PnL ******</div>
    </div>
  );
};

const Market = () => {
  return (
    <div className="my-5 rounded-lg bg-slate-200 p-6 dark:bg-[#1E1E1E]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Markets</h3>
      </div>
      <Tabs defaultValue="holding" className="mb-6">
        <TabsList>
          <TabsTrigger value="holding">Holding</TabsTrigger>
          <TabsTrigger value="hot">Hot</TabsTrigger>
          <TabsTrigger value="new">New Listing</TabsTrigger>
          <TabsTrigger value="favorite">Favorite</TabsTrigger>
          <TabsTrigger value="top">Top Gainers</TabsTrigger>
          <TabsTrigger value="volume">24h Volume</TabsTrigger>
        </TabsList>
      </Tabs>
      <Table className="min-w-full rounded-sm border border-white dark:border-[var(--color-section)]">
        <TableHeader>
          <TableRow className="bg-white dark:bg-[var(--color-section)]">
            <TableHead className="text-left">Coin</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Coin Price</TableHead>
            <TableHead className="text-center">Today&apos;s PnL</TableHead>
            <TableHead className="text-left">Trade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">******</TableCell>
            <TableCell className="text-center">******</TableCell>
            <TableCell className="text-center">******</TableCell>
            <TableCell className="text-center">******</TableCell>
            <TableCell className="items-center">
              <Button type="large">Trade</Button>
            </TableCell>
          </TableRow>

          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </div>
  );
};
