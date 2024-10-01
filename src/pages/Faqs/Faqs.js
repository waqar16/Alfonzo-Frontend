import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const faqData = [
  {
    question: "How this theme is different from others in market?",
    answer: "Our theme offers unique features and a modern design that sets it apart from others in the market."
  },
  {
    question: "Does this theme supports plugins?",
    answer: "Yes, our theme supports a wide range of plugins to extend its functionality."
  },
  {
    question: "Do you provide any moneyback guarantee in this product?",
    answer: "We offer a 30-day money-back guarantee if you're not satisfied with our product."
  },
  {
    question: "What payment method do you support?",
    answer: "We support various payment methods including credit cards, PayPal, and bank transfers."
  },
  {
    question: "Will I get money back if I am not satisfied?",
    answer: "Yes, we offer a full refund within 30 days if you're not satisfied with our product."
  },
  {
    question: "How do you provide support?",
    answer: "We provide support through email, live chat, and a comprehensive knowledge base."
  }
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
     <div className="max-w-3xl mx-auto py-12 pt-24 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">  

      <h2 className="text-3xl font-bold text-center mb-2">Frequently asked questions</h2>
      <p className="text-center text-muted-foreground mb-8">
        Ask everything you need to know about our products and services.
      </p>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <FontAwesomeIcon
                icon={activeIndex === index ? faMinus : faPlus}
                className="text-gray-600"
              />
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-gray-50">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center mt-12 space-x-4">
        {[1, 2, 3].map((i) => (
          <img
            key={i}
            src={`/placeholder.svg?height=40&width=40`}
            alt={`Profile ${i}`}
            className="rounded-full w-10 h-10"
          />
        ))}
      </div> */}
    </div>
  )
}