//roles.js
const roles = [
  {
    name: "admin",
    permissions: [
      "create_record",
      "read_record",
      "update_record",
      "delete_record",
      "update_own_record",
      "delete_own_record",
    ],
  },
  {
    name: "front",
    permissions: [
      "create_record",
      "read_record",
      "update_record",
      "update_own_record",
      "delete_own_record",
    ],
  },
  {
    name: "user",
    permissions: [
      "create_record",
      "read_record",
      "update_own_record",
      "delete_own_record",
    ],
  },
];

const getPermissionsByRoleName = (roleName) => {
  const role = roles.find((r) => r.name === roleName);
  return role ? role.permissions : [];
};

module.exports = { getPermissionsByRoleName };
