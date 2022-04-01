import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('use effect ran');
        fetch(url)
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch the data for that resource!')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                console.log(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            })
    }, [url]);

    return { data, isPending, error}
}

export default useFetch;