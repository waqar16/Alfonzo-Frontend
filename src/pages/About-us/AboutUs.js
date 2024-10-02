import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLightbulb, 
  faAward, 
  faUsers, 
  faHandshake, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

const teamMembers = [
  { name: "John Doe", role: "CEO & Founder", image: "/placeholder.svg?height=300&width=300" },
  { name: "Jane Smith", role: "CTO", image: "/placeholder.svg?height=300&width=300" },
  { name: "Mike Johnson", role: "Lead Designer", image: "/placeholder.svg?height=300&width=300" },
  { name: "Sarah Brown", role: "Marketing Director", image: "/placeholder.svg?height=300&width=300" },
]

const companyValues = [
  { title: "Innovation", description: "We constantly push the boundaries of what's possible.", icon: faLightbulb },
  { title: "Quality", description: "We never compromise on the quality of our products and services.", icon: faAward },
  { title: "Customer-Centric", description: "Our customers are at the heart of everything we do.", icon: faUsers },
  { title: "Integrity", description: "We uphold the highest standards of honesty and ethics in all our dealings.", icon: faHandshake },
]

const companyStats = [
  { label: "Years in Business", value: 10 },
  { label: "Clients Served", value: 500 },
  { label: "Team Members", value: 50 },
  { label: "Countries Reached", value: 30 },
]

export default function AboutUs() {
  return (
    <div className="w-full flex flex-col items-center mx-auto py-12 pt-24 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">  
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      
      <div className="w-11/12 mx-auto mb-12">
        <p className="text-lg text-center mb-6">
          We are a passionate team of innovators, dedicated to creating cutting-edge solutions that transform the way people interact with technology. Our mission is to make the digital world more accessible, efficient, and enjoyable for everyone.
        </p>
      </div>

      <h2 className="text-3xl font-semibold text-center mb-8">Our History</h2>
      <div className="w-11/12 mx-auto mb-12">
        <p className="text-lg mb-4">
          Founded in 2013, our company started as a small startup with a big vision. Over the years, we've grown from a team of 5 passionate individuals to a global organization of over 50 talented professionals.
        </p>
        <p className="text-lg mb-4">
          Our journey has been marked by continuous innovation, strategic partnerships, and a relentless focus on customer satisfaction. From our first product launch in 2014 to our latest cutting-edge solutions, we've always stayed true to our core mission of making technology work for people, not the other way around.
        </p>
      </div>

      <h2 className="text-3xl font-semibold text-center mb-8">Our Values</h2>
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {companyValues.map((value, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
            <FontAwesomeIcon icon={value.icon} className="text-4xl mb-4 text-[#00A8E8]"  />
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold text-center mb-8">Our Impact</h2>
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {companyStats.map((stat, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className=" bg-[#00A8E8] h-2.5 rounded-full w-3/4"   ></div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold text-center mb-8">Our Mission</h2>
      <div className="w-11/12 mx-auto mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg italic">
            "To empower individuals and businesses through innovative technology solutions, fostering a world where digital interactions are seamless, secure, and accessible to all."
          </p>
        </div>
      </div>
    </div>
  )
}