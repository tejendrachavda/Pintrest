import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PinContext = createContext()

export const PinProvider = ({ children }) => {

    const [dataloading, setdataloding] = useState(true)
    const [pins, setPins] = useState([])
    const [pin, setpin] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    async function allPins() {
        try {
            setdataloding(true);
            const { data } = await axios.get("/api/pin/all");
            setPins(data);
            setdataloding(false);

        } catch (error) {
            toast.error(error.response.data.message);
            setdataloding(false);
        }
    }

    async function onePin(id) {
        try {
            const { data } = await axios.get("/api/pin/" + id);
            setpin(data);
            setdataloding(false);

        } catch (error) {
            toast.error(error.response.data.message);
            setdataloding(false);
        }
    }

    async function update_Pin(id, title, pin, setEdit) {
        setdataloding(true)
        try {
            const { data } = await axios.put("/api/pin/" + id, { title, pin });
            toast.success(data.message)
            onePin(id);
            setEdit(false);
            setdataloding(false);
        } catch (error) {
            toast.error("Failed to update pin. Please try again.");
            setdataloding(false);
        }
    }

    async function commentOnpin(comment, id) {
        try {
            const { data } = await axios.post(`/api/pin/comment/${id}`, { comment });
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function delete_Pin(id) {
        setdataloding(true);
        try {
            const { data } = await axios.delete("/api/pin/" + id);
            toast.success(data.message);
            allPins()
            setdataloding(false)
        }
        catch {
            toast.error(error.response.data.message)
        }
    }

    async function create_Pin(formData, navigate) {

        setdataloding(true);
        try {
            const { data } = await axios.post("/api/pin/create", formData);
            navigate("/")
            setdataloding(false)
            toast.success(data.message)
            allPins()
        }
        catch (error) {
            toast.error(error.response.data.message);
            setdataloding(false)
        }
    }

    useEffect(() => {
        allPins();
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }, [])

    return (
        <PinContext.Provider value={{ onePin, update_Pin, allPins, commentOnpin, delete_Pin, create_Pin, pins, dataloading, pin, windowWidth }}>
            {children}
            <Toaster />
        </PinContext.Provider>
    )
}

export const Pin = () => useContext(PinContext)