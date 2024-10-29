import easyinvoice, { InvoiceData } from 'easyinvoice';
import { useState, useEffect } from 'react';


const Invoice = () => {
    const [pdf, setPdf] = useState('');
    // const handleDownload = () => {
    //     const bytes = atob(pdf.split(',')[1]);
    //     const arrayBuffer = new ArrayBuffer(bytes.length);
    //     const uint8Array = new Uint8Array(arrayBuffer);
    //     for (let i = 0; i < bytes.length; i++) {
    //       uint8Array[i] = bytes.charCodeAt(i);
    //     }
    //     const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    //     saveAs(blob, 'document.pdf');
    //   };
      useEffect(() => {easyinvoice.createInvoice(data, function (result) {
        // The response will contain a base64 encoded PDF file
        console.log(result);
        setPdf(result.pdf); // Set the PDF state with the result.pdf value
    
        // Now this result can be used to save, download or render your invoice
        // Please review the documentation below on how to do this
    })}, []);

// Create your invoice! Easy!
let data:InvoiceData = {
    apiKey: "free", // Please register to receive a production apiKey: https://app.budgetinvoice.com/register
    mode: "development",
    images: {
        // The logo on top of your invoice
        logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
        // The invoice background
        // background: "https://public.budgetinvoice.com/img/watermark-draft.jpg"
    },
    sender: {
        company: "RestStar Corp.",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Riverside",
        country: "USA"
    },
     // Production or development, defaults to production
    products: [
        {
            quantity: '2',
            description: "Test product",
            taxRate: 7,
            price: 33.87
        }
    ]
};


return (
    <div>
        <h1>Download invoice pdf!</h1>
        <div>
      <iframe
        title="PDF Preview"
        src={`data:application/pdf;base64,${pdf}`}
        width="100%"
        height="500px"
      />

    </div>
    </div>
)
}
export default Invoice;