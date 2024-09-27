import React, { useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import satoshi from "../../fonts/Satoshi-Regular.ttf";
import { NavLink } from "react-router-dom";
import SuccessModal from "../../components/Modal/SucccesModal";
const FinalizeTemplate = () => {
  const documentData = useSelector((state) => state.document);
  const lawyerData = useSelector((state) => state.lawyer);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true); // Set to true to show the modal

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };
  console.log(documentData, lawyerData);
  const generatePDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Load the font file
    pdf.addFileToVFS("Satoshi-Regular.ttf", satoshi);
    pdf.addFont("Satoshi-Regular.ttf", "Satoshi", "regular");
    pdf.setFont("Satoshi");

    pdf.setFontSize(22);
    const title = documentData.template.title;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const textWidth = pdf.getTextWidth(title);

    const xPosition = (pageWidth - textWidth) / 2;
    pdf.text(title, xPosition, 20);

    let content = documentData.content;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    // pdf.setTextColor(128, 128, 128); // Gray color

    let currentY = 30;

    Array.from(tempDiv.childNodes).forEach((child) => {
      if (child.nodeName === "H1") {
        pdf.setFontSize(18);
        pdf.setFont("Satoshi", "bold");
        pdf.text(child.textContent.trim(), 10, currentY);
        currentY += 2;
      } else if (child.nodeName === "P") {
        pdf.setFontSize(14);
        pdf.setFont("Satoshi", "normal");
        const lines = pdf.splitTextToSize(child.textContent.trim(), 180);
        pdf.text(lines, 10, currentY);
        currentY += lines.length * 7;
      } else if (child.nodeName === "UL") {
        // Handle unordered lists
        child.childNodes.forEach((li, index) => {
          if (li.nodeName === "LI") {
            pdf.setFontSize(14);
            pdf.setFont("Satoshi", "normal");
            const text = `• ${li.textContent.trim()}`; // Bullet point
            pdf.text(text, 10, currentY);
            currentY += 7; // Adjust for line height
          }
        });
      } else if (child.nodeName === "OL") {
        // Handle ordered lists
        child.childNodes.forEach((li, index) => {
          if (li.nodeName === "LI") {
            pdf.setFontSize(14);
            pdf.setFont("Satoshi", "normal");
            const text = `${index + 1}. ${li.textContent.trim()}`; // Numbering
            pdf.text(text, 10, currentY);
            currentY += 7; // Adjust for line height
          }
        });
      }
    });

    pdf.save("template-preview.pdf");
  };
  return (
    <div className="flex flex-col items-start my-24 mt-32 w-full px-4 sm:px-8 md:px-24">
      <h1 className="w-full text-center"> Document Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-4  md:gap-x-24">
        <div className="flex flex-col items-start w-full col-span-1 bg-white py-8 px-4">
          <h1 className="text-2xl font-bold text-black mb-4 text-center w-full">
            {documentData.template.title}
          </h1>

          <div
            dangerouslySetInnerHTML={{
              __html: documentData.content,
            }}
          />
        </div>
        <div className="flex flex-col items-start w-full col-span-1  py-8">
          <h1 className="text-2xl font-bold text-black ">Hired Lawyer</h1>

          <div className="flex flex-row items-center w-full justify-start mt-4">
            <img
              className="w-14 h-14 object-cover rounded-full"
              src={lawyerData.image}
            />
            <div className="flex flex-col items-start ml-2">
              <h2 className="font-bold text-lg text-black">
                {lawyerData.name}
              </h2>
              <h2 className=" text-sm">{lawyerData.specialty}</h2>
            </div>
          </div>
          <p className="mt-4">{lawyerData.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <button
          type="button"
          onClick={() => {
            generatePDF();
            setPdfGenerated(true);
          }}
          className={` mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700`}
        >
          Generate PDF
        </button>
      </div>
      {pdfGenerated && (
        <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}{" "}
    </div>
  );
};

export default FinalizeTemplate;
