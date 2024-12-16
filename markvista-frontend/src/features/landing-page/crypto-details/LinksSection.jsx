const LinkItem = ({ href, text }) => (
  <a
    target="_blank"
    rel="noreferrer"
    className="my-1 rounded bg-blue-700 bg-opacity-25 px-1.5 py-0.5 text-sm text-blue-500"
    href={href}
  >
    {text}
  </a>
);

const LinksSection = ({ links }) => (
  <div className="flex flex-col">
    <LinkItem
      href={links?.homepage[0]}
      text={links?.homepage[0].substring(0, 30)}
    />
    <LinkItem
      href={links?.blockchain_site[0]}
      text={links?.blockchain_site[0].substring(0, 30)}
    />
    {links?.official_forum_url[0] && (
      <LinkItem
        href={links?.official_forum_url[0]}
        text={links?.official_forum_url[0].substring(0, 30)}
      />
    )}
  </div>
);

export default LinksSection;
