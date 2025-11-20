const { query } = require("../utils/database");

const getUserByUsername = async (userName) => {
    try {
        const [rows] = await query("CALL GetUserName(?)", [userName]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserCount = async () => {
    try {
        const response = await query("CALL GetUserCount()");

        if (!response) {
            throw new Error("Unexpected database response format");
        }

        const doctorData = response[0][0];

        return doctorData;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getDepartmentUserCount = async (department_id) => {
    try {
        const response = await query("CALL GetUserCountByDepartment(?)", [department_id]);

        if (!response) {
            throw new Error("Unexpected database response format");
        }

        const userData = response[0][0];

        return userData;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getUserDetailsById = async (user_id) => {
    try {
        const response = await query("CALL GetUserDetails(?)", [user_id]);

        if (!response) {
            throw new Error("Unexpected database response format");
        }

        const userData = response[0][0];

        return userData;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const ChangePassword = async (user_id, current_password, new_password) => {
    try {
        // 1. Get the current password from the database
        const [response] = await query("SELECT user_password FROM tbl_users WHERE user_id=?", [user_id]);

        if (!response) {
            return { success: false, message: "User not found" };
        }

        // 2. Check if the entered current password matches the database password
        if (response.user_password !== current_password) {
            return { success: false, message: "Current password is incorrect" };
        }

        // 3. Update the password
        const updateResponse = await query("UPDATE tbl_users SET user_password=? WHERE user_id=?", [new_password, user_id]);

        return { success: true, message: "Password updated successfully", data: updateResponse };
    } catch (error) {
        console.error("Error changing password:", error);
        return { success: false, message: "Internal server error" };
    }
};


const DeleteAccount = async (user_id, password) => {
    try {
        // 1. Get the current password from the database
        const [response] = await query("SELECT user_password FROM tbl_users WHERE user_id=?", [user_id]);

        if (!response) {
            return { success: false, message: "User not found" };
        }

        // 2. Check if the entered current password matches the database password
        if (response.user_password !== password) {
            return { success: false, message: "Current password is incorrect" };
        }

        // 3. Update the password
        const updateResponse = await query("UPDATE tbl_users SET user_status=? WHERE user_id=?", [0, user_id]);

        return { success: true, message: "Account deleted successfully", data: updateResponse };
    } catch (error) {
        console.error("Error changing password:", error);
        return { success: false, message: "Internal server error" };
    }
};

const UpdateAccount = async (user_id, name, mobile, email, blood_group, address, city, profile) => {
    try {

        if (profile == null) {

            const response = await query("CALL UpdateUserDetailswithoutphoto(?, ?, ?, ?, ?, ?, ?)", [user_id, name, email, mobile, blood_group, address, city]);

            return { success: true, message: "Profile updated successfully", response };
        }

        const response = await query("CALL UpdateUserDetails(?, ?, ?, ?, ?, ?, ?, ?)", [user_id, name, email, mobile, blood_group, address, city, profile]);

        if (!response) {
            return { success: false, message: "User not found" };
        }


        return { success: true, message: "Profile updated successfully", response };
    } catch (error) {
        console.error("Error changing password:", error);
        return { success: false, message: error?.sqlMessage ? error?.sqlMessage : "Internal server error" };
    }
};
module.exports = {
    getUserByUsername,
    getUserCount,
    getDepartmentUserCount,
    getUserDetailsById,
    ChangePassword,
    DeleteAccount,
    UpdateAccount,
};
