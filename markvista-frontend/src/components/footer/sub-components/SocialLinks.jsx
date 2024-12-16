import { Link } from "react-router-dom";

import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";

function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4 text-5xl">
      {/* Link 1 */}
      <Link to="#">
        <BsLinkedin
          style={{
            backgroundColor: "white",
            borderRadius: 5,
            color: "#1877F2",
          }}
        />
      </Link>
      {/* Link 3 */}
      <Link to="#">
        <BsTwitter style={{ color: "#1877F2" }} />
      </Link>
      {/* Link 4 */}
      <Link to="#">
        <BsGithub
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            color: "#000",
          }}
        />
      </Link>
    </div>
  );
}

export default SocialLinks;
