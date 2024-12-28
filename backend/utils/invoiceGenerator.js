// utils/invoiceGenerator.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Generate an invoice (PDF) for the given order
const generateInvoice = (order, user) => {
    const doc = new PDFDocument();

    // Define the path to save the invoice (You can save it in a folder on your server)
    const invoicePath = path.join(__dirname, '../invoices', `invoice-${order._id}.pdf`); // Adjust path to `../invoices`

    // Create the write stream to save the PDF file
    doc.pipe(fs.createWriteStream(invoicePath));

    // Add the invoice header
    doc.fontSize(20).text('Invoice', { align: 'center' });

    // Add user and order details
    doc.fontSize(12).text(`Invoice ID: ${order._id}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Customer: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.moveDown();

    // Add the order items
    doc.text('Order Summary:');
    order.orderItems.forEach(item => {
        doc.text(`${item.name} - ${item.qty} x $${item.price}`);
    });
    doc.moveDown();

    // Add total price
    doc.text(`Total Price: $${order.totalPrice}`, { align: 'right' });
    doc.end(); // Finalize the PDF

    return invoicePath;
};

module.exports = { generateInvoice };
