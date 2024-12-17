const roles = [
  {
    name: "admin",
    permissions: [
      "attach_read",
      "attach_upload",
      "attach_delete",
      "profile_read",
      "profile_upload",
      "user_read_all",
      "user_read_byid",
      "user_update",
      "user_delete",
      "form_read_all",
      "form_read_byid",
      "form_read_byuser",
      "form_create",
      "form_update",
      "form_delete",
    ],
  },
  {
    name: "front",
    permissions: [
      "attach_read",
      "profile_read",
      "user_read_byid",
      "user_update",
      "form_read_all",
      "form_read_byid",
      "form_read_byuser",
      "form_update",
    ],
  },
  {
    name: "user",
    permissions: [
      "attach_read",
      "attach_upload",
      "attach_delete",
      "profile_read",
      "profile_upload",
      "user_read_byid",
      "user_update",
      "form_read_byid",
      "form_read_byuser",
      "form_create",
      "form_update",
      "form_delete",
    ],
  },
];

const getPermissionsByRoleName = (roleName) => {
  const role = roles.find((r) => r.name === roleName);
  return role ? role.permissions : [];
};

module.exports = { getPermissionsByRoleName };
