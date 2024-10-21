import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import satoshi from "../../fonts/Satoshi-Regular.ttf";
import { NavLink, useNavigate } from "react-router-dom";
import SuccessModal from "../../components/Modal/SucccesModal";
import { config } from "../../config/config";
import "./style.css";
import {
  createDocument,
  fetchUserDocuments,
} from "../../services/document-services";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import VerifyDocumentPage from "../Document/VerifyDocument";
import {
  logoBase64,
  logoBlack,
  qrCode,
  signature,
} from "../../constants/global";
const FinalizeTemplate = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: "smooth", // Smooth scroll effect
    });
  };
  const navigate = useNavigate();
  const documentData = useSelector((state) => state.document);
  const lawyerData = useSelector((state) => state.lawyer);
  const template = useSelector((state) => state.selectedTemplate);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true); // Set to true to show the modal
  const [documentDownloaded, setDocumentDownload] = useState(false); // Set to true to show the modal
  const [documentId, setDocumentId] = useState(null);
  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };
  const addPlaceholder = (pdf) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Original logo dimensions
    const logoOriginalWidth = 160; // Original width of the logo
    const logoOriginalHeight = 40; // Original height of the logo

    // Calculate aspect ratio
    const aspectRatio = logoOriginalWidth / logoOriginalHeight;

    // Calculate new dimensions while maintaining the aspect ratio
    let logoWidth, logoHeight;

    if (logoOriginalWidth > logoOriginalHeight) {
      logoWidth = Math.min(logoOriginalWidth, pageWidth * 0.9);
      logoHeight = logoWidth / aspectRatio;
    } else {
      logoHeight = Math.min(logoOriginalHeight, pageHeight * 0.9);
      logoWidth = logoHeight * aspectRatio;
    }

    // Center the image
    const xPosition = (pageWidth - logoWidth) / 2;
    const yPosition = (pageHeight - logoHeight) / 2;

    // Add the image to the PDF
    pdf.addImage(
      logoBase64,
      "PNG",
      xPosition,
      yPosition,
      logoWidth,
      logoHeight
    );
  };
  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height,
        });
      };
      img.src = src;
    });
  };

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginX = 10;
    const marginY = 30;

    const contentWidth = pageWidth - 2 * marginX;

    // Load the font file
    pdf.addFileToVFS("Satoshi-Regular.ttf", satoshi);
    pdf.addFont("Satoshi-Regular.ttf", "Satoshi", "regular");
    pdf.setFont("Satoshi");

    let currentY = marginY;

    const imageHeight = 10; // Adjust height to your needs
    pdf.addImage(qrCode, "PNG", marginX, currentY, 20, 20); // QR Code
    pdf.addImage(logoBlack, "PNG", marginX + 60, currentY, 60, 20); // Logo
    pdf.addImage(signature, "PNG", marginX + 150, currentY, 20, 20); // QR Code

    currentY += imageHeight + 10;
    currentY += 20; // Move down after header

    pdf.setFontSize(12);

    // Add title
    pdf.setFontSize(22);
    const title = documentData.template.name;
    const titleLines = pdf.splitTextToSize(title, contentWidth);
    titleLines.forEach((line) => {
      if (currentY + 10 > pageHeight - marginY) {
        pdf.addPage();
        currentY = marginY;
        pdf.text("LegalEase", marginX, currentY); // Re-add header on new page
        currentY += 10;
      }
      pdf.text(line, marginX, currentY);
      currentY += 10;
    });

    let content = documentData.content;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    Array.from(tempDiv.childNodes).forEach((child) => {
      const lineHeight = 7;

      // Check if adding the next line will overflow the page
      const checkPageOverflow = () => {
        if (currentY + lineHeight > pageHeight - marginY) {
          pdf.addPage();
          currentY = marginY;
          pdf.text("LegalEase", marginX, currentY); // Re-add header on new page
          currentY += 10; // Move down after header
        }
      };

      if (child.nodeName === "H1") {
        pdf.setFontSize(18);
        pdf.setFont("Satoshi", "bold");
        const lines = pdf.splitTextToSize(
          child.textContent.trim(),
          contentWidth
        );
        lines.forEach((line) => {
          checkPageOverflow();
          pdf.text(line, marginX, currentY);
          currentY += 8;
        });
      } else if (child.nodeName === "H2") {
        pdf.setFontSize(15);
        pdf.setFont("Satoshi", "bold");
        const lines = pdf.splitTextToSize(
          child.textContent.trim(),
          contentWidth
        );
        lines.forEach((line) => {
          checkPageOverflow();
          pdf.text(line, marginX, currentY);
          currentY += 8;
        });
      } else if (child.nodeName === "P") {
        pdf.setFontSize(14);
        let textContent = "";
        let textStyles = []; // Stores individual word styles

        // Process child nodes (which can be text or elements like <strong> or <em>)
        child.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            // Regular text
            const words = node.textContent.split(/(\s+)/); // Split by words and spaces
            words.forEach((word) => {
              textContent += word;
              textStyles.push({
                text: word,
                bold: false,
                italic: false,
              });
            });
          } else if (node.nodeName === "STRONG") {
            // Strong/bold text
            const words = node.textContent.split(/(\s+)/); // Split by words and spaces
            words.forEach((word) => {
              textContent += word;
              textStyles.push({
                text: word,
                bold: true,
                italic: false,
              });
            });
          } else if (node.nodeName === "EM") {
            // Italic text
            node.childNodes.forEach((emNode) => {
              if (emNode.nodeType === Node.TEXT_NODE) {
                const words = emNode.textContent.split(/(\s+)/); // Split by words and spaces
                words.forEach((word) => {
                  textContent += word;
                  textStyles.push({
                    text: word,
                    bold: false,
                    italic: true,
                  });
                });
              } else if (emNode.nodeName === "STRONG") {
                // Bold and Italic text (e.g., <em><strong>)
                const words = emNode.textContent.split(/(\s+)/); // Split by words and spaces
                words.forEach((word) => {
                  textContent += word;
                  textStyles.push({
                    text: word,
                    bold: true,
                    italic: true,
                  });
                });
              }
            });
          }
        });

        // Split the full text into lines
        const lines = pdf.splitTextToSize(textContent.trim(), contentWidth);

        // Process each line and apply styles
        lines.forEach((line) => {
          checkPageOverflow();
          let currentX = marginX; // Track X position

          // Handle word by word styling
          line.split(/(\s+)/).forEach((word) => {
            // Split by words and spaces
            const style = textStyles.find(
              (style) => style.text.trim() === word.trim()
            ); // Match words and spaces

            if (style) {
              if (style.bold && style.italic) {
                pdf.setFont("Satoshi", "bolditalic");
              } else if (style.bold) {
                pdf.setFont("Satoshi", "bold");
              } else if (style.italic) {
                pdf.setFont("Satoshi", "italic");
              } else {
                pdf.setFont("Satoshi", "normal");
              }
            } else {
              pdf.setFont("Satoshi", "normal");
            }

            // Print word without breaking the line
            pdf.text(word, currentX, currentY);
            currentX += pdf.getTextWidth(word); // Keep the space after the word
          });

          currentY += 7; // Move Y position for the next line
        });
      } else if (child.nodeName === "UL" || child.nodeName === "OL") {
        child.childNodes.forEach((li, index) => {
          if (li.nodeName === "LI") {
            pdf.setFontSize(14);
            let textContent = "";
            let textStyles = [];

            // Process child nodes within the list item
            li.childNodes.forEach((node) => {
              if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.split(/(\s+)/); // Split by words and spaces
                words.forEach((word) => {
                  textContent += word;
                  textStyles.push({
                    text: word,
                    bold: false,
                    italic: false,
                  });
                });
              } else if (node.nodeName === "STRONG") {
                const words = node.textContent.split(/(\s+)/); // Split by words and spaces
                words.forEach((word) => {
                  textContent += word;
                  textStyles.push({
                    text: word,
                    bold: true,
                    italic: false,
                  });
                });
              } else if (node.nodeName === "EM") {
                // Italic text
                node.childNodes.forEach((emNode) => {
                  if (emNode.nodeType === Node.TEXT_NODE) {
                    const words = emNode.textContent.split(/(\s+)/); // Split by words and spaces
                    words.forEach((word) => {
                      textContent += word;
                      textStyles.push({
                        text: word,
                        bold: false,
                        italic: true,
                      });
                    });
                  } else if (emNode.nodeName === "STRONG") {
                    // Bold and Italic text (e.g., <em><strong>)
                    const words = emNode.textContent.split(/(\s+)/); // Split by words and spaces
                    words.forEach((word) => {
                      textContent += word;
                      textStyles.push({
                        text: word,
                        bold: true,
                        italic: true,
                      });
                    });
                  }
                });
              }
            });

            // Handle bullet points or numbering for lists
            let listItemPrefix =
              child.nodeName === "UL" ? `• ` : `${index + 1}. `;
            const listItemContent = listItemPrefix + textContent.trim();

            // Split the text content into lines
            const lines = pdf.splitTextToSize(listItemContent, contentWidth);

            // Process each line and apply styles
            lines.forEach((line) => {
              checkPageOverflow();
              let currentX = marginX; // Track X position

              line.split(/(\s+)/).forEach((word) => {
                // Split by words and spaces
                const style = textStyles.find(
                  (style) => style.text.trim() === word.trim()
                ); // Match words and spaces

                if (style) {
                  if (style.bold && style.italic) {
                    pdf.setFont("Satoshi", "bolditalic");
                  } else if (style.bold) {
                    pdf.setFont("Satoshi", "bold");
                  } else if (style.italic) {
                    pdf.setFont("Satoshi", "italic");
                  } else {
                    pdf.setFont("Satoshi", "normal");
                  }
                } else {
                  pdf.setFont("Satoshi", "normal");
                }

                // Print word
                pdf.text(word, currentX, currentY);
                currentX += pdf.getTextWidth(word);
              });

              currentY += 7; // Move Y position after each line
            });
          }
        });
      }
    });

    currentY += 30;
    let header = "Legal Ease";
    if (currentY + 20 > pageHeight - marginY) {
      pdf.addPage();
      currentY = marginY;
      pdf.text(header, marginX, currentY); // Add header again on new page
      currentY += 10;
    }

    // Add User Details
    pdf.setFontSize(14);
    pdf.setFont("Satoshi", "bold");
    pdf.text("User Details", marginX, currentY);
    currentY += 7;

    pdf.setFontSize(12);
    pdf.setFont("Satoshi", "normal");
    const userName = `name: ${localStorage.getItem(
      "firstname"
    )} ${localStorage.getItem("lastname")}`;
    const userLines = pdf.splitTextToSize(userName, contentWidth);
    userLines.forEach((line) => {
      pdf.text(line, marginX, currentY);
      currentY += 6;
    });

    const userUsername = `username: @ ${localStorage.getItem("username")}`;
    const usernameLines = pdf.splitTextToSize(userUsername, contentWidth);
    usernameLines.forEach((line) => {
      pdf.text(line, marginX, currentY);
      currentY += 6;
    });

    const userEmail = `email: ${localStorage.getItem("email")}`;
    const emailLines = pdf.splitTextToSize(userEmail, contentWidth);
    emailLines.forEach((line) => {
      pdf.text(line, marginX, currentY);
      currentY += 6;
    });

    const userPhone = `phone: ${localStorage.getItem("phone")}`;
    const phoneLines = pdf.splitTextToSize(userPhone, contentWidth);
    phoneLines.forEach((line) => {
      pdf.text(line, marginX, currentY);
      currentY += 6;
    });

    currentY += 10;
    if (currentY + 20 > pageHeight - marginY) {
      pdf.addPage();
      currentY = marginY;
      pdf.text(header, marginX, currentY); // Add header again on new page
      currentY += 10;
    }

    // Add Lawyer's Name
    pdf.setFontSize(14);
    pdf.setFont("Satoshi", "bold");
    pdf.text("Lawyer Details", marginX, currentY);
    currentY += 7;

    pdf.setFontSize(12);
    pdf.setFont("Satoshi", "normal");
    const lawyerName = `name: ${lawyerData.first_name} ${lawyerData.last_name}`;
    const lawyerLines = pdf.splitTextToSize(lawyerName, contentWidth);
    lawyerLines.forEach((line) => {
      pdf.text(line, marginX, currentY);
      currentY += 6;
    });

    const lawyerUsername = `username: @${lawyerData.username}`;
    const lawyerUsernameLines = pdf.splitTextToSize(
      lawyerUsername,
      contentWidth
    );
    lawyerUsernameLines.forEach((line) => {
      pdf.text(line, marginX, currentY);
      currentY += 6;
    });

    const lawyerEmail = `email: ${lawyerData.email}`;
    const lawyerEmailLines = pdf.splitTextToSize(lawyerEmail, contentWidth);
    lawyerEmailLines.forEach((line) => {
      pdf.text(line, marginX, currentY);
      currentY += 6;
    });

    const lawyerPhone = `phone: ${lawyerData.phone}`;
    const lawyerPhoneLines = pdf.splitTextToSize(lawyerPhone, contentWidth);
    lawyerPhoneLines.forEach((line) => {
      pdf.text(line, marginX, currentY);
      currentY += 6;
    });

    // Add footer to each page
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(`Page ${i} of ${totalPages}`, marginX, pageHeight - marginY);
      addPlaceholder(pdf);
    }
    const pdfOutput = pdf.output("blob"); // Get the PDF as a Blob
    const reader = new FileReader();
    reader.readAsDataURL(pdfOutput); // Read the Blob as a data URL
    reader.onloadend = async () => {
      const pdfDataUrl = reader.result; // This is your PDF content as a base64 data URL
      console.log(pdfDataUrl);
      // pdf.text(pdfDataUrl, 10, 10); // Adjust the coordinates as needed

      const createDocumentt = await createDocument(
        {
          template: template.id,
          selected_lawyer: lawyerData.id,
          base64_content: "pdfDataUrl",
          title: "template",
          content,
        },
        setLoading
      );
      if (createDocumentt.status == 201) {
        setDocumentId(createDocumentt.data.id);
        console.log(createDocumentt.data, "createDocument.data.id");
        notify("Template added successfully", "success");
        pdf.save("template-preview.pdf");
        setDocumentDownload(true);
        scrollToTop();
        // navigate("/your-documents");
      }
      // Now you can save it to the database or send it via email
    };
  };
  return (
    <div className="flex flex-col items-start py-24 pt-32 w-full px-4 sm:px-8 md:px-24">
      {!documentData?.template ? (
        <div className="flex flex-col items-center w-full  ">
          <h2>No Template Selected.</h2>
          <NavLink
            to={"/templates"}
            className={`mt-4 px-4 py-2  bg-gray-600 text-white font-semibold rounded-md
`}
          >
            Select Template
          </NavLink>
        </div>
      ) : (
        <>
          <h1 className="w-full text-center">
            {documentDownloaded ? "Upload Document" : "Document Details"}
          </h1>

          {!documentDownloaded && (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 w-full mt-4 md:gap-x-6 ${
                documentDownloaded ? "hidden" : ""
              }`}
            >
              <div className="flex flex-col items-start  w-full col-span-1   bg-white py-8 px-4  list-disc list-outside ">
                <h1 className="text-2xl font-bold text-black mb-4 text-center w-full">
                  {documentData.template.name}
                </h1>
                <div
                  className=" list-disc list-outside"
                  dangerouslySetInnerHTML={{
                    __html: documentData.content,
                  }}
                />
              </div>
              <div className="flex flex-col items-start w-full col-span-1 py-8  px-4 ">
                <h1 className="text-2xl font-bold dark:text-white text-black">
                  Hired Lawyer
                </h1>

                <div className="flex flex-row items-center w-full justify-start mt-4">
                  <img
                    className="w-14 h-14 object-cover rounded-full"
                    src={
                      lawyerData.profile_pic
                        ? lawyerData.profile_pic
                        : "/lawyer.svg"
                    }
                    alt="Lawyer"
                  />
                  <div className="flex flex-col items-start ml-2">
                    <h2 className="font-bold dark:text-zinc-400 text-lg text-black">
                      {`${lawyerData.first_name} ${lawyerData.last_name}`}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!documentDownloaded && (
            <div className="flex flex-col items-center w-full">
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  generatePDF();
                  setPdfGenerated(true);
                }}
                className="min-w-[200px] mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                {loading ? <Loader /> : "Generate PDF"}
              </button>
            </div>
          )}
          {documentDownloaded && (
            <div className="flex flex-col items-center w-full">
              <VerifyDocumentPage id={documentId} />
            </div>
          )}
          {/* {pdfGenerated && (
      <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
    )} */}
          <Toaster />
        </>
      )}
    </div>
  );
};

export default FinalizeTemplate;
