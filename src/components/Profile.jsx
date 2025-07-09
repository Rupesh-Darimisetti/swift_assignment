import { Link } from "react-router-dom";
import NameLogo from "../common/NameLogo";
import useFetch from "../hooks/useFetch";

const Profile = () => {

    const { data: user, loading } = useFetch("https://jsonplaceholder.typicode.com/users/1");

    if (loading) return <p>Loading...</p>;
    // const companyData = JSON.parse(user?.company)
    // const { name, catchPhrase, bs } = companyData
    return (
        <div>
            <Link to="/">
                <div className="flex p-2 mb-2">
                    <svg className="w-6 h-6 pr-2 dark:text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                    </svg>
                    <h1>Welcome, {user?.name}</h1>
                </div>
            </Link>
            <div className="shadow-xl  md:p-12 md:pt-0 m-5">
                <div className="flex p-3 gap-3">
                    <NameLogo name={user?.name} />
                    < div className="flex flex-col">
                        <span>{user?.name}</span>
                        <span className="text-gray-500">{user?.email}</span>
                    </div>
                </div>
                <div className="md:flex md:justify-evenly gap-5">
                    <div className="flex-none  md:w-1/2 ">
                        <label htmlFor="userId">User ID</label>
                        <p id="userId" className="bg-gray-200 p-2  "   >{`${12345670 + user?.id}`}  </p >
                    </div>
                    <div className="flex-none  md:w-1/2 ">
                        <label htmlFor="name"> Name</label>
                        <p id="name" className="bg-gray-200 p-2  ">{user?.name}  </p >
                    </div>
                </div>
                <div className="md:flex md:justify-evenly  gap-5">
                    <div className="flex-none  md:w-1/2 ">
                        <label htmlFor="email">Email ID</label>
                        <p id="email" className="bg-gray-200 p-2 "  >{user?.email} </p >
                    </div>
                    <div className="flex-none md:w-1/2 ">
                        <label htmlFor="address">Address</label>
                        <p id="address" className="bg-gray-200 overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal hover:overflow-visible hover:overflow-wrap break-word p-2 ">{`${user?.company.name} ${user?.company.catchPhrase} ${user?.company.bs}`}  </p >
                    </div>
                </div>
                <div className="md:flex md:justify-start  gap-5">
                    <div className="flex-none  md:w-1/2 ">
                        <label htmlFor="phone">Phone</label>
                        <p className="bg-gray-200 p-2" id="phone" >+{user?.phone.split('x')[0].split('-')}  </p >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile
