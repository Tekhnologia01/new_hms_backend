const {query}=require('../utils/database')

const getChargesFees = async (page,limit) => {
    try {


    
  
     const response = await query("CALL GetAllCharges(?,?)", [page, limit]);
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }
 
                const doctorData = response[0];
        const paginationData = response[1][0];
 
        return {
            data: doctorData,  // Array of doctors
            pagination: paginationData || {
                TotalRecords: 0,
                TotalPages: 0,
                CurrentPage: page,
                LimitPerPage: limit
            }
        };
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const AddChargesFees = async (name,fees,created_by) => {
    try {
        const response = await query("CALL AddFees(?,?,?)",[name,fees,created_by]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const deleteChargesFees = async (fees_id) => {
    try {
        if (!fees_id) {
            throw new Error("fees_id is required");
        }
        const response = await query("UPDATE tbl_fees SET fees_status = 0 WHERE fees_id = ?", [fees_id]);
     return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const updateChargesFees = async (fees_id,name,fees_amount) => {
    try {
        const response = await query(
            "UPDATE tbl_fees SET fees_name = ?, fees_amount = ? WHERE fees_id = ?",
            [name, fees_amount, fees_id]
        );
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const AddChargesOpd = async (appo_id,quntity,fees_id) => {
    try {
        const response = await query("CALL AddOpdCharges(?,?,?)",[appo_id,quntity,fees_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};






const GetChargesOpdBill = async () => {
    try {
        const response = await query("Call GetOpdDetails(?)",[]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};




const AddIpdPatientCharge = async (admitted_id,charge_id,date,created_by) => {
    try {
        const response = await query("CALL AddIpdPatientCharges(?,?,?,?)",[admitted_id,charge_id,date,created_by]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};




const GetChargesForIpdPatient = async (admited_id) => {
    try {
        const response = await query("Call GetIpdChargesOfpatient(?)",[admited_id]);
        return response ;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const DeleteCharge = async (ipd_charge_id) => {
    try {
        const response = await query("delete from tbl_ipd_charges where ipd_charge_id=? ",[ipd_charge_id]);
        return response ;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetChargesForOpdPatient = async (appo_id) => {
    try {

        const [response] = await query("Call Getopdchargesappointmentidwise(?)",[appo_id]);
        return response ;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const DeleteOpdcharge = async (opd_charge_id) => {
    try {
        const response = await query("Call DeleteOpdBillAppoIdwise(?)",[opd_charge_id]);

        console.log(response)
        return response ;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const Addappointmentwisechargesopd = async (appo_id,fees_id,qauntity,total_fee) => {
    try {
        const response = await query("Call AddOpdBillAppoIdwise(?,?,?,?) ",[appo_id,fees_id,qauntity,total_fee]);
        return response ;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};







module.exports={getChargesFees,AddChargesFees,deleteChargesFees,updateChargesFees,AddChargesOpd,GetChargesOpdBill,AddIpdPatientCharge,GetChargesForIpdPatient,DeleteCharge,GetChargesForOpdPatient,DeleteOpdcharge,Addappointmentwisechargesopd}