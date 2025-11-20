const feesService = require('../services/feesService')

const getChargesFees = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = page ? parseInt(page, 10) : null;
    const limitNumber = limit ? parseInt(limit, 10) : null;
    const result = await feesService.getChargesFees(pageNumber, limitNumber);
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

const AddChargesFees = async (req, res) => {
  try {
    const { fees_name, fees_amount, created_by } = req.body;

    // Validate required fields
    if (!fees_name || !fees_amount || !created_by) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    // Call the service function with required parameters
    const result = await feesService.AddChargesFees(fees_name, fees_amount, created_by);

    res.status(200).json({ status: true, message: "Fees added successfully", data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const UpdateChargesFees = async (req, res) => {
  try {
    const { fees_id, fees_name, fees_amount } = req.body;

    // Validate required fields
    if (!fees_name || !fees_amount || !fees_id) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }
    // Call the service function with required parameters
    const result = await feesService.updateChargesFees(fees_id, fees_name, fees_amount);
    res.status(200).json({ status: true, message: "Fees added successfully", data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const deleteChargesFees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await feesService.deleteChargesFees(id);
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ status: false, message: "No records found to delete" });
    }
    res.status(200).json({ status: true, message: "Successfully deleted", data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};

const AddChargesOpd = async (req, res) => {
  try {
    const { appo_id, quntity, fees_ids } = req.body;

    // Validate required fields
    if (!appo_id || !quntity || !fees_ids || !Array.isArray(quntity) || !Array.isArray(fees_ids)) {
      return res.status(400).json({
        status: false,
        message: "All fields are required and must be arrays"
      });
    }

    // Ensure both arrays have the same length
    if (quntity.length !== fees_ids.length) {
      return res.status(400).json({
        status: false,
        message: "Quantity and fees_ids must have the same length"
      });
    }

    let results = [];

    for (let i = 0; i < fees_ids.length; i++) {
      const fees_id = fees_ids[i];
      const qty = quntity[i];

      // Validate individual fields
      if (!fees_id || !Number.isInteger(fees_id) || fees_id <= 0) {
        return res.status(400).json({
          status: false,
          message: `Invalid fees_id at index ${i}`
        });
      }

      if (!qty || !Number.isInteger(qty) || qty <= 0) {
        return res.status(400).json({
          status: false,
          message: `Invalid quantity at index ${i}`
        });
      }

      // Call the service function for each item
      const result = await feesService.AddChargesOpd(appo_id, fees_id, qty);
    }

    res.status(200).json({
      status: true,
      message: "Fees added successfully",
    });

  } catch (error) {
    console.error("Error in AddChargesOpd:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const GetChargesOpdBill = async (req, res) => {
  try {
    const result = await feesService.GetChargesOpdBill();
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



const AddIpdPatientCharge = async (req, res) => {
  try {
    const { admited_id, charge_id, date, created_by } = req.body;

    // Validate required fields
    if (!admited_id || !charge_id || !date || !created_by) {
      return res.status(400).json({
        status: false,
        message: "All fields are required"
      });
    }
    const result = await feesService.AddIpdPatientCharge(admited_id, charge_id, date, created_by);

    if (!result) {
      return res.status(500).json({
        status: false,
        message: "Failed to add charges"
      });
    }

    return res.status(201).json({
      status: true,
      message: "Charges added successfully",
      data: result
    });

  } catch (error) {
    console.error("Error in AddIpdPatientCharges:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const GetChargesForIpdPatient = async (req, res) => {
  try {
    const { admited_id } = req.query;

    if (!admited_id) {
      return res.status(400).json({
        status: false,
        message: "admited_id is required"
      });
    }
    const result = await feesService.GetChargesForIpdPatient(admited_id);
    return res.status(201).json({
      status: true,
      message: "Charges added successfully",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const DeleteCharge = async (req, res) => {
  try {
    const { ipd_charge_id } = req.query;

    if (!ipd_charge_id) {
      return res.status(400).json({
        status: false,
        message: "admited_id is required"
      });
    }
    const result = await feesService.DeleteCharge(ipd_charge_id);
    return res.status(201).json({
      status: true,
      message: "Charges deleted successfully",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const GetChargesForOpdPatient1 = async (req, res) => {
  try {
    const { appo_id } = req.query;

    if (!appo_id) {
      return res.status(400).json({
        status: false,
        message: "admited_id is required"
      });
    }
    const result = await feesService.GetChargesForOpdPatient(appo_id);
    return res.status(201).json({
      status: true,
      message: "Charges get charges",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



const DeleteOpdcharge = async (req, res) => {
  try {
    const { opd_charge_id } = req.query;

    if (!opd_charge_id) {
      return res.status(400).json({
        status: false,
        message: "opd id is required"
      });
    }
    const result = await feesService.DeleteOpdcharge(opd_charge_id);
    return res.status(201).json({
      status: true,
      message: "Charges deleted successfully",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const Addappointmentwisechargesopd = async (req, res) => {
  try {
    const { appo_id,fees_id,quantity,total_fee } = req.body;
       
    if (!appo_id || !fees_id ||!quantity || !total_fee ) {
      return res.status(400).json({
        status: false,
        message: "All field are required"
      });
    }
    const result = await feesService.Addappointmentwisechargesopd(appo_id,fees_id,quantity,total_fee);
    return res.status(201).json({
      status: true,
      message: "Charges added successfully",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};




module.exports = { getChargesFees, AddChargesFees, deleteChargesFees, UpdateChargesFees, AddChargesOpd, GetChargesOpdBill, AddIpdPatientCharge, GetChargesForIpdPatient, DeleteCharge,GetChargesForOpdPatient1,DeleteOpdcharge,Addappointmentwisechargesopd }