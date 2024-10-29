import easyinvoice, { InvoiceData } from 'easyinvoice';
import { useState, useEffect } from 'react';


interface InvoiceProps {

    invoice: string; // users can be an array of CustomerData objects or null
}


const Invoice : React.FC<InvoiceProps> = ({invoice}) => {

    const [pdf, setPdf] = useState('');
    
    const products = JSON.parse(invoice).map((product:any)=>{
        product.description = product.name;
        return product;
    });


      useEffect(() => {easyinvoice.createInvoice(data, function (result:any) {
        // The response will contain a base64 encoded PDF file
        console.log(result);
        setPdf(result.pdf); // Set the PDF state with the result.pdf value
    
        // Now this result can be used to save, download or render your invoice
    })}, [invoice]);

// Create your invoice! Easy!
let data:InvoiceData = {
    apiKey: "free", // Please register to receive a production apiKey: https://app.budgetinvoice.com/register
    mode: "development",
    images: {
        // The logo on top of your invoice
        logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
        // The invoice background
        // background: fsreact.readFileSync('images/background.png', 'base64')
    },
    sender: {
        company: "RestStar Corp.",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Riverside",
        country: "USA"
    },
     // Production or development, defaults to production
    products: products,
    settings: {
        locale: 'en-US',
        currency: 'USD'
    }
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