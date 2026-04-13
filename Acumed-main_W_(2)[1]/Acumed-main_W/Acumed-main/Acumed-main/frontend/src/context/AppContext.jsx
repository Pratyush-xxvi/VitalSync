import React, { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets"; // This line causes an error, so we use mock data below

// A new, larger mock data list that includes all your specialties
const doctors = [
  // General Physicians
  {
    "_id": "1",
    "name": "Dr. Sarah Johnson",
    "speciality": "General physician",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Johnson",
    "experience": "12+ years",
    "degree": "MD",
    "about": "Dr. Johnson provides comprehensive primary care for adults and families, focusing on preventive medicine and managing chronic conditions.",
    "fees": 110
  },
  {
    "_id": "2",
    "name": "Dr. Michael Lee",
    "speciality": "General physician",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Lee",
    "experience": "8+ years",
    "degree": "MD",
    "about": "Dr. Lee is a dedicated general physician with a passion for holistic health and patient education. He is known for his thorough and compassionate approach.",
    "fees": 100
  },
  // Gynecologists
  {
    "_id": "3",
    "name": "Dr. Emily Chen",
    "speciality": "Gynecologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Chen",
    "experience": "15+ years",
    "degree": "MD, FACOG",
    "about": "Dr. Chen is a board-certified gynecologist specializing in women's health, from adolescence through menopause. She offers a full range of gynecological services.",
    "fees": 160
  },
  {
    "_id": "4",
    "name": "Dr. Maria Rodriguez",
    "speciality": "Gynecologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Rodriguez",
    "experience": "10+ years",
    "degree": "MD",
    "about": "Dr. Rodriguez is committed to providing personalized and compassionate care for women's reproductive health, including prenatal care and minimally invasive surgery.",
    "fees": 150
  },
  // Dermatologists
  {
    "_id": "5",
    "name": "Dr. Robert Brown",
    "speciality": "Dermatologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Brown",
    "experience": "12+ years",
    "degree": "MD",
    "about": "Dr. Robert Brown is a board-certified dermatologist with extensive experience in both medical and cosmetic dermatology. He helps patients achieve healthy, beautiful skin.",
    "fees": 120
  },
  {
    "_id": "6",
    "name": "Dr. Linda Kim",
    "speciality": "Dermatologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Kim",
    "experience": "9+ years",
    "degree": "MD, FAAD",
    "about": "Dr. Kim specializes in pediatric dermatology and complex skin conditions. She is known for her meticulous approach and excellent patient outcomes.",
    "fees": 130
  },
  // Pediatricians
  {
    "_id": "7",
    "name": "Dr. David Patel",
    "speciality": "Pediatricians",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Patel",
    "experience": "18+ years",
    "degree": "MD, FAAP",
    "about": "Dr. Patel is a highly-regarded pediatrician dedicated to the health and well-being of children from birth through adolescence. He has a friendly and gentle demeanor.",
    "fees": 125
  },
  {
    "_id": "8",
    "name": "Dr. Laura White",
    "speciality": "Pediatricians",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+White",
    "experience": "10+ years",
    "degree": "MD",
    "about": "Dr. White provides comprehensive care for infants, children, and adolescents. She believes in building a strong, trusting relationship with families.",
    "fees": 115
  },
  // Neurologists
  {
    "_id": "9",
    "name": "Dr. Emily White",
    "speciality": "Neurologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Emily+White",
    "experience": "15+ years",
    "degree": "MD, PhD",
    "about": "Dr. Emily White is a highly respected neurologist, focusing on complex neurological disorders. She is dedicated to advancing the field through research and patient care.",
    "fees": 200
  },
  {
    "_id": "10",
    "name": "Dr. James Wilson",
    "speciality": "Neurologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Wilson",
    "experience": "11+ years",
    "degree": "MD",
    "about": "Dr. Wilson specializes in treating headaches, epilepsy, and movement disorders. He is known for his detailed diagnostic skills and personalized treatment plans.",
    "fees": 180
  },
  // Gastroenterologists
  {
    "_id": "11",
    "name": "Dr. Kevin Chang",
    "speciality": "Gastroenterologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Chang",
    "experience": "14+ years",
    "degree": "MD, AGAF",
    "about": "Dr. Chang is a leading expert in digestive health, specializing in conditions like IBS, Crohn's disease, and preventative cancer screenings.",
    "fees": 170
  },
  {
    "_id": "12",
    "name": "Dr. Susan Gupta",
    "speciality": "Gastroenterologist",
    "image": "https://placehold.co/200x200/3b82f6/white?text=Dr.+Gupta",
    "experience": "10+ years",
    "degree": "MD",
    "about": "Dr. Gupta focuses on liver diseases and general gastroenterology. She is a compassionate physician who prioritizes patient comfort and understanding.",
    "fees": 165
  }
];


export const AppContext = createContext(null);

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    
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

