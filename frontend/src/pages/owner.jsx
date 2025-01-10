import React, { useEffect, useState } from 'react';
import Profile from '../components/profile';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../components/loding';

function Owner() {
    const { id } = useParams();

    const [userdata, setUserdata] = useState({});
    const [isLoading, setIsLoading] = useState(true);

     const  getUser = async () => {
        try {
            const { data } = await axios.get(`/api/user/${id}`);
            setUserdata(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getUser();
    }, [id]);


    return (
        isLoading ?
            <Loading />
            :
            <Profile User={userdata} />
    );
}

export default  Owner ;