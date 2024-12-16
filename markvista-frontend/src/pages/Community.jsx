import TopQueries from "@features/community/TopQueries";
import PopularTags from "@features/community/PopularTags";
import { Outlet, Route, Routes } from "react-router-dom";
import ShowQueries from "@features/community/ShowQueries";
import ViewQuery from "@features/community/ViewQuery";
import NavCommunity from "@features/community/NavCommunity";
import AddQuery from "@features/community/AddQuery";

function QueriesLayout() {
  return (
    <DefaultPage>
      <Outlet />
    </DefaultPage>
  );
}

export default function Community() {
  return (
    <Routes>
      <Route path="/" element={<QueriesLayout />}>
        <Route index path="/" element={<ShowQueries />} />
        <Route path="query/:queryId" element={<ViewQuery />} />
        <Route path="search-results/:query" element={<ShowQueries />} />
      </Route>
      <Route path="post-query" element={<AddQuery />} />
    </Routes>
  );
}

const DefaultPage = ({ children }) => {
  return (
    <div className="mx-auto flex h-[95vh] max-w-7xl flex-col gap-6 p-4 text-black md:p-6 lg:flex-row dark:text-gray-300">
      <div className="flex flex-col">
        <NavCommunity />
        {/* Scrollable Query List Section */}
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 flex-1 overflow-y-auto py-4">
          {children}
        </div>
      </div>

      {/* Static Sidebar */}
      <div className="static space-y-6 pt-4 sm:mb-5 lg:w-80">
        <TopQueries />
        <PopularTags />
      </div>
    </div>
  );
};
