const { checkSchema } = require("express-validator");
const User = require("../../models/user");

const loginSchema = checkSchema({
  email: {
    isEmail: true,
    errorMessage: "Invalid email address",
  },
  password: {
    isLength: {
      options: {
        min: 8,
      },
    },
    errorMessage: "Password must be at least 8 letters",
  },
});

const createUserSchema = checkSchema({
  username: {
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  // must be int, min 1 max 150
  // phone: {
  //   isInt: {
  //     options: { min: 1, max: 150 },
  //     errorMessage: "Age must be between 1 and 150",
  //   },
  // },
  // must be email
  email: {
    isEmail: true,
    custom: {
      options: async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error(`Username with email: ${value} already exist.`);
        }
      },
    },
  },
  // At least 8 letters, Capital, smallcase, Number
  password: {
    isAlphanumeric: {
      locale: "en-US",
    },
    isLength: {
      options: {
        min: 8,
      },
    },
  },
  confirmedPassword: {
    custom: {
      options: async (value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Password mismatched!");
        }
      },
    },
  },
});

const updateUserSchema = checkSchema({
  // No number allowed, Only small and capital, only English
  name: {
    optional: {
      options: {
        nullable: true,
      },
    },
    isAlpha: {
      locale: "en-US",
      errorMessage: "Name must be alphabet only",
    },
  },
  // Username(letter, number, alphanumeric)
  username: {
    optional: {
      options: {
        nullable: true,
      },
    },
    isAlphanumeric: {
      locale: "en-US",
    },
    isLength: {
      options: {
        max: 15,
        min: 6,
      },
    },
  },
  // must be int, min 1 max 150
  age: {
    optional: {
      options: {
        nullable: true,
      },
    },
    isInt: {
      options: { min: 1, max: 150 },
      errorMessage: "Age must be between 1 and 150",
    },
  },
  // must be email
  email: {
    optional: {
      options: {
        nullable: true,
      },
    },
    isEmail: true,
    // Check if email already registered
    custom: {
      options: async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error(`User with email: ${value} already existed`);
        }
      },
    },
  },
  // Must be URL
  facebookURL: {
    optional: {
      options: {
        nullable: true,
      },
    },
    isURL: true,
  },
});

module.exports = { loginSchema, createUserSchema, updateUserSchema };
