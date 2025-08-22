import { CreateUser } from "../service/user.service";
async function run() {
  try {
    // test input
    const input = {
      full_name: "Test User",
      email: "testuse4r@example.com",
      password: "password123",
    };

    // call the function
    const result = await CreateUser(input);

    // log the result
    console.log("✅ User created successfully:");
    console.log(result);

    // quick assertion without framework
    if (!result.id) {
      throw new Error("❌ User ID was not generated!");
    }

    if (result.password) {
      throw new Error("❌ Password should not be returned!");
    }

    console.log("✅ All basic checks passed!");
  } catch (err) {
    console.error("❌ Test failed:", err);
  }
}

run();
