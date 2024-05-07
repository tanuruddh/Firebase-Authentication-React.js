import { useEffect } from "react";
import { useFirebase } from "../context/firebase"
import { useNavigate } from "react-router-dom";


function Info() {
    const { email, name, logout, token, dispatch, dob, gender, phone, photo, coverPhoto, storeUserDetails, getUserDetails } = useFirebase();
    const navigate = useNavigate()

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        dispatch({ type: "photo", payload: file })
    };
    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        dispatch({ type: "coverPhoto", payload: file })
    };

    const handleform = async (e) => {
        e.preventDefault();
        localStorage.setItem('dob', dob);
        localStorage.setItem('gender', gender);
        localStorage.setItem('phone', phone);
        localStorage.setItem('photo', photo);
        localStorage.setItem('coverPhoto', coverPhoto);
        await storeUserDetails(name, email, dob, photo, coverPhoto, phone, gender);
        const res = await getUserDetails(email)
        if (res) {
            dispatch({ type: "dob", payload: res.dob })
            dispatch({ type: "gender", payload: res.gender })
            dispatch({ type: "phone", payload: res.phone })
            dispatch({ type: "photo", payload: res.photo })
            dispatch({ type: "coverPhoto", payload: res.coverPhoto })
            dispatch({ type: "name", payload: res.name })
            dispatch({ type: "email", payload: res.email })
            navigate('/');
        }

    }

    useEffect(function () {

        if (!token) {
            navigate('/login');
        }


    }, [token, navigate]);

    useEffect(function () {
        async function fetchData() {
            const res = await getUserDetails(email)

            if (res) {
                dispatch({ type: "dob", payload: res.dob })
                dispatch({ type: "gender", payload: res.gender })
                dispatch({ type: "phone", payload: res.phone })
                dispatch({ type: "photo", payload: res.photo })
                dispatch({ type: "coverPhoto", payload: res.coverPhoto })
                dispatch({ type: "name", payload: res.name })
                dispatch({ type: "email", payload: res.email })
                navigate('/');
            }
        }
        fetchData();
    }, [dispatch, getUserDetails, email, navigate,])
    return (
        <div className="bg bg-slate-500 pt-10 flex  justify-center min-h-[100vh]">
            <div className="w-[100px] absolute  right-10 bg-black text-white flex text-center align-center justify-center h-[30px] rounded-md mb-9 ml-[100px]">
                <button onClick={logout}>Log out</button>
            </div>
            <div className="flex  align-center flex-col backdrop-blur-md" >
                <h1 className="tex font-medium text-4xl text-white">Add your information</h1>
                <form action="submit" onSubmit={handleform} className="mt-[50px] bg-slate-800 rounded-xl shadow-black shadow-2xl pt-9 pl-5">
                    <div className="flex flex-row w-[300px] gap-8 mb-10 ">
                        <label htmlFor="name" className=" text-slate-300 text-xl">Name</label>
                        <input type="text" value={name} id="name" onChange={(e) => dispatch({ type: "name", payload: e.target.value })} className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-10 mb-10 ">
                        <label htmlFor="email" className=" text-slate-300 text-xl">email</label>
                        <input type="email" value={email} id="email" disabled className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-4 mb-10 ">
                        <label htmlFor="profilephoto" className=" text-slate-300  text-xl">Profile photo:</label>
                        <input type="file" id="profilephoto" accept="image/*" onChange={(e) => handlePhotoChange(e)} className=" hover:bg-slate-900 text-white font-bold py-2 px-4 border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-4 mb-10 ">
                        <label htmlFor="coverPhoto" className=" text-slate-300 text-xl ">Cover photo:</label>
                        <input type="file" id="coverPhoto" accept="image/*" onChange={(e) => handleCoverPhotoChange(e)} className=" hover:bg-slate-900 text-white font-bold py-2 px-4 border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-2 mb-10 ">
                        <label htmlFor="mobileNumber" className=" text-slate-300 text-xl">Mobile No.</label>
                        <input type="text" value={phone} id="mobileNumber" onChange={(e) => dispatch({ type: "phone", payload: e.target.value })} className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-10 mb-10 ">
                        <label htmlFor="gender" className=" text-slate-300 text-xl">Gender</label>
                        <select name="gender" value={gender} id="gender" onChange={(e) => dispatch({ type: "gender", payload: e.target.value })} className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md">
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>
                            <option value="lesbian">lesbian</option>
                        </select>
                    </div>
                    <div className="flex flex-row w-[300px] gap-10 mb-10 ">
                        <label htmlFor="dob" className=" text-slate-300 text-xl">DOB</label>
                        <input type="date" value={dob} id="dob" onChange={(e) => dispatch({ type: "dob", payload: e.target.value })} className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>

                    <div className="w-[100px] bg-black text-white flex text-center align-center justify-center h-[30px] rounded-md mb-9 ml-[100px]">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                {photo && (
                    <div>
                        <img src={photo} alt="Selected" style={{ maxWidth: '100%' }} />
                    </div>
                )}
                {coverPhoto && (
                    <div>
                        <img src={coverPhoto} alt="Selected" style={{ maxWidth: '100%' }} />
                    </div>
                )}
            </div>

        </div>
    )
}

export default Info
