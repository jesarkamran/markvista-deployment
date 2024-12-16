import ServicesCard from "../../components/cards/ServicesCard";
import { FaBriefcase, FaChartLine } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdGroup } from "react-icons/md";
import { RiAdminFill, RiComputerLine } from "react-icons/ri";
import services from "@public/data";

const icons = {
  portfolioIcon: FaBriefcase,
  riskManagementIcon: ImProfile,
  communityIcon: MdGroup,
  marketPredictionsIcon: FaChartLine,
  adminDashboardIcon: RiAdminFill,
  tradingPanelIcon: RiComputerLine,
};

const servicesData = services();

const Services = () => {
  return (
    <div id="services" className="py-10 text-center">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-3xl font-bold">
          <h2 className="text-gray-800 dark:text-white">
            MarkVista Amazing Features
          </h2>
          <p className="mt-2 text-xl font-medium text-gray-700 dark:text-gray-500">
            Explore Crypto Markets with ease by using our Services
          </p>
        </div>
        <div
          // className="flex flex-col items-center space-y-4 sm:flex-row sm:flex-wrap sm:gap-4 sm:space-y-0"
          className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {servicesData.map((service, i) => (
            <ServicesCard
              key={i}
              serviceName={service.name}
              serviceIcon={icons[service.icon]}
              serviceDesc={service.service}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
