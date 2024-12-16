const NotificationSettings = () => {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold text-blue-400">
        Notification Settings
      </h3>
      <p className="text-gray-400">
        Notifications are currently:{" "}
        <span className="font-bold text-green-400">Enabled</span>
      </p>
      <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
        Toggle Notifications
      </button>
    </>
  );
};

export default NotificationSettings;
