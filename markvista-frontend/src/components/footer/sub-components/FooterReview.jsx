function FooterReview() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-3">
        <input
          type="text"
          className="flex-1 rounded-full px-4 text-gray-800 focus:outline-none"
          placeholder="Updated in your inbox"
        />
        <button className="rounded-full bg-blue-700 px-6 py-2 text-white hover:bg-blue-900 focus:outline-none">
          Go
        </button>
      </div>
    </form>
  );
}

export default FooterReview;
