import { useEffect } from "react";
import { useFirebase } from "../context/firebase"
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode.react';


function Dashboard() {
    const navigate = useNavigate()
    const { token, coverPhoto, logout, photo, name, email, gender, dob, phone } = useFirebase();

    useEffect(function () {

        if (!token) {
            navigate('/login');
        }
    }, [token, navigate])

    useEffect(() => {
        const handleMouseMove = (event) => {
            const image = document.getElementById('movingImage');
            const imageRect = image.getBoundingClientRect();
            const imageCenterX = imageRect.left + imageRect.width / 2;
            const imageCenterY = imageRect.top + imageRect.height / 2;

            const offsetX = event.clientX - imageCenterX;
            const offsetY = event.clientY - imageCenterY;

            const movementScale = 5;

            image.style.transform = `translate(${offsetX / movementScale}px, ${offsetY / movementScale}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return (
        <div className="bg bg-slate-500 pt-10 flex  justify-center ">
            <div className="w-[100px] absolute  right-10 bg-black text-white flex text-center align-center justify-center h-[30px] rounded-md mb-9 ml-[100px]">
                <button onClick={logout}>Log out</button>
            </div>
            <div className="flex justify-center flex-col items-center min-w-[90%] mt-[50px]">
                <div className=" w-[100%]">
                    <img className="h-[50vh] w-[100%]" src={coverPhoto} alt="" />
                </div>

                <div className="flex justify-center z-[5] h-[200px] w-[200px] relative top-[-40px]">
                    <img src={photo} id="movingImage" className="rounded-[50%]" alt="" />
                </div>
                <div className=" w-[90vw] pb-[20vh] relative top-[-200px] z-[] bg-slate-200  pt-[200px] px-10">
                    <div className="flex flex-wrap justify-between">

                        <div>Name:- {name}</div>
                        <div>Email:- {email}</div>
                        <div>Gender:- {gender}</div>
                        <div>Dob:-{dob}</div>
                        <div>Phone:- {phone}</div>
                    </div>
                    <div className="mt-[-100px] absolute top-[350px] left-[45%]">
                        <QRCode value={JSON.stringify({ name, email, gender, dob, phone })} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
