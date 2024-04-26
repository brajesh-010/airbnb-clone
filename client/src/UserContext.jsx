import { createContext, useEffect, useState } from 'react';
import axios from "axios";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                try {
                    const {data} = await axios.get('/api/profile');

                    const userData=data.data;
                    // console.log(data.data);
                    setUser(userData);
                    setReady(true);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    // Handle error as needed
                }
            }
        };

        fetchData();
    }, [user]);
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
