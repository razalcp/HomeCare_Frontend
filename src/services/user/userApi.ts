import userApi from "src/utils/axios/axiosConfig";


const getVerifiedDoctors = async () => {
    try {
        return await userApi.get('/getVerifiedDoctors')
    } catch (error) {
        console.log(error);

    }
}
export {getVerifiedDoctors}