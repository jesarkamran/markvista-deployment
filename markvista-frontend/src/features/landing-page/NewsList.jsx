import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import getNews from "./dummyNews";

const NewsList = () => {
  const [filter, setFilter] = useState("All");
  const newsData = getNews();

  console.log(filter);

  const filteredNews =
    filter === "All"
      ? newsData
      : newsData.filter((item) => {
          console.log(filter);

          return item.sentiment === filter;
        });

  return (
    <Card className="flex flex-col bg-white shadow-sm dark:bg-[var(--color-section)]">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Crypto News</CardTitle>
          <Tabs value={filter} defaultValue="All" onTabChange={setFilter}>
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Positive">Positive</TabsTrigger>
              <TabsTrigger value="Negative">Negative</TabsTrigger>
              <TabsTrigger value="Neutral">Neutral</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <NewsListChild newsData={filteredNews} />
      </CardContent>
    </Card>
  );
};
const NewsListChild = ({ newsData }) => {
  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="m-2 h-[400px] w-full overflow-auto rounded-md border border-gray-500 border-opacity-45 p-1 dark:border-[var(--color-background)]"
    >
      {newsData.map((newsItem, index) => (
        <NewsItem newsItem={newsItem} key={index} />
      ))}
    </div>
  );
};

export default NewsList;

const NewsItem = ({ newsItem }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "green";
      case "Negative":
        return "red";
      default:
        return "yellow";
    }
  };

  return (
    <div className="mb-2 flex items-start rounded-md border border-gray-700 border-opacity-25 bg-white p-1 dark:border-b-gray-300 dark:bg-[var(--color-background)] dark:text-gray-200">
      <img
        src={newsItem.image_url}
        alt="News Thumbnail"
        className="mr-2 h-16 w-16 rounded object-cover"
      />
      <div className="flex-grow">
        <a
          href={newsItem.news_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-md line-clamp-2 font-bold text-blue-600 hover:underline"
        >
          {newsItem.title}
        </a>
        <p className="mt-1 line-clamp-3 text-xs">{newsItem.text}</p>
        <div className="mt-1 flex flex-wrap items-center text-xs">
          <span className="mr-1 rounded bg-gray-700 px-1 py-0.5 text-gray-200 dark:bg-gray-200 dark:text-gray-700">
            {newsItem.tickers[0]}
          </span>
          <span>{newsItem.source_name}</span>
          <span className="mx-1">|</span>
          <span>{newsItem.date}</span>
          <span className="mx-1">|</span>
          <Badge
            variant="outline"
            className={`mb-1 border-${getSentimentColor(
              newsItem.sentiment,
            )}-600 text-${getSentimentColor(newsItem.sentiment)}-600`}
          >
            {newsItem.sentiment}
          </Badge>
        </div>
      </div>
    </div>
  );
};
