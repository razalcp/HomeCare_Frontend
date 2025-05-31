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
const getDepartments = async () => {
  try {
    const departments = await adminApi.get('/getDepartments')
    return departments

  } catch (error) {
    throw error
  }
}

const updateListUnlistServ = async (department: String) => {
  // console.log("dept", department);

  try {
    const update = await adminApi.patch('/updateListUnlist', { department })
    return update
  } catch (error) {
    throw error
  }
}

const getDoctors = async () => {
  try {
    const docData = await adminApi.get('/getDoctorData')
    return docData
  } catch (error) {

  }
}

const updateKycStatus = async (status: String, doctorId: String) => {
  try {
    // console.log(status,doctorId);

    const response = await adminApi.patch('/updateKycStatus', { status, doctorId })
    return response
  } catch (error) {
    throw error
  }
}

const getPatientData = async () => {
  try {
    const responsePatientData = await adminApi.get('/getPatients')
    return responsePatientData
  } catch (error) {
    throw error
  }
}
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