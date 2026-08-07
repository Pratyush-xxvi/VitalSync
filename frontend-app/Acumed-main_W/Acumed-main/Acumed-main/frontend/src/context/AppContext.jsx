import React, { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets"; // This line causes an error, so we use mock data below

// Updated doctors list with requested doctor names, specialties, Mohali addresses, and Rupee fees
const doctors = [
  {
    "_id": "1",
    "name": "Dr. Pratyush Prakash",
    "speciality": "General physician",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Pratyush",
    "experience": "12+ years",
    "degree": "MD",
    "about": "Dr. Pratyush Prakash provides comprehensive primary care for adults and families, focusing on preventive medicine and managing chronic conditions.",
    "fees": 500,
    "address": {
      "line1": "Phase 5, Sector 59",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "2",
    "name": "Dr. Harshini R",
    "speciality": "General physician",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Harshini",
    "experience": "8+ years",
    "degree": "MBBS",
    "about": "Dr. Harshini R is a dedicated general physician with a passion for holistic health and patient education.",
    "fees": 500,
    "address": {
      "line1": "Sector 62, City Center",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "3",
    "name": "Dr. Sreeja P",
    "speciality": "Gynecologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Sreeja",
    "experience": "15+ years",
    "degree": "MD, FACOG",
    "about": "Dr. Sreeja P is a board-certified gynecologist specializing in women's health, prenatal care, and reproductive health.",
    "fees": 700,
    "address": {
      "line1": "Phase 7, Healthcare Hub",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "4",
    "name": "Dr. Mishika Goyal",
    "speciality": "Gynecologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Mishika",
    "experience": "10+ years",
    "degree": "MS",
    "about": "Dr. Mishika Goyal is committed to providing personalized and compassionate care for women's reproductive wellness.",
    "fees": 700,
    "address": {
      "line1": "Sector 70, Medical Park",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "5",
    "name": "Dr. Suraj",
    "speciality": "Dermatologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Suraj",
    "experience": "12+ years",
    "degree": "MD",
    "about": "Dr. Suraj is a renowned dermatologist with extensive experience in clinical skin treatment, anti-aging, and aesthetic skin care.",
    "fees": 600,
    "address": {
      "line1": "Phase 3B2, Main Market",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "6",
    "name": "Dr. Krishna",
    "speciality": "Dermatologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Krishna",
    "experience": "9+ years",
    "degree": "MD, FAAD",
    "about": "Dr. Krishna specializes in dermatological surgery, complex skin condition management, and pediatric skin care.",
    "fees": 600,
    "address": {
      "line1": "Sector 68, Specialty Clinic",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "7",
    "name": "Dr. Tushar Kumar",
    "speciality": "Pediatricians",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Tushar",
    "experience": "14+ years",
    "degree": "MD, FAAP",
    "about": "Dr. Tushar Kumar is a dedicated pediatrician providing top-tier healthcare for infants, toddlers, and teenagers.",
    "fees": 550,
    "address": {
      "line1": "Phase 11, Children Hospital",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "8",
    "name": "Dr. Utkarsh Singh",
    "speciality": "Pediatricians",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Utkarsh",
    "experience": "10+ years",
    "degree": "MD",
    "about": "Dr. Utkarsh Singh is known for his friendly approach with children and expertise in pediatric preventive health.",
    "fees": 550,
    "address": {
      "line1": "Sector 67, Child Care Wing",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "9",
    "name": "Dr. Swayam Kumar",
    "speciality": "Neurologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Swayam",
    "experience": "16+ years",
    "degree": "MD, DM",
    "about": "Dr. Swayam Kumar is an expert neurologist specializing in stroke intervention, epilepsy, and brain health management.",
    "fees": 1000,
    "address": {
      "line1": "Sector 69, Neuro Care Tower",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "10",
    "name": "Dr. Sneh Prakash",
    "speciality": "Neurologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Sneh",
    "experience": "11+ years",
    "degree": "MD, PhD",
    "about": "Dr. Sneh Prakash specializes in neuro-rehabilitation, movement disorders, and advanced spine and brain diagnostics.",
    "fees": 1000,
    "address": {
      "line1": "Phase 8B, Tech Zone",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "11",
    "name": "Dr. Aftab Siddiqui",
    "speciality": "Gastroenterologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Aftab",
    "experience": "14+ years",
    "degree": "MD, DM",
    "about": "Dr. Aftab Siddiqui is a premier gastroenterologist expert in endoscopic procedures, liver care, and digestive health.",
    "fees": 800,
    "address": {
      "line1": "Sector 71, Gastro Care",
      "line2": "Mohali, Punjab, India"
    }
  },
  {
    "_id": "12",
    "name": "Dr. Adeeb Ainul",
    "speciality": "Gastroenterologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Adeeb",
    "experience": "10+ years",
    "degree": "MD, AGAF",
    "about": "Dr. Adeeb Ainul offers comprehensive diagnosis and modern treatment plans for stomach, intestinal, and liver health.",
    "fees": 800,
    "address": {
      "line1": "Phase 9, Super Specialty Hospital",
      "line2": "Mohali, Punjab, India"
    }
  }
];


export const AppContext = createContext(null);

const AppContextProvider = (props) => {
    const currencySymbol = '₹';
    
    // --- THIS IS THE NEW, CORRECTED LOGIC ---
    // We keep your token logic
    const [token, setToken] = useState(localStorage.getItem("token"));
    
    // We add the new user and setUser state
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    // ------------------------------------------

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            // If token is removed (logout), remove user and token
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [token]);

    // This value object is now complete and includes user/setUser
    const value = {
        doctors, // Using your original import
        currencySymbol,
        token,
        setToken,
        user,    // We now provide the user to the app
        setUser  // We now provide setUser to the app (for Login.jsx)
    };
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;

