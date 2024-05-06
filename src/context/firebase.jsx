import { createContext, useContext, useReducer } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    databaseURL: process.env.REACT_APP_DATABASEURL
};
const FirebaseContext = createContext();
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


const initialState = {
    heading: "Sign In",
    name: "",
    email: "",
    password: "",
    sign: "signin",
    loadings: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return initialState
        case "name":
            return {
                ...state,
                name: action.payload
            }
        case "email":
            return {
                ...state,
                email: action.payload
            }
        case "password":
            return {
                ...state,
                password: action.payload
            }
        case "sign":
            return {
                ...state,
                sign: action.payload
            }
        case "loadings":
            return {
                ...state,
                loadings: action.payload
            }
        case "heading":
            return {
                ...state,
                heading: action.payload
            }
        default:
            return state;
    }
}




function FirebaseProvider({ children }) {

    const [{ name, email, password, sign, loadings, heading }, dispatch] = useReducer(reducer, initialState);

    const validateForm = () => {
        const emailRegex = /\S+@\S+\.\S+/
        const isEmailValid = emailRegex.test(email);
        const isPasswordValid = password.length > 6;
        console.log(isEmailValid, isPasswordValid)
        return isEmailValid && isPasswordValid;
    };

    const createUser = () => {
        if (sign === 'signin') {
            dispatch({ type: "heading", payload: "Sign Up" })
            dispatch({ type: "sign", payload: "signup" })
            return;
        }
        dispatch({ type: "loadings", payload: true })
        // setLoadings(true);
        if (!validateForm()) {
            alert("Please enter a valid email and password.");
            dispatch({ type: "loadings", payload: false })

            return;
        }
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                alert("successfully signed")
                dispatch({ type: "reset", payload: initialState })
                //...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                console.log(errorCode, errorMessage);
                //..
            })
            .finally(() => {
                dispatch({ type: "loadings", payload: false })
            });
    }

    const loginUser = () => {
        if (sign === "signup") {
            dispatch({ type: "heading", payload: "Sign In" })
            dispatch({ type: "sign", payload: "signin" })
            return;
        }
        dispatch({ type: "loadings", payload: true })
        if (!validateForm()) {
            alert("Please enter a valid email and password.");
            dispatch({ type: "loadings", payload: false })

            return;
        }
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((value) => {
                console.log(value);
            })
            .catch((error) => {
                console.log(error)
                alert(error.message)
            })
            .finally(() => {
                dispatch({ type: "loadings", payload: false })
            });
    }

    const signUpWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log(credential)
            }).catch((error) => {
                console.log(error.message)
            });
    }

    const signUpWithFacebook = () => {
        signInWithPopup(firebaseAuth, facebookProvider)
            .then((result) => {
                const user = result.user;
                console.log(user)
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    return (
        <FirebaseContext.Provider value={{ createUser, loginUser, name, email, password, sign, loadings, heading, dispatch, signUpWithGoogle, signUpWithFacebook }}>
            {children}
        </FirebaseContext.Provider>
    )
}

function useFirebase() {
    const context = useContext(FirebaseContext);
    if (context === undefined) throw new Error("FirebaseContext is used outside the FirebaseProvider")
    return context;
}

export { FirebaseProvider, useFirebase }

