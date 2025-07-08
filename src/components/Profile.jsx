import { Link } from "react-router-dom";
import NameLogo from "../common/NameLogo";
import useFetch from "../hooks/useFetch";

const Profile = () => {

    const { data: user, loading } = useFetch("https://jsonplaceholder.typicode.com/users/1");

    if (loading) return <p>Loading...</p>;
    return (
        <div>
            <div className="flex p-2 mb-2">
                <Link to="/">
                    <svg className="w-6 h-6 pr-2 dark:text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                    </svg>
                </Link>
                <h1>Welcome, {user?.name}</h1>
            </div>
            <div className="shadow-2xl p-25">
                <div className="flex p-3 gap-3">
                    <NameLogo name={user?.name} />
                    < div className="flex flex-col">
                        <span>{user?.name}</span>
                        <span>{user?.email}</span>
                    </div>
                </div>
                <div className="flex justify-evenly w-[500px]">
                    <div className="flex-none">
                        <label>User ID</label>
                        <p>{user?.id}</p>
                    </div>
                    <div className="flex-none">
                        <label>Name</label>
                        <p>{user?.name}</p>
                    </div>
                </div>
                <div className="flex justify-evenly w-[500px]">
                    <div className="flex-none">
                        <label>Email ID</label>
                        <p>{user?.email}</p>
                    </div>
                    <div className="flex-none">
                        <label>Address</label>
                        <p>{`${user?.address.street} ${user?.address.suite}`}</p>
                    </div>
                </div>
                <div className="flex p-[20px]">
                    <div>
                        <label htmlFor="#phone">Phone</label>
                        <p id="Phone">{user?.phone.split('x')[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile
