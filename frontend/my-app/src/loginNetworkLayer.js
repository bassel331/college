import axios from "axios";

async function postLogin(email, password) {
    try {
        const response = await axios.post("/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error.response?.data || "Unknown error occurred";
    }
}

export default postLogin;
