const path = require("path");
const accountantService = require("../services/accountantService");
const { getEpochTime, convertEpochToDate } = require("../utils/epochTime");

//***************************AddAppointment****************************//

const GetAdmitedPatientBill = async (req, res) => {
  try {
    const result = await accountantService.GetAdmitedPatientBill();
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Paydeposite = async (req, res) => {
  try {
    const { admitedId, amount, date , mode} = req.body;
    if (!admitedId || !amount || !date || !mode) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }
    const result = await accountantService.Paydeposite(admitedId, amount, getEpochTime(date),mode);
    res.status(200).json({ status: true, message: "Fees added successfully", data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const GetCollectionReportDatewise = async (req, res) => {
  try {
    const { date } = req.query;

    const result = await accountantService.GetCollectionReportDatewise(getEpochTime(date));
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetopdReportDatewise = async (req, res) => {
  try {
    const { date } = req.query;

    const result = await accountantService.GetopdReportDatewise(date);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addAccountant = async (req, res) => {
  try {
    // Extract file paths
    const photo = req.files?.['user_photo']?.[0]?.path || null;
    const idProofImage = req.files?.['id_proof_image']?.[0]?.path || null;
    const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;

    const extractedIdProofImagePath = idProofImage ? idProofImage.split("\\").slice(-2).join("\\") : "null";

    // Extract fields from request body
    const {
      degree,
      year_of_graduation,
      name,
      phoneno,
      email_id,
      sex,
      age,
      address,
      city,
      id_proof,
      username,
      password,
      joining_date,
      created_by,
      shift_id,
      blood_group
    } = req.body;
    // Validate required fields
    if (
      !name || !phoneno || !email_id || !sex || !age || !address || !city
      || !id_proof
      || !degree || !blood_group
      || !shift_id || !joining_date || !username || !password
    ) {

      return res.status(400).json({ status: false, message: "Required fields are missing" });
    }

    // Call the service to add the doctor
    await accountantService.addUserAccountant(
      degree,
      year_of_graduation,
      name,
      phoneno,
      email_id,
      sex,
      age,
      address,
      city,
      id_proof,
      extractedIdProofImagePath,
      extractedPhotoPath,
      5,
      username,
      password,
      getEpochTime(joining_date),
      created_by,
      shift_id,
      blood_group,
    );

    res.status(201).json({ message: "Accountant added successfully" });
  } catch (error) {
    console.error("Error adding accountant:", error);
    res.status(500).json({ error: error.message });
  }
};

const GetAdmitedPatientReceipt = async (req, res) => {
  try {
    const { admited_id } = req.query;

    if (!admited_id) {
      return res.status(400).json({ status: false, message: "Admited id is required" });
    }
    const result = await accountantService.GetAdmitedPatientReceipt(admited_id);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetAccountant = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = page ? parseInt(page, 10) : null;
    const limitNumber = limit ? parseInt(limit, 10) : null;
    const doctors = await accountantService.GetAccountant(pageNumber, limitNumber);
    if (doctors?.data.length !== 0) {
      doctors?.data.forEach(doctor => {
        doctor.joining_date = convertEpochToDate(doctor.joining_date).split(',')[0];
      });
    }
    res.status(200).json({ status: true, data: doctors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const IpdBill = async (req, res) => {
  try {
    const { admitedId, amount, payment_method, receipt_number, user_id ,discount_amount} = req.body;

    const report = req.file ? path.basename(req.file.path) : null;

    if (!admitedId || !amount || !payment_method || !receipt_number || !user_id || !discount_amount) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    const currentEpochTime = Math.floor(Date.now() / 1000); 

    const result = await accountantService.IpdBill(
      admitedId,
      amount,
      payment_method,
      report,
      receipt_number,
      currentEpochTime,
      user_id,
      discount_amount
    );

    return res.status(200).json({
      status: true,
      message: "Fees added successfully",
      data: result,
    });
  } catch (error) {
    console.error("IPD Bill Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const TodayDischargePatientList = async (req, res) => {
  try {
    const { date } = req.query;
    const result = await accountantService.TodayDischargePatientList(date);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        data: []
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ChangeAdmitedpatientSatuts = async (req, res) => {
  try {
    const { admited_id } = req.query;
    const result = await accountantService.ChangeAdmitedpatientSatuts(admited_id);
    if (!result) {
      return res.status(200).json({
        status: true,
        message: "change the status of the admited"
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const PaymentHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10, patient_id } = req.query; // Default page and limit

    let result;

    if (patient_id   ) {

      result = await accountantService.PaymentHistorySearch( patient_id, page, limit );
    } else {
      // If patient_id is not provided, fetch general discharge patient list
      result = await accountantService.PaymentHistory(page, limit );
    }

    // Handle empty or no results
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(200).json({
        status: true,
        message: 'No data found',
        data: [],
      });
    }

    // Return successful response
    res.status(200).json({
      status: true,
      message: 'Data fetched successfully',
      data: result,
    });
  } catch (error) {
    // Consistent error response
    res.status(500).json({
      status: false,
      message: 'An error occurred',
      error: error.message,
    });
  }
};

const ChangeSatutsAllProcessCompleted = async (req, res) => {
  try {
    const { admited_id } = req.query;
    const result = await accountantService.ChangeSatutsAllProcessCompleted(admited_id);
    if (!result) {
      return res.status(200).json({
        status: true,
        message: "change the status of the admited"
      });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  GetAdmitedPatientBill,
  Paydeposite,
  GetCollectionReportDatewise,
  addAccountant,
  GetAdmitedPatientReceipt,
  GetAccountant,
  IpdBill,
  TodayDischargePatientList,
  ChangeAdmitedpatientSatuts,
  GetopdReportDatewise,
  PaymentHistory,
  ChangeSatutsAllProcessCompleted
};


