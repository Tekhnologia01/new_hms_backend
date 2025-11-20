
const { generateDischargePDF } = require('../services/pdfGenerator');
const path = require('path');
const fs = require('fs');

const generateDischargePDFController = async (req, res) => {
  try {
    const { details, prescriptionData } = req.body;
    
    // Create a temporary file path
    const outputPath = path.join(__dirname, '..', 'temp', `discharge_${details?.uh_id || Date.now()}.pdf`);
    
    // Ensure temp directory exists
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    // Generate PDF
    const pdfBuffer = await generateDischargePDF(details, prescriptionData, outputPath);

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="discharge_${details?.uh_id || 'summary'}.pdf"`
    );

    // Send PDF
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to generate PDF',
      error: error.message 
    });
  }
};

module.exports = {
  generateDischargePDFController
};