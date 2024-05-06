import { useFirebase } from "../context/firebase";

function useAuth() {

    const { dispatch } = useFirebase();
    const login = (token) => {
        localStorage.setItem('token', token);
        dispatch({ type: "token", payload: token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        console.log("ascd")
        dispatch({ type: "token", payload: null });
    };

    return { login, logout };
}

export default useAuth;