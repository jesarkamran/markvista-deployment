import { FaGithub, FaTwitter, FaReddit, FaFacebook } from "react-icons/fa";

const SocialLink = ({ href, icon: Icon, className = "", size = 24 }) => (
  <a
    className={`text-lg px-1 ${className}`}
    target="_blank"
    rel="noreferrer"
    href={href}
  >
    <Icon className="fill-cyan" size={size} />
  </a>
);

const SocialLinks = ({ links }) => {
  return (
    <div className="md:absolute bottom-8 right-8 flex items-center">
      {links.repos_url.github[0] && (
        <SocialLink href={links.repos_url.github[0]} icon={FaGithub} />
      )}
      {links.twitter_screen_name && (
        <SocialLink
          href={`https://twitter.com/${links.twitter_screen_name}`}
          icon={FaTwitter}
        />
      )}
      {links.subreddit_url && (
        <SocialLink href={links.subreddit_url} icon={FaReddit} />
      )}
      {links.facebook_username && (
        <SocialLink
          href={`https://facebook.com/${links.facebook_username}`}
          icon={FaFacebook}
        />
      )}
    </div>
  );
};

export default SocialLinks;
