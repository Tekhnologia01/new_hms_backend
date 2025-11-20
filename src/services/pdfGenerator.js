const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { epochToTime, epochToTime1 } = require('../utils/epochTime');

// Helper function to format dates
function formatEpochToDate(epoch) {
  if (!epoch) return '';
  const date = new Date(epoch * 1000);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

async function generateDischargePDF(data, prescription) {



  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      bufferPages: true
    });

    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Constants for layout
    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const centerX = doc.page.margins.left + pageWidth / 2;

    // Register fonts for consistency
    doc.registerFont('Helvetica-Bold', 'Helvetica-Bold');
    doc.registerFont('Helvetica-Regular', 'Helvetica');

    // Load image with error handling
    let imageBase64;
    try {
      const imagePath = path.join(__dirname, '..', 'Uploads', 'Airavat.png');

      // Verify file exists
      if (!fs.existsSync(imagePath)) {
        throw new Error(`Image not found at: ${imagePath}`);
      }

      imageBase64 = `data:image/png;base64,${fs.readFileSync(imagePath).toString('base64')}`;
    } catch (error) {
      reject(new Error(`Failed to load image: ${error.message}`));
      return;
    }

    // Function to add watermark and header border to all pages
    function addPageDecorations() {
      doc.save();
      doc.opacity(0.1); // Set opacity for watermark effect
      doc.image(imageBase64, centerX - 150, doc.page.height / 2 - 150, {
        width: 300
      });
      doc.opacity(1); // Reset opacity for other content
      doc.restore();
    }

    // Apply decorations to the first page
    addPageDecorations();

    // Add logo only on the first page
    doc.image(imageBase64, centerX - 50, 10, {
      width: 100,
      height: 60
    });


    doc.font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#1F2937')
      .text('Discharge Summery', centerX - 90, 80, {
        width: 200,
        align: 'center'
      });

    doc.font('Helvetica-Regular')
      .fontSize(8)
      .fillColor('#6B7280')
      .text('Reg No: MH/THA/NA073', centerX - 90, 100, {
        width: 200,
        align: 'center'
      });

    doc.moveDown(1);

    // Patient information in two columns
    const leftColX = doc.page.margins.left;
    const rightColX = doc.page.margins.left + pageWidth * 0.55;

    doc.fontSize(10)
      .fillColor('#374151')
    // Left column
    doc.text(`NAME: ${data?.patient_name || ''}`, leftColX, doc.y)
      .moveDown(0.5)
      .text(`AGE: ${data?.patient_age || ''} YEARS`, leftColX)
      .moveDown(0.5)
      .text(`SEX: ${data?.patient_sex || '-'}`, leftColX)
      .moveDown(0.5)
      .text(`CONSULTANT: ${data?.doctor_name || ''}`, leftColX)
      .moveDown(0.5)
      // .text(`DATE OF ADMISSION: ${formatEpochToDate(data?.admitted_date)}`, leftColX)
      .text(`DATE OF ADMISSION: ${data?.admitted_date1}`, leftColX)

      .moveDown(0.5)
      .text(`TIME OF ADMISSION: ${epochToTime1(data?.admitted_date)}`, leftColX);


    // Right column
    doc.font('Helvetica-Regular')
      .text(`UHID: ${data?.uh_id || ''}`, rightColX, 120, { width: pageWidth * 0.45, align: 'right' })
      .moveDown(0.5)
      .text(`IPD NO.: ${data?.ipd_id || ''}`, { width: pageWidth * 0.45, align: 'right' })
      .moveDown(0.5)
      .text(`MLC NO.:${data?.mlc_no || ''}`, { width: pageWidth * 0.45, align: 'right' })
      .moveDown(0.5)
      .text(`DEPARTMENT: ${data?.department || ''}`, { width: pageWidth * 0.45, align: 'right' })
      .moveDown(0.5)
      .text(`DATE OF DISCHARGE: ${formatEpochToDate(data?.discharge_date_time)}`, { width: pageWidth * 0.45, align: 'right' })
      .moveDown(0.5)
      .text(`TIME OF DISCHARGE: ${epochToTime1(data?.discharge_date_time)}`, { width: pageWidth * 0.45, align: 'right' });

    // Divider line
    doc.moveDown(1)
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.margins.left + pageWidth, doc.y)
      .lineWidth(1.5)
      .strokeColor('#4B5563')
      .stroke()
      .moveDown(1);


    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Discharge Type', doc.page.margins.left, doc.y, { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .fillColor('#1F2937')
      .text(data?.discharge_type || '');
    doc.moveDown(0.5);



    // Diagnosis section - properly left-aligned
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Diagnosis', doc.page.margins.left, doc.y, { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .fillColor('#374151')
      .text(data?.diagnosis || '', doc.page.margins.left, doc.y, {
        width: pageWidth,

      });
    doc.y += 2 + (data?.diagnosis ? doc.heightOfString(data.diagnosis, { width: pageWidth }) : 0);





    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Procedure Type', doc.page.margins.left, doc.y, { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .fillColor('#1F2937')
      .text(data?.procedure_type || '');

    doc.moveDown(1);


    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Procedure Details', doc.page.margins.left, doc.y, { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .fillColor('#1F2937')
      .text(data?.procedure_details || '');

    doc.moveDown(1);



    // Chief Complaints - properly left-aligned
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Chief Complaints', doc.page.margins.left, doc.y, { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .text(data?.chief_complaints || '', doc.page.margins.left, doc.y, {
        width: pageWidth,
        lineGap: 2
      });
    doc.y += 2 + (data?.chief_complaints ? doc.heightOfString(data.chief_complaints, { width: pageWidth }) : 0);
    doc.moveDown(0.5);

    // Physical Examination - properly left-aligned
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Physical Examination', doc.page.margins.left, doc.y, { underline: true });
    doc.moveDown(0.3);
    doc.fontSize(10)
      .text('Signs', doc.page.margins.left, doc.y, { continued: true })
      .font('Helvetica-Regular')
      .text(':', { continued: false });

    // Bullet points for signs - properly left-aligned
    if (data?.signs) {
      data.signs.split(',').forEach(sign => {
        doc.fontSize(10)
          .text(`• ${sign.trim()}`, doc.page.margins.left + 15, doc.y, {
            width: pageWidth - 15
          });
        doc.y += doc.heightOfString(`• ${sign.trim()}`, { width: pageWidth - 15 }) + 3;
      });
    }
    doc.moveDown(1);

    // Vital signs in two columns
    const vitalSignsLeft = doc.page.margins.left;
    doc.fontSize(10)
      .font('Helvetica-Regular')
      .text(`Temperature: ${data?.temprature || ''}`)
      .moveDown(0.5)
      .text(`Pulse: ${data?.pulse || ''}`)
      .moveDown(0.5)
      .text(`Blood Pressure: ${data?.blood_pressure || ''}`)
      .moveDown(0.5)
      .text(`Respiratory Rate: ${data?.respiratory_rate || ''}`);
    doc.x = vitalSignsLeft;
    doc.moveDown(2);


    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Systemic Examination', { underline: true });
    doc.moveDown(0.3);
    // System examinations
    doc.fontSize(10)
      .font('Helvetica-Regular')
      .text(`Cardiovascular System (CVS): ${data?.cvs || ''}`)
      .moveDown(0.5)
      .text(`Respiratory System (RS): ${data?.rs || ''}`)
      .moveDown(0.5)
      .text(`Per Abdomen (PA): ${data?.pa || ''}`)
      .moveDown(0.5)
      .text(`Central Nervous System (CNS): ${data?.cns || ''}`);
    doc.moveDown(1);

    // Local Examination
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Local Examination', { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .text(data?.local_examination || '', { lineGap: 2 });
    doc.moveDown(1);

    // Past History
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Past History', { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .text(data?.past_history || 'None provided', { lineGap: 2 });
    doc.moveDown(1);

    // Course in hospital
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Course in Hospital', { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .text(data?.course_details || '', { lineGap: 2 });
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Treatment given', { underline: true });


    doc.font('Helvetica-Regular')
    if (data?.treatment_point?.length > 0) {
      doc.moveDown(0.3);
      data.treatment_point.forEach(treatment => {
        doc.fontSize(10)
          .text(`• ${treatment?.treatment_point || ''}`, { indent: 15, lineGap: 3 });
      });
    }
    doc.moveDown(1);


    // Add new page for continuation
    // doc.addPage();
    // addPageDecorations();

    // Advice on Discharge
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Advice on Discharge', { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .text(data?.discharge_advice || '', { lineGap: 2 });
    doc.moveDown(1);

    // Further Follow-up
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#1F2937')
      .text('Further Follow-up', { underline: true });
    doc.moveDown(0.3);
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .text('All investigation reports and images of radiological investigations have been handed over to the patient/patient attendant.', { lineGap: 2 });
    doc.moveDown(2);


    // doc.moveDown(0.5);

    // Prescription table
    if (prescription?.length > 0) {
      doc.font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('#1F2937')
        .text('Prescription', { underline: true });
      doc.moveDown(0.5);

      // Table headers
      const tableTop = doc.y;
      const colWidths = [25, 100, 55, 60, 70, 40, 60, 88];
      const headers = ['No', 'Medicine Name', 'Dose', 'Type', 'Frequency', 'Days', 'Quantity', 'Remarks'];

      // Draw header background
      doc.rect(doc.page.margins.left, tableTop, pageWidth, 25)
        .fillAndStroke('#F3F4F6', '#D1D5DB');

      let x = doc.page.margins.left;
      doc.font('Helvetica-Bold')
        .fontSize(10)
        .fillColor('#1F2937');
      headers.forEach((header, i) => {
        doc.text(header, x + (i === 0 || i > 1 ? 5 : 10), tableTop + 7, {
          width: colWidths[i] - (i === 0 || i > 1 ? 10 : 20),
          align: i === 0 || i > 1 ? 'center' : 'left'
        });
        x += colWidths[i];
      });

      // Draw rows
      let y = tableTop + 25;
      doc.font('Helvetica-Regular')
        .fontSize(10);
      prescription?.forEach((item, index) => {
        if (y > doc.page.height - doc.page.margins.bottom - 50) {
          doc.addPage();
          addPageDecorations();
          y = doc.page.margins.top;
        }

        const row = [
          index + 1,
          item.medicine_name || '',
          item.dosage || '',
          item.medicine_type || '',
          item.frequency || '',
          item.days || '',
          item.quantity || '',
          item.common_note || ''
        ];

        // Calculate the maximum height needed for this row
        let maxRowHeight = 20; // Minimum row height
        row.forEach((cell, i) => {
          const cellHeight = doc.heightOfString(cell.toString(), {
            width: colWidths[i] - (i === 0 || i > 1 ? 10 : 20),
            align: i === 0 || i > 1 ? 'center' : 'left'
          });
          maxRowHeight = Math.max(maxRowHeight, cellHeight + 10); // Add padding
        });

        x = doc.page.margins.left;
        doc.fillColor('#374151');
        row.forEach((cell, i) => {
          // Draw cell borders
          doc.strokeColor('#D1D5DB')
            .lineWidth(0.5)
            .rect(x, y, colWidths[i], maxRowHeight)
            .stroke();

          doc.text(cell.toString(), x + (i === 0 || i > 1 ? 5 : 10), y + 5, {
            width: colWidths[i] - (i === 0 || i > 1 ? 10 : 20),
            align: i === 0 || i > 1 ? 'center' : 'left'
          });

          x += colWidths[i];
        });

        y += maxRowHeight;
      });
    }

    // Signatures
    doc.moveDown(3);
    const leftMargin = doc.page.margins.left;
    const rightMargin = doc.page.width - doc.page.margins.right;
    const signatureY = doc.y;
    const signatureLineLength = 150;

    // Signature text
    doc.font('Helvetica-Regular')
      .fontSize(10)
      .fillColor('#374151')
      .text(`Prepared by: ${data?.doctor_name || ''}`, leftMargin, signatureY, {
        width: pageWidth / 2 - leftMargin,
        align: 'left'
      })
      .text(`Checked by: ${data?.doctor_name || ''}`, pageWidth / 2, signatureY, {
        width: pageWidth - doc.page.margins.right - 150,
        align: 'right'
      });

    // Signature lines - properly aligned with text
    const lineY = signatureY + 20;
    doc.moveTo(leftMargin, lineY)
      .lineTo(leftMargin + signatureLineLength, lineY)
      .lineWidth(1)
      .strokeColor('#4B5563')
      .stroke();

    // Calculate right-aligned line position
    const rightLineX = rightMargin - signatureLineLength;
    doc.moveTo(rightLineX, lineY)
      .lineTo(rightMargin, lineY)
      .stroke();

    // Summary issued date/time
    doc.moveDown(5)
      .fontSize(8)
      .fillColor('#6B7280')
      .text(`Summary issued date/time: ${data?.discharge_date || ''}, ${data?.discharge_time || ''}`, leftMargin, signatureY + 30, {
        align: 'left',
        width: pageWidth
      });

    // Follow-up Date
    doc.moveDown(0.5)
    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#1F2937')
      .text(`Follow-up Date: ${formatEpochToDate(data?.follow_up_date_time || NA)}`);


    doc.moveDown(3)

    // Footer
    const footerY = doc.page.height - doc.page.margins.bottom - 60;
    doc.fontSize(8)
      .fillColor('#6B7280')
      .text(`Add : CTS NO.332 to 340 ,Opp.Pariwar Hotel`, doc.page.margins.left, footerY)
      .moveDown(0.3)
      .text('Nr. New Municipal Building, Staion Road,', doc.page.margins.left)
      .moveDown(0.3)
      .text('Badlapur(E)-421503', doc.page.margins.left)
      .moveDown(0.3)
      .text('Mob : 9206983333 / 7400567891', doc.page.margins.left)
      .moveDown(0.3)
      .text('Email : airavathospital21@gmail.com', doc.page.margins.left);

    // Patient signature area
    doc.text(data?.patient_name || '', doc.page.margins.left + pageWidth - 150, footerY, {
      width: 150,
      align: 'right'
    })
      .moveDown(0.3)
      .text('(Patient/Relative signature)', { align: 'right' });

    // Footer divider
    doc.moveTo(doc.page.margins.left, footerY - 10)
      .lineTo(doc.page.margins.left + pageWidth, footerY - 10)
      .lineWidth(0.5)
      .strokeColor('#D1D5DB')
      .stroke();

    doc.end();
  });
}

module.exports = {
  generateDischargePDF,
  formatEpochToDate
};

