import { adminApi } from "src/utils/axios/axiosConfig"



const adminAuthServ = async (values: any) => {
  try {
    return await adminApi.post('/adminLogin', { values })

  } catch (error) {

    throw error

  }

}

const adminDepartmentServ = async (dept: String) => {
  try {
    return await adminApi.post('/addDepartments', { dept })
  } catch (error) {
    throw error
  }
}


const getDepartments = async (page: number, limit: number) => {
  try {
    const departments = await adminApi.get('/getDepartments', {
      params: { page, limit }
    });
    return departments;
  } catch (error) {
    throw error;
  }
};


const updateListUnlistServ = async (department: String) => {

  try {
    const update = await adminApi.patch('/updateListUnlist', { department })
    return update
  } catch (error) {
    throw error
  }
}



const getDoctors = async (page: number, limit: number) => {
  return await adminApi.get(`/getDoctorData?page=${page}&limit=${limit}`);
};


const updateKycStatus = async (status: String, doctorId: String) => {
  try {
    const response = await adminApi.patch('/updateKycStatus', { status, doctorId })
    return response
  } catch (error) {
    throw error
  }
}

const getPatientData = async (page: number, limit: number) => {
  try {
    const response = await adminApi.get('/getPatients', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const updatePatients = async (buttonName: String, id: string) => {
  try {
    const updateisUserBlocked = await adminApi.patch('/updateIsBlocked', { buttonName, id })
    return updateisUserBlocked
  } catch (error) {
    throw error
  }
}
const getDashBoardData = async () => {
  try {
    const dashboardData = await adminApi.get('/dashBoardData')
    return dashboardData
  } catch (error) {
    throw error
  }
}
export {
  adminAuthServ,
  adminDepartmentServ,
  getDepartments,
  updateListUnlistServ,
  getDoctors,
  updateKycStatus,
  getPatientData,
  updatePatients,
  getDashBoardData
}