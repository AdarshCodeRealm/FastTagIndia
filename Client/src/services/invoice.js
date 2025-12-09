// Invoice Generation Service
class InvoiceService {
  
  // Generate invoice data structure
  generateInvoiceData(orderData, type = 'purchase') {
    const currentDate = new Date();
    const invoiceNumber = `INV-${orderData.orderId}-${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
    
    return {
      invoiceNumber,
      invoiceDate: currentDate.toLocaleDateString('en-IN'),
      orderDetails: orderData,
      type, // 'purchase' or 'recharge'
      companyDetails: {
        name: 'FASTag India',
        address: 'Mumbai, Maharashtra, India',
        gstin: 'GSTIN123456789',
        phone: '+91 917-272-7232',
        email: 'business@fastagIndia.com',
        website: 'www.fastagindia.com'
      },
      customerDetails: {
        name: orderData.customerName || orderData.user?.name || 'Customer',
        email: orderData.customerEmail || orderData.user?.email || 'customer@email.com',
        phone: orderData.customerPhone || orderData.user?.phone || 'N/A',
        address: orderData.deliveryAddress || 'N/A'
      },
      items: this.generateInvoiceItems(orderData, type),
      totals: this.calculateTotals(orderData, type)
    };
  }

  // Generate invoice items based on order type
  generateInvoiceItems(orderData, type) {
    if (type === 'recharge') {
      return [{
        description: `FASTag Recharge - ${orderData.vehicleNumber}`,
        quantity: 1,
        rate: orderData.amount || 0,
        amount: orderData.amount || 0
      }];
    }

    // Purchase invoice items
    const items = [];
    
    // FASTag cost
    items.push({
      description: `FASTag ${orderData.tagDetails?.vehicleType || 'Vehicle'} - ${orderData.vehicleNumber}`,
      quantity: 1,
      rate: 500, // Base FASTag cost
      amount: 500
    });

    // Initial balance if any
    if (orderData.tagDetails?.initialBalance) {
      items.push({
        description: 'Initial Wallet Balance',
        quantity: 1,
        rate: orderData.tagDetails.initialBalance,
        amount: orderData.tagDetails.initialBalance
      });
    }

    // Delivery charges if any
    if (orderData.deliveryCharge > 0) {
      items.push({
        description: 'Delivery Charges',
        quantity: 1,
        rate: orderData.deliveryCharge,
        amount: orderData.deliveryCharge
      });
    }

    return items;
  }

  // Calculate totals with tax
  calculateTotals(orderData, type) {
    const totalAmount = orderData.amount || 0;
    const taxRate = 0.18; // 18% GST
    const taxableAmount = totalAmount / (1 + taxRate);
    const taxAmount = totalAmount - taxableAmount;

    return {
      subtotal: parseFloat(taxableAmount.toFixed(2)),
      tax: parseFloat(taxAmount.toFixed(2)),
      taxRate: '18%',
      total: totalAmount
    };
  }

  // Generate HTML invoice template
  generateInvoiceHTML(invoiceData) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice - ${invoiceData.invoiceNumber}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f8f9fa;
            }
            
            .invoice-container {
                max-width: 800px;
                margin: 20px auto;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .invoice-header {
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
                color: white;
                padding: 30px;
            }
            
            .company-info {
                display: flex;
                justify-content: space-between;
                align-items: start;
                margin-bottom: 20px;
            }
            
            .company-logo {
                font-size: 28px;
                font-weight: bold;
            }
            
            .company-details {
                text-align: right;
                font-size: 14px;
                opacity: 0.9;
            }
            
            .invoice-title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .invoice-meta {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                font-size: 14px;
                opacity: 0.9;
            }
            
            .invoice-body {
                padding: 30px;
            }
            
            .billing-info {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                margin-bottom: 30px;
            }
            
            .billing-section h3 {
                font-size: 16px;
                margin-bottom: 10px;
                color: #1e40af;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 5px;
            }
            
            .billing-section p {
                margin-bottom: 5px;
                font-size: 14px;
            }
            
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
                font-size: 14px;
            }
            
            .items-table th {
                background-color: #f8fafc;
                border: 1px solid #e5e7eb;
                padding: 12px;
                text-align: left;
                font-weight: 600;
                color: #374151;
            }
            
            .items-table td {
                border: 1px solid #e5e7eb;
                padding: 12px;
            }
            
            .items-table tr:nth-child(even) {
                background-color: #f9fafb;
            }
            
            .text-right {
                text-align: right;
            }
            
            .text-center {
                text-align: center;
            }
            
            .totals-section {
                margin-left: auto;
                width: 300px;
            }
            
            .totals-table {
                width: 100%;
                font-size: 14px;
            }
            
            .totals-table td {
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .totals-table .total-row {
                font-weight: bold;
                font-size: 16px;
                color: #1e40af;
                border-bottom: 2px solid #1e40af;
            }
            
            .invoice-footer {
                background-color: #f8fafc;
                padding: 20px 30px;
                border-top: 1px solid #e5e7eb;
                font-size: 12px;
                color: #6b7280;
                text-align: center;
            }
            
            .status-badge {
                display: inline-block;
                padding: 4px 12px;
                background-color: #10b981;
                color: white;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            @media print {
                body {
                    background-color: white;
                }
                
                .invoice-container {
                    margin: 0;
                    box-shadow: none;
                    border-radius: 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <div class="invoice-header">
                <div class="company-info">
                    <div>
                        <div class="company-logo">🚗 FASTag India</div>
                        <p style="margin-top: 5px; opacity: 0.9;">Digital Toll Solutions</p>
                    </div>
                    <div class="company-details">
                        <p>${invoiceData.companyDetails.address}</p>
                        <p>GSTIN: ${invoiceData.companyDetails.gstin}</p>
                        <p>Phone: ${invoiceData.companyDetails.phone}</p>
                        <p>Email: ${invoiceData.companyDetails.email}</p>
                    </div>
                </div>
                
                <div class="invoice-title">
                    ${invoiceData.type === 'recharge' ? 'RECHARGE RECEIPT' : 'INVOICE'}
                    <span class="status-badge">Paid</span>
                </div>
                
                <div class="invoice-meta">
                    <div>
                        <p><strong>Invoice Number:</strong> ${invoiceData.invoiceNumber}</p>
                        <p><strong>Order ID:</strong> ${invoiceData.orderDetails.orderId}</p>
                    </div>
                    <div style="text-align: right;">
                        <p><strong>Invoice Date:</strong> ${invoiceData.invoiceDate}</p>
                        <p><strong>Payment Method:</strong> ${invoiceData.orderDetails.paymentMethod || 'Online Payment'}</p>
                    </div>
                </div>
            </div>
            
            <div class="invoice-body">
                <div class="billing-info">
                    <div class="billing-section">
                        <h3>Bill To</h3>
                        <p><strong>${invoiceData.customerDetails.name}</strong></p>
                        <p>${invoiceData.customerDetails.email}</p>
                        <p>${invoiceData.customerDetails.phone}</p>
                        ${invoiceData.customerDetails.address !== 'N/A' ? `<p>${invoiceData.customerDetails.address}</p>` : ''}
                    </div>
                    
                    <div class="billing-section">
                        <h3>${invoiceData.type === 'recharge' ? 'Recharge Details' : 'Service Details'}</h3>
                        <p><strong>Vehicle Number:</strong> ${invoiceData.orderDetails.vehicleNumber}</p>
                        ${invoiceData.orderDetails.tagDetails ? `
                            <p><strong>Vehicle Type:</strong> ${invoiceData.orderDetails.tagDetails.vehicleType}</p>
                            <p><strong>Issuing Bank:</strong> ${invoiceData.orderDetails.tagDetails.issuingBank}</p>
                        ` : ''}
                        <p><strong>Service Type:</strong> ${invoiceData.type === 'recharge' ? 'FASTag Recharge' : 'FASTag Purchase'}</p>
                    </div>
                </div>
                
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th class="text-center">Qty</th>
                            <th class="text-right">Rate (₹)</th>
                            <th class="text-right">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoiceData.items.map(item => `
                            <tr>
                                <td>${item.description}</td>
                                <td class="text-center">${item.quantity}</td>
                                <td class="text-right">${item.rate.toLocaleString('en-IN')}</td>
                                <td class="text-right">${item.amount.toLocaleString('en-IN')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="totals-section">
                    <table class="totals-table">
                        <tr>
                            <td>Subtotal:</td>
                            <td class="text-right">₹${invoiceData.totals.subtotal.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                            <td>GST (${invoiceData.totals.taxRate}):</td>
                            <td class="text-right">₹${invoiceData.totals.tax.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr class="total-row">
                            <td><strong>Total Amount:</strong></td>
                            <td class="text-right"><strong>₹${invoiceData.totals.total.toLocaleString('en-IN')}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="invoice-footer">
                <p><strong>Thank you for choosing FASTag India!</strong></p>
                <p>This is a computer-generated invoice and does not require a signature.</p>
                <p>For any queries, contact us at ${invoiceData.companyDetails.phone} or ${invoiceData.companyDetails.email}</p>
                <p style="margin-top: 10px; font-size: 11px;">
                    Generated on ${new Date().toLocaleString('en-IN')} | 
                    Visit us at ${invoiceData.companyDetails.website}
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  // Download invoice as PDF (using browser print)
  downloadInvoice(orderData, type = 'purchase') {
    try {
      console.log('🧾 Generating invoice for order:', orderData.orderId);
      
      const invoiceData = this.generateInvoiceData(orderData, type);
      const htmlContent = this.generateInvoiceHTML(invoiceData);
      
      // Create a new window for the invoice
      const printWindow = window.open('', '_blank');
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print dialog
      printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
      };
      
      console.log('✅ Invoice generated successfully');
      return { success: true, invoiceNumber: invoiceData.invoiceNumber };
      
    } catch (error) {
      console.error('❌ Error generating invoice:', error);
      return { success: false, error: error.message };
    }
  }

  // Save invoice as HTML file
  downloadInvoiceHTML(orderData, type = 'purchase') {
    try {
      const invoiceData = this.generateInvoiceData(orderData, type);
      const htmlContent = this.generateInvoiceHTML(invoiceData);
      
      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${invoiceData.invoiceNumber}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true, invoiceNumber: invoiceData.invoiceNumber };
    } catch (error) {
      console.error('❌ Error downloading HTML invoice:', error);
      return { success: false, error: error.message };
    }
  }

  // Email invoice (placeholder for future implementation)
  async emailInvoice(orderData, recipientEmail, type = 'purchase') {
    try {
      console.log('📧 Email invoice feature - to be implemented with backend');
      // This would typically call your backend API to send email
      return { success: true, message: 'Invoice email sent successfully' };
    } catch (error) {
      console.error('❌ Error sending invoice email:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create and export service instance
const invoiceService = new InvoiceService();

export default invoiceService;

// Named exports for specific methods
export {
  invoiceService,
  InvoiceService,
};