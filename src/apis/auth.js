import { axiosPublic, axiosPrivate } from "./axios";

// Mock user data
const mockUser = {
  _id: "1",
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  accountType: "student",
  code_verification: null,
  isAccountComplete: true
};

// Mock token
const mockToken = "mock-jwt-token";

async function login(email, password) {
    try {
        const response = await axiosPublic.post("/auth/login", {
            email,
            password
        });

        if (response.data.err) {
            if (response.data.err.code === "ERROR_LOGIN_4") {
                throw { err: "User not found" }
            } else if (response.data.err.code === "ERROR_LOGIN_3") {
                throw { err: "Wrong password" }
            }

        }


        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("current-user", JSON.stringify(response.data.user));
        }

        if (response.data.user.accountType == "trainer") {
            window.location.href = "/trainer";
        } else if (response.data.user.accountType == "student") {
            window.location.href = "/";
        }
    } catch (err) {
        return err
    }

}
async function logout() {
    localStorage.clear();
    window.location.href = "/login";
}
async function register({ email, password, }) {
    const { data } = await axiosPublic.post("/auth/register", {
        email,
        password
    });

    if (data.token && data.user) {
        localStorage.setItem('verification-pending', true)
        localStorage.setItem('email', email)
        localStorage.setItem('token', data.token)
    } else if (data.err) {
        return { err: data.err }
    }

    return data;
}

async function verifyCode(code) {
    const { data } = await axiosPublic.get(`/auth/verify?email=${localStorage.getItem('email')}&code=${code}`);

    return data;
}

async function updateAccount(data) {
    const token = localStorage.getItem('token')
    const response = await axiosPublic.put(`/users/update?token=${token}`, data);
    return response.data;
}

export default {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful login
    localStorage.setItem("current-user", JSON.stringify(mockUser));
    localStorage.setItem("token", mockToken);
    
    return { user: mockUser, token: mockToken };
  },

  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful registration
    return { user: mockUser, token: mockToken };
  },

  verifyCode: async (code) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful verification
    return "Email verified successfully";
  },

  logout,
  updateAccount
};