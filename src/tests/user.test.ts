import supertest from "supertest";
import app from "../app";
import setupTestDB from "./utils/setupTestDB";
import User from "../models/user.model";

// Set up Test Database
setupTestDB();

interface AccountDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  accountNo: string;
}

// Test Suites
describe("User routes", () => {
  describe("PATCH /api/update-account", () => {
    let userData: AccountDetails;

    beforeEach(async () => {
      await User.create({ accountNo: "1101812290" });
      userData = {
        firstName: "Rasheed",
        lastName: "Ayoade",
        email: "rashotech@gmail.com",
        phone: "08133166978",
        course: "Chemical Engineering",
        accountNo: "1101812290",
      };
    });

    test("should return 200 and successfully update User Credential if Account Number is in the database", async () => {
      const res = await supertest(app)
        .patch("/api/update-account")
        .send(userData)
        .expect(200);

      expect(res.body).toEqual({
        status: "success",
        message: "Account Information Updated Successfully",
      });

      const dbUser = await User.findOne({ accountNo: "1101812290" });
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({
        firstName: userData.firstName,
        email: userData.email,
        phone: userData.phone,
      });
    });

    test("should return 404 error if User Account Number is not in the database", async () => {
      userData.accountNo = "5354435776";

      const res = await supertest(app)
        .patch("/api/update-account")
        .send(userData)
        .expect(404);

        expect(res.body).toEqual({
            code: 404,
            message: "User Account not found",
        });
    });

    test("should return 400 error if Email already linked to existing registration", async () => {
      await User.findOneAndUpdate({ accountNo: userData.accountNo }, userData);

      const res = await supertest(app)
        .patch("/api/update-account")
        .send(userData)
        .expect(400);

      expect(res.body).toEqual({
        code: 400,
        message: "Email already linked to existing registration",
      });
    });
  });
});
