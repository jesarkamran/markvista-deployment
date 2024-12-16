import FooterOptions from "./sub-components/FooterOptions";
import FooterReview from "./sub-components/FooterReview";
import AppName from "../AppName";
import SocialLinks from "./sub-components/SocialLinks";

const Footer = () => {
  return (
    <footer>
      <div
        id="contact"
        className="bg-white p-10 dark:bg-[var(--color-section)]"
      >
        {/* Flex Container */}
        <div className="container mx-auto flex flex-col-reverse justify-between space-y-8 px-6 py-10 md:flex-row md:space-y-0">
          {/* Logo and social links container */}
          <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:items-start md:space-y-0">
            <div className="mx-auto my-6 text-center text-white md:hidden">
              Copyright © 2022, All Rights Reserved
            </div>
            {/* Logo */}
            <div>
              <AppName />
            </div>
            {/* Social Links Container */}
            <SocialLinks />
          </div>
          {/* List Container */}
          <FooterOptions />

          {/* Input Container */}
          <div className="flex flex-col justify-between text-gray-800 dark:text-white">
            <FooterReview />
            <div className="hidden md:block">
              Copyright © 2024, All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
