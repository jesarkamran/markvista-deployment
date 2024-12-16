import Container from "../../components/Container";
import heroImg from "../../assets/images/hero.png";
import AppName from "../../components/AppName";
import LinkButton from "../../components/LinkButton";

const Welcome = () => {
  return (
    <>
      <Container className="flex sm:my-8">
        <div className="mx-5 my-16 flex w-full items-center md:mx-3 lg:w-1/2">
          <div className="mb-8 max-w-2xl text-center md:text-justify">
            <AppName />
            <h2 className="text-m font-bold leading-snug tracking-tight text-gray-800 xl:leading-tight dark:text-gray-400">
              Strategist for Crypto Markets
            </h2>

            <p className="text-l lg:text-l py-5 font-medium leading-normal text-gray-800 sm:text-justify lg:text-justify xl:text-2xl dark:text-gray-300">
              Gain a comprehensive view of the market and tailor your strategies
              based on personalized risk profiles. With MarkVista, invest
              smarter and more confidently.
            </p>

            <div className="m-10 flex flex-col items-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-start">
              <LinkButton to={"/login"} />
            </div>
          </div>
        </div>
        <div className="hidden w-full items-center justify-center sm:block lg:w-1/2">
          <div>
            <img
              src={heroImg}
              width="900"
              height="500"
              className={"object-cover"}
              alt="Crypto Currencies Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Welcome;
