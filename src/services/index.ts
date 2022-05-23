import ApiError from "../helpers/ApiError";
import User from "../models/user.model";
import httpStatus from 'http-status';
import sendMail from "../helpers/mailer";

interface AccountDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  accountNo: string;
};

const updateAccountData = async (info: AccountDetails) : Promise<AccountDetails> => {
    // Find User Account in the database
    const userData: any = await User.findOne({ accountNo: info.accountNo });

    // Throw error when Account Number is not in the database
    if (userData === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "User Account not found");
    }

    // Throw error when Account and Credentials are already linked
    if (userData.email !== undefined) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already linked to existing registration");
    }

    // Update User Info 
    const user = await User.findOneAndUpdate({ accountNo: info.accountNo }, info, {
      new: true,
    });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
    }

    const { firstName, lastName, email } = user;
    const subject = "Successful submission";
    const dataSet = { NAME: `${firstName} ${lastName}` };
    const templateName = "WelcomeMail";

    // Send A confirmation Email
    await sendMail(email, subject, dataSet, templateName);

    return user;
};

export { updateAccountData };
