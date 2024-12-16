import TeamCard from "../../components/cards/TeamCard";

function DevTeams() {
  return (
    <section id="team" className="m-8">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Our team
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            The MarkVista Project would not be possible without the exceptional
            team of developers who breathe life into its vision. Our team is a
            collective of passionate innovators, each bringing their unique
            expertise to the table.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
      </div>
    </section>
  );
}

export default DevTeams;
