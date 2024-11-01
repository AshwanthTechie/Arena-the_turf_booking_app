import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTurfById } from "../home/recent/TurfService"; // Service to fetch turf by ID
import Rating from '@mui/material/Rating';
import {
  Loader,
  MapPin,
  Phone,
  Mail,
  Clock,
  Swords,
  Star,
  CheckCircle,
  Image
} from "lucide-react";
import './TurfDetail.css';
import { MyContext } from "../context/MyContext";



const TurfDetail = () => {

  
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  
  
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [turf, setTurf] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const { loginStatus, setLoginStatus } = useContext(MyContext); 
  
  const panoramaRef = useRef(null);

  useEffect(() => {
    const loadTurf = async () => {
      const turfData = await fetchTurfById(id);
      setTurf(turfData);
    };
    loadTurf();
  }, [id]);

  useEffect(() => {
    if (activeTab === "360" && window.pannellum && panoramaRef.current) {
      try {
        console.log("Initializing Pannellum...");
        window.pannellum.viewer(panoramaRef.current, {
          type: 'equirectangular',
          panorama: 'https://pannellum.org/images/alma.jpg', 
          autoLoad: true,
        });
      } catch (error) {
        console.error('Pannellum initialization error:', error);
      }
    }
  }, [activeTab]);

  const handleBookNow = () => {
    // Navigate to the booking page with the turf ID
    if(loginStatus===true)
    navigate(`/booknow/${id}`);
    else
    alert('login to continue');
  };

  if (!turf) {
    return (
      <div className="turf-detail-flex-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  

  return (
    <div className="turf-detail-container">
      
      <h1 className="turf-detail-header">
        {turf.name}
      </h1>
      <p className="turf-detail-description">{turf.description}</p>
      <div className="turf-detail-flex-container container">
        <div className="turf-detail-image-container">
          <img
            src={turf.profilePic}
            alt={turf.name}
            className="turf-detail-image"
          />
          
          <div className="turf-detail-button-container">
            {[
              { tab: "details", icon: <CheckCircle />, label: "Details" },
              { tab: "services", icon: <CheckCircle />, label: "Services" },
              { tab: "photos", icon: <Image />, label: "Photos" },
              { tab: "360", icon: <Image />, label: "360° View" },
            ].map(({ tab, icon, label }) => (
              <button
                key={tab}
                className={`turf-detail-button ${activeTab === tab ? "turf-detail-button-active" : "turf-detail-button-inactive"}`}
                onClick={() => setActiveTab(tab)}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="turf-detail-content">
          {activeTab === "details" && (
            <div className="turf-detail-tab-content">
              <div className="turf-detail-item">
                <MapPin /> <strong>Address:</strong>{" "}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(turf.address)}`} target="_blank" rel="noopener noreferrer">
                  <span className="truncate">{turf.address}</span>
                </a>
              </div>
              <div className="turf-detail-item">
                <Phone /> <strong>Phone:</strong>{" "}
                <a href={`tel:${turf.phone}`} className="truncate turf-detail-phone-link">{turf.phone}</a>
              </div>
              <div className="turf-detail-item">
                <Mail /> <strong>Email:</strong>{" "}
                <a href={`mailto:${turf.email}`} className="truncate turf-detail-email-link">{turf.email}</a>
              </div>
              <div className="turf-detail-item">
                <Clock /> <strong>Timings:</strong>{" "}
                <span className="truncate">{turf.timings}</span>
              </div>
              <div className="turf-detail-item">
                <Swords /> <strong>Sports:</strong>{" "}
                <span className="truncate">
                {turf.type.map((type, index) => (
                  <React.Fragment key={index}>
                  {type}
                  {index < turf.type.length - 1 && ' • '}
                  </React.Fragment>
                ))}
                  </span>
              </div>
              <div className="turf-detail-item">
                <Star /> <strong>Ratings:</strong>{" "}
                <Rating name="half-rating-read" defaultValue={turf.ratings} precision={0.05} readOnly />
              </div>
             
              <button 
                className="book-now-button"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          )}
          {activeTab === "services" && (
            <div className="turf-detail-services">
              <h2 className="turf-detail-services-title">Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {turf.services.map((service, index) => (
                  <div
                    key={index}
                    className="turf-detail-service-item"
                  >
                    <CheckCircle className="text-green-500 mr-2" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
              <button 
                className="book-now-button"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          )}
          {activeTab === "photos" && (
            <div className="turf-detail-photos">
              <h2 className="turf-detail-photos-title">Photos</h2>
              <div className="turf-detail-photos-container">
                {turf.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Turf ${index + 1}`}
                    className="turf-detail-photo"
                  />
                ))}
              </div>
              <button 
                className="book-now-button"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          )}
          {activeTab === "360" && (
                  <div ref={panoramaRef} style={{ width: '100%', height: '500px' }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurfDetail;

































// pitch: 10,
// yaw: 180,
// hfov: 110,