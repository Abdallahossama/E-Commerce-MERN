import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface Iregister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: Iregister) => {
  try {
    const findUser = await userModel.findOne({ email });
    if (findUser) return { data: "This email is already used.", status: 400 };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return { data: generateJWT({ firstName, lastName, email }), status: 201 };
  } catch (error) {
    console.error(error);
    return {
      data: "An error occurred during registration.",
      status: 500,
    };
  }
};

interface IlogIn {
  email: string;
  password: string;
}

export const logIn = async ({ email, password }: IlogIn) => {
  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser) return { data: "Wrong email or password!", status: 400 };

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
      const { firstName, lastName, email } = findUser;
      return { data: generateJWT({ firstName, lastName, email }), status: 200 };
    }

    return { data: "Wrong email or password!", status: 400 };
  } catch (error) {
    console.error(error);

    return {
      data: "An error occurred during login.",
      status: 500,
    };
  }
};

const generateJWT = (data: any) => {
  return jwt.sign(
    data,
    "4350d7ea53949a87d466984adf33f495a7bbc01de87adbc5a4de9ae28a912014"
  );
};
