const AdminPermissions = () => {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold text-blue-400">Admin Actions</h3>
      <p className="text-gray-400">You have admin privileges to:</p>
      <ul className="ml-5 list-disc text-gray-400">
        <li>Update Privacy Policy</li>
        <li>Delete User Interactions</li>
        <li>Manage User Profiles</li>
      </ul>
    </>
  );
};

export default AdminPermissions;
