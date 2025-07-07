import { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState(null)

    const getProfile = async () => {
        const PROFILE_URL = "https://jsonplaceholder.typicode.com/users/1";
        try {
            const response = await fetch(PROFILE_URL);
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error("Failed to fetch user profile.");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (<div style={{ padding: '20px', maxWidth: '500px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <h2>{user.name} (@{user.username})</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>

        <h3>Address</h3>
        <p>{user.address.suite}, {user.address.street}</p>
        <p>{user.address.city}, {user.address.zipcode}</p>
        <p><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>

        <h3>Company</h3>
        <p><strong>Name:</strong> {user.company.name}</p>
        <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
        <p><strong>BS:</strong> {user.company.bs}</p>
    </div>
    );
};

export default Profile