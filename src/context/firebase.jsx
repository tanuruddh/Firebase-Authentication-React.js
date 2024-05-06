import { createContext, useContext, useReducer } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
const firestore = getFirestore(app);
const storage = getStorage(app);


const initialState = {
    heading: "Sign In",
    name: localStorage.getItem('name') || "",
    email: localStorage.getItem('email') || "",
    password: "",
    sign: "signin",
    loadings: false,
    token: localStorage.getItem('token'),
    dob: localStorage.getItem('dob') || "",
    gender: localStorage.getItem('gender') || "male",
    phone: localStorage.getItem('phone') || "",
    photo: localStorage.getItem('photo') || null,
    coverPhoto: localStorage.getItem('coverPhoto') || null
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
        case "token":
            return {
                ...state,
                token: action.payload
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
        case "dob":
            return {
                ...state,
                dob: action.payload
            }
        case "phone":
            return {
                ...state,
                phone: action.payload
            }
        case "gender":
            return {
                ...state,
                gender: action.payload
            }
        case "photo":
            return {
                ...state,
                photo: action.payload
            }
        case "coverPhoto":
            return {
                ...state,
                coverPhoto: action.payload
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

    const [{ name, email, password, sign, loadings, heading, token, dob, gender, phone, photo, coverPhoto }, dispatch] = useReducer(reducer, initialState);

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
                login(user.accessToken)
                localStorage.setItem('email', email);
                localStorage.setItem('name', name);
                alert("successfully signed")
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
                login(value.user.accessToken)
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
                setNameAndEmail(result.user.displayName, result.user.email)
                login(credential.accessToken)

            }).catch((error) => {
                console.log(error.message)
            });
    }

    const setNameAndEmail = (name, email) => {
        localStorage.setItem('email', email);
        localStorage.setItem('name', name);

        dispatch({ type: "name", payload: name })
        dispatch({ type: "email", payload: email })
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

    const login = (token) => {
        localStorage.setItem('token', token);
        dispatch({ type: "token", payload: token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        console.log("ascd")
        localStorage.setItem('name', "");
        localStorage.setItem('email', "");
        localStorage.setItem('token', "");
        localStorage.setItem('dob', "");
        localStorage.setItem('gender', "");
        localStorage.setItem('phone', "");
        localStorage.setItem('photo', "");
        localStorage.setItem('coverPhoto', "");
        dispatch({ type: "token", payload: null });
        dispatch({ type: "reset", payload: initialState });
    };

    const storeUserDetails = async (name, email, dob, photo, coverPhoto, phone, gender) => {
        const photoRef = ref(storage, `uploads/images/${Date.now()}`);
        const coverPhotoRef = ref(storage, `uploads/images/${Date.now()}`);
        const photoUrl = await uploadBytes(photoRef, photo);
        const coverPhotoUrl = await uploadBytes(coverPhotoRef, coverPhoto);
        return await addDoc(collection(firestore, "users"), {
            name,
            email,
            gender,
            dob,
            phone,
            photo: photoUrl.ref.fullPath,
            coverPhoto: coverPhotoUrl.ref.fullPath,

        })

    }

    return (
        <FirebaseContext.Provider value={{ createUser, loginUser, name, email, password, sign, loadings, heading, dispatch, signUpWithGoogle, signUpWithFacebook, token, login, logout, dob, gender, phone, photo, coverPhoto, storeUserDetails }}>
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

