

function Info() {
    return (
        <div className="bg bg-slate-500 pt-10 flex  justify-center min-h-[100vh]">
            <di className="flex  align-center flex-col backdrop-blur-md" >
                <h1 className="tex font-medium text-4xl text-white">Add your information</h1>
                <form action="submit" className="mt-[50px] bg-slate-800 rounded-xl shadow-black shadow-2xl pt-9 pl-5">
                    <div className="flex flex-row w-[300px] gap-8 mb-10 ">
                        <label htmlFor="name" className=" text-slate-300 text-xl">Name</label>
                        <input type="text" name="name" id="name" className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-10 mb-10 ">
                        <label htmlFor="email" className=" text-slate-300 text-xl">email</label>
                        <input type="email" value={"email"} id="email" className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-4 mb-10 ">
                        <label htmlFor="profilephoto" className=" text-slate-300  text-xl">Profile photo:</label>
                        <input type="file" name="name" id="profilephoto" accept="image/*" className=" hover:bg-slate-900 text-white font-bold py-2 px-4 border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-4 mb-10 ">
                        <label htmlFor="coverPhoto" className=" text-slate-300 text-xl ">Cover photo:</label>
                        <input type="file" name="name" id="coverPhoto" accept="image/*" className=" hover:bg-slate-900 text-white font-bold py-2 px-4 border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-2 mb-10 ">
                        <label htmlFor="mobileNumber" className=" text-slate-300 text-xl">Mobile No.</label>
                        <input type="text" name="phone number" id="mobileNumber" className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>
                    <div className="flex flex-row w-[300px] gap-10 mb-10 ">
                        <label htmlFor="gender" className=" text-slate-300 text-xl">Gender</label>
                        <select name="gender" id="gender" className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md">
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>
                            <option value="lesbian">lesbian</option>
                        </select>
                    </div>
                    <div className="flex flex-row w-[300px] gap-10 mb-10 ">
                        <label htmlFor="dob" className=" text-slate-300 text-xl">DOB</label>
                        <input type="date" name="dob" id="dob" className=" text-white border-none outline-none p-2 bg-slate-700 rounded-md" />
                    </div>

                    <div className="w-[100px] bg-black text-white flex text-center align-center justify-center h-[30px] rounded-md mb-9 ml-[100px]">
                        <button>Submit</button>
                    </div>
                </form>
            </di>

        </div>
    )
}

export default Info
