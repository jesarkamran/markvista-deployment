import { Outlet } from "react-router-dom";
import Filters from "./crypto-list/Filters";
import TableComponent from "./crypto-list/TableComponent";
import Pagination from "./crypto-list/Pagination";

function CryptoList() {
  return (
    <section className="flex w-[100%] flex-col overflow-hidden rounded-sm sm:w-[100%] md:w-[80%] lg:w-[100%]">
      <Filters />
      <TableComponent />
      <div className="my-4 flex h-[3rem] items-center justify-between p-1">
        <Pagination />
      </div>
      <Outlet />
    </section>
  );
}

export default CryptoList;
