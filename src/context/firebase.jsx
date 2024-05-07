import { createContext, useContext, useReducer } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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

const resetState = {
    name: "",
    email: "",
    password: "",
    sign: "signin",
    loadings: false,
    token: "",
    dob: "",
    gender: "male",
    phone: "",
    photo: null,
    coverPhoto: null
}

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
            return resetState
        case "name":
            localStorage.setItem('name', action.payload);
            return {
                ...state,
                name: action.payload
            }
        case "email":
            localStorage.setItem('email', action.payload);
            return {
                ...state,
                email: action.payload
            }
        case "token":
            localStorage.setItem('token', action.payload);
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
            localStorage.setItem('dob', action.payload);

            return {
                ...state,
                dob: action.payload
            }
        case "phone":
            localStorage.setItem('phone', action.payload);

            return {
                ...state,
                phone: action.payload
            }
        case "gender":
            localStorage.setItem('gender', action.payload);

            return {
                ...state,
                gender: action.payload
            }
        case "photo":
            localStorage.setItem('photo', action.payload);

            return {
                ...state,
                photo: action.payload
            }
        case "coverPhoto":
            localStorage.setItem('coverPhoto', action.payload);

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
        localStorage.setItem('name', "");
        localStorage.setItem('email', "");
        localStorage.setItem('token', "");
        localStorage.setItem('dob', "");
        localStorage.setItem('gender', "");
        localStorage.setItem('phone', "");
        localStorage.setItem('photo', "");
        localStorage.setItem('coverPhoto', "");
        dispatch({ type: "token", payload: "" });
        dispatch({ type: "reset" });
    };

    const storeUserDetails = async (name, email, dob, photo, coverPhoto, phone, gender) => {
        const photoRef = ref(storage, `uploads/images/${Date.now()}`);
        await uploadBytes(photoRef, photo);
        const photoUrl = await getDownloadURL(photoRef);

        const coverPhotoRef = ref(storage, `uploads/images/12${Date.now()}`);
        await uploadBytes(coverPhotoRef, coverPhoto);
        const coverPhotoUrl = await getDownloadURL(coverPhotoRef);

        return await addDoc(collection(firestore, "users"), {
            name,
            email,
            gender,
            dob,
            phone,
            photo: photoUrl,
            coverPhoto: coverPhotoUrl,

        })

    }

    const getUserDetails = async (email) => {
        try {
            const q = query(collection(firestore, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                return null;
            }
            // Assuming there's only one document for each email
            return querySnapshot.docs[0].data();
        } catch (error) {
            console.error("Error fetching document: ", error);
            return null;
        }
    }

    return (
        <FirebaseContext.Provider value={{ createUser, loginUser, name, email, password, sign, loadings, heading, dispatch, signUpWithGoogle, signUpWithFacebook, token, login, logout, dob, gender, phone, photo, coverPhoto, storeUserDetails, getUserDetails }}>
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

