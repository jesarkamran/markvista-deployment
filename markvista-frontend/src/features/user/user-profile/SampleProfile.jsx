import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ChevronDown, Copy } from "lucide-react";
import Button from "@components/Button";

export default function Sample() {
  return (
    <div className="h-[80vh] bg-[#161616] p-6 text-white">
      {/* User Profile */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-yellow-400" />
          <div>
            <h2 className="text-xl font-semibold">Anonymous-User-08184</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>User ID</span>
              <Button type="round" style="h-4 w-4">
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy User ID</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="mb-8 rounded-lg bg-[#1E1E1E] p-6">
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

      {/* Markets Section */}
      <div className="rounded-lg bg-[#1E1E1E] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Markets</h3>
          <Button type="large">More</Button>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Coin</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Coin Price</TableHead>
              <TableHead className="text-right">Today&apos;s PnL</TableHead>
              <TableHead className="text-right">Trade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">******</TableCell>
              <TableCell className="text-right">******</TableCell>
              <TableCell className="text-right">******</TableCell>
              <TableCell className="text-right">******</TableCell>
              <TableCell className="text-right">
                <Button type="large">Trade</Button>
              </TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
