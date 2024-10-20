import axios from "axios"


const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY
const axiosClient = axios.create({
    baseURL: "https://wellfly-strapi.onrender.com/api",
    headers: {
        "Authorization": `Bearer ${API_KEY}`,
    }
})

const getUser = (email: string, password:string) => axiosClient.get("/registers?filters[Email][$eq]=" + email + "&filters[Password][$eq]=" + password)
const createUser = (data:any) => axiosClient.post("/registers", data)
const updateUser = (id:any, data:any) => axiosClient.put("/registers/" + id, data)
const deleteUser = (id:any) => axiosClient.delete("/registers/" + id)

const getClinicCategories = () => axiosClient.get("/categories?populate=*")
const getServices = () => axiosClient.get("/services?pagination[start]=0&pagination[limit]=100&populate=*")

const createClinic = (data:any) => axiosClient.post("/clinics", data)
const getClinic = (email: string, password:string) => axiosClient.get("/clinics?filters[Email][$eq]=" + email + "&filters[Password][$eq]=" + password + "&populate=*")
const updateClinic = (id:any, data:any) => axiosClient.put("/clinics/" + id, data)
const getUpdateClinic = (id:any) => axiosClient.get("/clinics/" + id + "?&populate=*")
const deleteClinic = (id:any) => axiosClient.delete("/clinics/" + id)

const getClinicAll = () => axiosClient.get("/clinics?populate=*")

const uploadFile = (data:any) => axiosClient.post("/upload/", data)


const getClinicByCategory = (category: any) => axiosClient.get('/clinics?filters[categories][Name][$in]=' + category + '&populate=*')

const bookAppointment = (data:any) => axiosClient.post("/appointments", data)
const deleteBooking = (id:any) => axiosClient.delete("/appointments/" + id)
const getUserBookingList = (userEmail:any) => axiosClient.get("/appointments?[filters][Email][$eq]=" + userEmail + "&populate=* ")


export default{
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getClinicCategories,
    getServices,
    createClinic,
    getClinic,
    updateClinic,
    getUpdateClinic,
    deleteClinic,
    uploadFile,
    getClinicByCategory,
    getClinicAll,
    bookAppointment,
    deleteBooking,
    getUserBookingList

}