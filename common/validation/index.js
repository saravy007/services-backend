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
        max: 20,
        min: 3,
      },
    },
    matches: {
      options: [/^\S*$/],
      errorMessage: 'Username must not contain spaces.',
    },
  },
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
  firstName: {
    optional: {
      options: {
        nullable: true,
      },
    },
    isLength: {
      options: {
        max: 50,
      },
    },
  },
  lastName: {
    optional: {
      options: {
        nullable: true,
      },
    },
    isLength: {
      options: {
        max: 50,
      },
    },
  },
  // must be int, min 1 max 150
  gender: {
    optional: {
      options: {
        nullable: true,
      },
    },
    isIn: {
      options: [['male', 'female']],
      errorMessage: 'Gender must be either "male" or "female".',
    },
  },
});

const formSchema = checkSchema({
  name: {
    isLength: {
      options: {
        max: 70,
      },
    },
  },
  gender: {
    isIn: {
      options: [['male', 'female']],
      errorMessage: 'Gender must be either "male" or "female".',
    },
  },
  address: {
    isLength: {
      options: {
        max: 100,
      },
    },
  },
  examCenter: {
    isLength: {
      options: {
        max: 500,
      },
    },
  },
  grade: {
    isIn: {
      options: [['A','B' ,'C' ,'D' ,'E','F']],
      errorMessage: 'Grade must be: "A","B","C","D","E","F".',
    },
  },
});

module.exports = { loginSchema, createUserSchema, updateUserSchema, formSchema };
