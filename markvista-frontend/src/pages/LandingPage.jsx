import Welcome from "../features/landing-page/Welcome";
import Services from "../features/landing-page/Services";
import DevTeams from "../features/landing-page/DevTeams";
import CryptoCurrencyCards from "../features/landing-page/CryptoCurrencyCards";

import DashboardCard04 from "../partials/DashboardCard04";

import Logo from "../components/Logo";
import Header from "../components/header/Header";
import Container from "../components/Container";
import Footer from "../components/footer/Footer";
import PageNav from "../components/header/sub-components/PageNav";
import NavLandingPage from "../components/header/sub-components/NavLandingPage";

function LandingPage() {
  return (
    <div className="flex h-screen flex-col">
      {/* Site header */}
      <Header>
        <Logo />
        <PageNav />
        <NavLandingPage />
      </Header>

      {/* Scrollable content area */}
      <div style={{ scrollbarWidth: "none" }} className="flex-1 overflow-auto">
        <main>
          <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
            {/* Welcome banner */}
            <section id="home">
              <Welcome />
            </section>

            {/* Services */}
            <section id="services">
              <Services />
            </section>

            {/* Cards */}
            <section id="market">
              <Container>
                <div className="text-center text-3xl font-semibold text-gray-700 dark:text-white">
                  <span className="text-indigo-600">Crypto</span> Market Prices
                </div>
              </Container>
            </section>
            <CryptoCurrencyCards />

            <div className="flex gap-6">
              <div className="w-8/12">
                <DashboardCard04 />
              </div>
            </div>
          </div>

          {/* Team Section */}
          <DevTeams />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
