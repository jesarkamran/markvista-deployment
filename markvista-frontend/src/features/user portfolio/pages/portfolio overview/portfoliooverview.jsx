import {
  LSComponent,
  Accgrowth,
  Coinoverview,
  TradeOverview,
  Goals,
} from "../../containers/index";
import "./portfoliooverview.css"; // Import the CSS file

const Portfoliooverview = () => {
  return (
    <div className="container_portfolio">
      {/* First Main Section */}
      <div className="first-main-section">
        <div className="left-column">
          <TradeOverview />
          {/* <div className="h-[]"> */}
          <Accgrowth />
          {/* </div> */}
          <LSComponent />
        </div>
        <div className="right-column">
          <Goals />
        </div>
      </div>

      {/* Second Main Section */}
      <div className="second-main-section">
        <Coinoverview />
      </div>
    </div>
  );
};

export default Portfoliooverview;
