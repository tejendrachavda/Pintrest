import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const [dataloading, setDataloading] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = async (email, password, navigate) => {
        // setDataloading(true);
        try {
            const response = await axios.post("/api/user/login", { email, password });
            const data = response.data;

            if (data) {
                toast.success(data.message);
                setUser(data.user);
                setAuth(true);
                navigate("/");
                setDataloading(false);
            } else {
                toast.error("Invalid email or password");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.message);

        }
    }

    const register = async (name, email, password, navigate) => {
        setDataloading(true);
        try {
            const response = await axios.post("/api/user/register", { name, email, password });
            const data = response.data;

            if (data) {
                toast.success(data.message);
                setUser(data.user);
                setAuth(true);
                setDataloading(false);
                navigate("/");
            } else {
                toast.error("An error occurred");
            }
        } catch (error) {
            if (error.response) {
                setDataloading(false)
            } else {
                toast.error("An error occurred");
                setDataloading(false)
            }
        }
    }

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/user/me");
            const data = response.data;

            
            setUser(data); // Ensure data.user is the user object
            setAuth(true);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
            setLoading(false);
            setUser(null);
            setAuth(false);
        }
    };

    const followUser = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/user/follow/" + id);
            console.log("data:", data);

            toast.success(data.message);
            fetchUser()
        } catch (error) {
            setLoading(false)
            if (axios.isAxiosError(error)) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred");
            }
            console.log(error);
        }
    }

    const logout = async (id, navigate) => {
        try {
            const { data } = await axios.get("/api/user/logout/" + id);
            toast.success(data.message);
            navigate("/login")
            setAuth(false)
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }
    }

    const [following, setFollowing] = useState([]);

    const followingUser = async (id) => {
        try {
            const { data } = await axios.get("/api/user/followings/" + id);
            setFollowing(data);
            // console.log(data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{
            login,
            dataloading,
            register,
            logout,
            followUser,
            followingUser,
            fetchUser,
            following,
            user,
            auth,
            loading
        }}>
            {children}
            <Toaster />
        </UserContext.Provider>
    );
}

export const UserData = () => useContext(UserContext);
