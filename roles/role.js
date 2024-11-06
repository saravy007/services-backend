const roles = [
  {
    name: "admin",
    permissions: [
      "user_read_all",
      "user_read_byid",
      "user_update",
      "user_delete",
      "app_read_all",
      "app_read_byid",
      "app_read_byuser",
      "app_create",
      "app_update",
      "app_delete",
    ],
  },
  {
    name: "front",
    permissions: [
      "user_read_byid",
      "user_update",
      "app_read_all",
      "app_read_byid",
      "app_read_byuser",
      "app_update",
    ],
  },
  {
    name: "user",
    permissions: [
      "user_read_byid",
      "user_update",
      "app_read_byid",
      "app_read_byuser",
      "app_create",
      "app_update",
      "app_delete",
    ],
  },
];

const getPermissionsByRoleName = (roleName) => {
  const role = roles.find((r) => r.name === roleName);
  return role ? role.permissions : [];
};

module.exports = { getPermissionsByRoleName };
