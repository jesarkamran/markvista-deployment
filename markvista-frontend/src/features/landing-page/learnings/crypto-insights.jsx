import { useState } from "react";
import { Lightbulb, TrendingUp, Globe, ChevronRight, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { learnings } from "@public/data";

const CryptoInsightsCard = ({ activeInfoTab, setActiveInfoTab }) => {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const infoTabs = [
    { id: "basics", label: "Crypto Basics", icon: Lightbulb },
    { id: "markets", label: "Market Dynamics", icon: TrendingUp },
    { id: "influences", label: "Influencing Factors", icon: Globe },
  ];

  const infoContent = learnings();

  const handleLearnMore = (insight) => {
    setSelectedInsight(insight);
  };

  const handleCloseModal = () => {
    setSelectedInsight(null);
  };

  return (
    <>
      <Card className="bg-white dark:bg-[var(--color-section)]">
        <CardHeader>
          <CardTitle>Crypto Insights</CardTitle>
          <CardDescription>
            Learn about cryptocurrencies and markets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={activeInfoTab}
            onValueChange={setActiveInfoTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              {infoTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="group">
                  <div className="flex items-center gap-2">
                    <tab.icon className="h-4 w-4" />
                    <span className="group-hover:text-primary transition-colors">
                      {tab.label}
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(infoContent).map(([key, items]) => (
              <TabsContent key={key} value={key} className="mt-4">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <Card
                        key={index}
                        className="bg-gray-100 transition-all hover:shadow-lg dark:bg-[var(--color-background)]"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg text-gray-800 dark:text-gray-200">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {item.content.slice(0, 200)}...
                          </p>
                          <Button
                            variant="link"
                            className="mt-2 p-0 text-blue-700 hover:underline"
                            onClick={() => handleLearnMore(item)}
                          >
                            Learn more <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Insight Modal */}
      <Dialog open={!!selectedInsight} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-white sm:max-w-[625px] dark:bg-[var(--color-background)]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedInsight?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              {selectedInsight?.content}
            </DialogDescription>
          </DialogHeader>

          {selectedInsight?.details && (
            <div className="mt-4">
              <h3 className="mb-2 text-xl font-semibold">Detailed Insights</h3>
              <div className="space-y-3">
                {selectedInsight.details.map((detail, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-gray-100 p-3 dark:bg-gray-900"
                  >
                    <h4 className="mb-1 font-medium">{detail.subtitle}</h4>
                    <p className="text-sm text-gray-800 dark:text-gray-300">
                      {detail.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <DialogClose asChild>
              <Button
                className="hover:bg-red-500 hover:text-white"
                variant="outline"
                onClick={handleCloseModal}
              >
                Close
                <X className="ml-2 h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CryptoInsightsCard;
