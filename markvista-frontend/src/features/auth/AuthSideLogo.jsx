import heroIcon from "../../assets/images/logo-dark.svg";

function AuthSideLogo() {
  return (
    <div className="hidden flex-1 bg-blue-950 text-center md:flex">
      <div
        className="m-12 w-full bg-contain bg-center bg-no-repeat xl:m-16"
        style={{
          backgroundImage: `url(${heroIcon})`,
        }}
      ></div>
    </div>
  );
}

export default AuthSideLogo;
