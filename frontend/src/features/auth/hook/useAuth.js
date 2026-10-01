import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from '../services/auth.api.js';
import { setUser, setLoading, setError } from '../auth.slice.js';

export function useAuth() {

    const dispatch = useDispatch();

    async function handleRegister({ username, email, password }) {
        try {
            dispatch(setLoading(true));

            const data = await register({
                username,
                email,
                password
            });

            return data;

        }
        catch (error) {

            dispatch(
                setError(
                    error.response?.data?.message ||
                    "Registration failed."
                )
            );

            throw error;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));

            const data = await login({
                email,
                password
            });

            dispatch(setUser(data.info));

            return data.info;

        }
        catch (error) {

            dispatch(
                setError(
                    error.response?.data?.message ||
                    "Login Failed."
                )
            );

            throw error;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));

            const data = await getMe();

            dispatch(setUser(data.info));

            return data.info;

        }
        catch (error) {

            dispatch(
                setError(
                    error.response?.data?.message ||
                    "Failed to fetch user info."
                )
            );

            throw error;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogOut() {
        try {
            dispatch(setLoading(true));

            const data = await logout();

            dispatch(setUser(null));

            return data;

        }
        catch (error) {

            dispatch(
                setError(
                    error.response?.data?.message ||
                    "Failed to logout."
                )
            );

            throw error;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogOut
    };
}