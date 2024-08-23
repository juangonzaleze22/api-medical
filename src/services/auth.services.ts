import { Auth, AuthGoogle } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({ email, password, displayName }: User) => {

  const checkIs = await UserModel.findOne({ email });
  if (checkIs) return {
    status: 'already_user',
    message: "The email address is already in use. Please choose a different email.",
  };
  const passHash = await encrypt(password);
  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    displayName,
    rol: 'CLIENT'
  });

  const token = generateToken(registerNewUser.email);

  const data = {
    status: 'success',
    token,
    user: registerNewUser,
  };
  return data;
};

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });

  if (!checkIs) return {
    status: 'not_found_user',
    message: "User not found. Please check your username and try again.",
  };
  
  const token = generateToken(checkIs.email);

  const data = {
    status: 'success',
    token,
    user: checkIs,
  };

  if (checkIs?.isGoogle){
    return {
        status: 'user_google',
        message: 'User google, please login with google.'
    };
  }

  const passwordHash = checkIs.password; //TODO el encriptado!
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return {
    status: 'password_incorrect',
    message: 'Password does not match.'
  };

  return data;

};

//Auth google

const registerWithGoogle = async ({ displayName, email, photoURL }: User) => {


  try {
    const checkIs = await UserModel.findOne({ email });
    console.log("isMatch:", checkIs)

    if (checkIs) {
      return {
        status: 'already_user',
        message: "The email address is already in use. Please choose a different login method.",
      };
    }

    const newUser = await UserModel.create({
      email,
      displayName,
      photoURL,
      isGoogle: true,
      rol: 'CLIENT'
    });

    const token = generateToken(email);
    const data = {
      status: 'success',
      token,
      user: newUser,
    };
    return data;
  } catch (error) {
    console.error('Error registering with Google:', error);
    return {
      status: 'error_register_user',
      message: 'Error registering with Google:' + error,
    }
  }
}

const loginUserWithGoogle = async ({ email }: AuthGoogle) => {

  const checkIs = await UserModel.findOne({ email });

  if (!checkIs) return {
    status: 'not_found_user',
    message: "User not found. Please check your username and try again.",
  };

  const token = generateToken(checkIs.email);
  const data = {
    status: 'success',
    token,
    user: checkIs,
  };
  return data;
};



export { registerNewUser, loginUser, registerWithGoogle, loginUserWithGoogle };