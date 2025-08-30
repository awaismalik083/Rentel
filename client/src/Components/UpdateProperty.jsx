import React, { useState, useEffect } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import DashNavbar from "../Dashboard/DashNavbar";
import DashSidebar from "../Dashboard/DashSidebar";

const UpdateProperty = () => {
  const [removedImages, setRemovedImages] = useState([]);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const [initialState, setInitialState] = useState(false);

  // All state declarations at the top

  const [openTab, setOpenTab] = useState(1);

  // Dropdown states
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  // Show/hide states
  const [hide, setHide] = useState(true);
  const [hide1, setHide1] = useState(true);
  const [hide2, setHide2] = useState(false);
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);

  // Form states
  const [PropertyType, setPropertyType] = useState("Home");
  const [PropertyTypetype, setPropertyTypetype] = useState("Houses");
  const [City, setCity] = useState("Bahawalpur");
  const [Location, setLocation] = useState("");
  const [Town, setTown] = useState("");
  const [Street, setStreet] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [SelectPurpose, setSelectPurpose] = useState("Buy");
  const [Price, setPrice] = useState("");
  const [AreaSize, setAreaSize] = useState("");
  const [MonthlyRent, setMonthlyRent] = useState("");
  const [Installmentavailable, setInstallmentavailable] = useState(false);
  const [Addadditionalfeatures, setAddadditionalfeatures] = useState("");
  const [Marla, setMarla] = useState("Marla");

  const [Title, setTitle] = useState("");
  const [Discription, setDiscription] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber1, setPhoneNumber1] = useState("");
  const [PhoneNumber2, setPhoneNumber2] = useState("");
  const [WhatsappNumber, setWhatsappNumber] = useState("");
  const [images, setImages] = useState([]);
  const [file, setFile] = useState([]);
  const [errors, setErrors] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideo, setExistingVideo] = useState("");

  const PropertyId = localStorage.getItem("propertyId");
  console.log("this is th property id in update ", PropertyId);
  // Updated remove functions
  const removeExistingImage = (index) => {
    const updatedImages = [...existingImages];
    const removedImg = updatedImages.splice(index, 1)[0];
    setExistingImages(updatedImages);
    setRemovedImages([...removedImages, removedImg]);
  };

  const removeExistingVideo = () => {
    setExistingVideo("");
    setFile([]); // Clear any new video that might have been selected
  };

  // Fetch property data on component mount
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:3000/api/property/getproperty/${PropertyId}`
        );
        const property = response.data.property;
        setInitialState(property);

        // Set all the form fields with the fetched data
        setPropertyType(property.Property_Type || "Home");
        setPropertyTypetype(property.Home_Type || "Houses");
        setCity(property.City || "Bahawalpur");
        setLocation(property.Location || "");
        setTown(property.Town || "");
        setStreet(property.Street || "");
        setBed(property.Bed || "");
        setBath(property.Bath || "");
        setSelectPurpose(property.Purpose || "Buy");
        setPrice(property.price || "");
        setMonthlyRent(property.monthlyRent || "");
        setAreaSize(property.Area_Size || "");
        setMarla(property.Area_Unit || "Marla");
        setInstallmentavailable(property.Installment_Available || false);
        setAddadditionalfeatures(property.Additional_Features || "");
        setTitle(property.Title || "");
        setDiscription(property.Description || "");
        setEmail(property.Email || "");
        setPhoneNumber1(property.Phone_Number_1 || "");
        setPhoneNumber2(property.Phone_Number_2 || "");
        setWhatsappNumber(property.Whatsapp_Number || "");
        setExistingImages(property.Images || []);

        setExistingVideo(property.Video || "");

        // Set appropriate show/hide states based on property type
        if (property.Property_Type === "Home") {
          setShow(true);
          setHide(true);
        } else if (property.Property_Type === "Commercial") {
          setShow1(true);
          setHide(false);
        } else if (property.Property_Type === "Land & Plots") {
          setShow2(true);
          setHide(false);
        }

        if (property.Purpose === "Buy") {
          setHide1(true);
          setHide2(false);
        } else if (property.Purpose === "Rent") {
          setHide1(false);
          setHide2(true);
        }
      } catch (error) {
        toast.error("Failed to fetch property data");
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [PropertyId]);

  useEffect(() => {
    if (!initialState) return;

    const currentData = {
      Property_Type: PropertyType,
      Home_Type: PropertyTypetype,
      City: City,
      Location: Location,
      Town: Town,
      Street: Street,
      Bed: bed,
      Bath: bath,
      Purpose: SelectPurpose,
      price: Price,
      monthlyRent: MonthlyRent,
      Area_Size: AreaSize,
      Area_Unit: Marla,
      Installment_Available: Installmentavailable,
      Additional_Features: Addadditionalfeatures,
      Title: Title,
      Description: Discription,
      Email: Email,
      Phone_Number_1: PhoneNumber1,
      Phone_Number_2: PhoneNumber2,
      Whatsapp_Number: WhatsappNumber,
      Images: existingImages,
      Video: existingVideo,
    };

    // Stringify both objects for deep comparison
    const isSame = JSON.stringify(currentData) === JSON.stringify(initialState);
    setIsFormChanged(!isSame);
  }, [
    PropertyType,
    PropertyTypetype,
    City,
    Location,
    Town,
    Street,
    bed,
    bath,
    SelectPurpose,
    Price,
    MonthlyRent,
    AreaSize,
    Marla,
    Installmentavailable,
    Addadditionalfeatures,
    Title,
    Discription,
    Email,
    PhoneNumber1,
    PhoneNumber2,
    WhatsappNumber,
    existingImages,
    existingVideo,
    initialState,
  ]);

  const validateCurrentTab = () => {
    const newErrors = {};

    if (openTab === 3) {
      // For the contact info tab
      // Email validation
      if (!Email) {
        newErrors.Email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
        newErrors.Email = "Please enter a valid email address";
      }

      // Phone Number 1 validation
      if (!PhoneNumber1) {
        newErrors.PhoneNumber1 = "Primary phone number is required";
      } else if (!/^92\d{10}$/.test(PhoneNumber1)) {
        newErrors.PhoneNumber1 =
          "Phone number must be 12 digits starting with 92 (e.g., 923146551264)";
      }

      // Phone Number 2 validation (optional)
      if (PhoneNumber2 && !/^92\d{10}$/.test(PhoneNumber2)) {
        newErrors.PhoneNumber2 =
          "Phone number must be 12 digits starting with 92 (e.g., 923146551264)";
      }

      // WhatsApp Number validation (optional)
      if (WhatsappNumber && !/^92\d{10}$/.test(WhatsappNumber)) {
        newErrors.WhatsappNumber =
          "Phone number must be 12 digits starting with 92 (e.g., 923146551264)";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    return true; // For other tabs, allow proceeding by default
  };

  // Form submission handler
  const submitForm = async (e) => {
    e.preventDefault();

    if (!isFormChanged) {
      toast.error("No changes detected!");
      return;
    }

    try {
      const formData = new FormData();

      // Text fields
      formData.append("Property_Type", PropertyType);
      formData.append("Home_Type", PropertyTypetype);
      formData.append("City", City);
      formData.append("Location", Location);
      formData.append("Town", Town);
      formData.append("Street", Street);
      formData.append("Bed", bed);
      formData.append("Bath", bath);
      formData.append("Purpose", SelectPurpose);
      formData.append("price", Price);
      formData.append("monthlyRent", MonthlyRent);
      formData.append("Area_Size", AreaSize);
      formData.append("Area_Unit", Marla);
      formData.append("Installment_Available", Installmentavailable);
      formData.append("Additional_Features", Addadditionalfeatures);
      formData.append("Title", Title);
      formData.append("Description", Discription);
      formData.append("Email", Email);
      formData.append("Phone_Number_1", PhoneNumber1);
      formData.append("Phone_Number_2", PhoneNumber2);
      formData.append("Whatsapp_Number", WhatsappNumber);

      // Send removed images to backend
      formData.append("deletedImages", JSON.stringify(removedImages));

      // Send removed video if user deleted it
      if (!existingVideo) {
        formData.append("deletedVideos", JSON.stringify([existingVideo]));
      }

      // Append newly added images
      images.forEach((img) => {
        formData.append("Images", img);
      });

      // Append new video if selected
      if (file && file.length > 0) {
        formData.append("Video", file[0]);
      }

      const res = await axios.put(
        `http://localhost:3000/api/property/updateProperty/${PropertyId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success("Property updated successfully!");
        setIsFormChanged(false);
        setRemovedImages([]); // clear removed list
      } else {
        toast.error(res.data.message || "Update failed!");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Server error while updating property");
    }
  };

  // File drop handler
  // Dropdown toggle functions
  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  const toggleDropdown3 = () => setIsOpen3(!isOpen3);

  // Dropdown close handlers
  const closeDropdown = (value) => {
    if (value === "Home") {
      setShow(true);
      setPropertyTypetype("Houses");
      setHide(true);
    } else setShow(false);

    if (value === "Commercial") {
      setShow1(true);
      setPropertyTypetype("Office");
      setHide(false);
    } else setShow1(false);

    if (value === "Land & Plots") {
      setShow2(true);
      setPropertyTypetype("Residential Plot");
      setHide(false);
    } else setShow2(false);

    setIsOpen(false);
    setPropertyType(value);
  };

  const closeDropdown1 = (value) => {
    setIsOpen1(false);
    setPropertyTypetype(value);
  };

  const closeDropdown2 = (value) => {
    setIsOpen2(false);
    setCity(value);
  };

  const closeDropdown3 = (value) => {
    if (value === "Buy") {
      setHide1(true);
    } else setHide1(false);

    if (value === "Rent") {
      setHide2(true);
    } else setHide2(false);

    setIsOpen3(false);
    setSelectPurpose(value);
  };

  // Helper function to validate numeric input
  const validateNumericInput = (value) => {
    return value === "" || /^\d*$/.test(value);
  };

  // Helper function to validate phone number input
  const validatePhoneInput = (value) => {
    // Allow empty value or backspace
    if (value === "") return true;

    // Check if starts with 92 and only contains digits
    if (/^92\d{0,10}$/.test(value)) {
      return true;
    }

    return false;
  };

  // Function to remove existing image

  return (
    <>
      <DashNavbar />
      <DashSidebar />
      <div className=" m-auto bg-gray-50 flex  rounded-md  w-full h-full ">
        <div className=" w-[67rem] mt-10    lg:ml-[11rem] drop-shadow-2xl h-[40rem] rounded-xl">
          {/* Main Form Container */}
          <div className="grid gap-6 p-auto  m-auto md:m-[22px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex flex-wrap   justify-center gap-4 md:gap-20 sm:gap-20 lg:gap-20 py-4 w-full max-w-4xl mx-auto  rounded-xl  md:mt-[10px] bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 shadow-lg">
              {[1, 2, 3, 4].map((tab) => (
                <div
                  key={tab}
                  className={
                    openTab === tab
                      ? "text-red-600 underline underline-offset-8 text-base md:text-lg font-semibold cursor-pointer"
                      : "text-slate-600 text-base md:text-lg font-semibold cursor-pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(tab);
                  }}
                >
                  Step {tab}
                </div>
              ))}
            </div>
            <h1 className="text-2xl font-semibold mt-5 mb-5 md:text-3xl">
              Update Property
            </h1>
            {/* Tab 1 - Property Details */}
            <div className={openTab === 1 ? "block" : "hidden"}>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row justify-between gap-5">
                  <div className="grid w-full relative">
                    <label>Property Type</label>
                    <div
                      className="flex px-4 h-[52px] border rounded-md border-gray-400 font-medium gap-8 items-center justify-between cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      {PropertyType}
                      <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </div>
                    {isOpen && (
                      <div className="absolute w-full mt-1 z-10 p-3 shadow-lg border bg-white rounded-sm">
                        <ul>
                          {["Home", "Commercial", "Land & Plots"].map(
                            (item) => (
                              <li
                                key={item}
                                onClick={() => closeDropdown(item)}
                                className="px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2 w-full relative mt-4 md:mt-0">
                    <label>{PropertyType} Type</label>
                    <div
                      className="flex px-4 h-[52px] border rounded-md border-gray-400 font-medium gap-8 items-center justify-between cursor-pointer"
                      onClick={toggleDropdown1}
                    >
                      {PropertyTypetype}
                      <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </div>
                    {isOpen1 && (
                      <div className="absolute w-full z-10 bg-white rounded-sm shadow-lg border mt-1">
                        {show && (
                          <div className="p-3">
                            <ul>
                              {[
                                "Houses",
                                "Flat",
                                "Upper Portion",
                                "Lower Portion",
                                "Farm House",
                                "Room",
                                "Penthouse",
                              ].map((item) => (
                                <li
                                  key={item}
                                  onClick={() => closeDropdown1(item)}
                                  className="px-4 py-2 text-sm text-gray-700 bg-none hover:bg-gray-100 cursor-pointer"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {show1 && (
                          <div className="p-3">
                            <ul>
                              {[
                                "Office",
                                "Shop",
                                "Warehouse",
                                "Factory",
                                "Building",
                                "Other",
                              ].map((item) => (
                                <li
                                  key={item}
                                  onClick={() => closeDropdown1(item)}
                                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {show2 && (
                          <div className="p-3">
                            <ul>
                              {[
                                "Residential Plot",
                                "Commercial Plot",
                                "Agricultural Land",
                                "Industrial Land",
                                "Plot File",
                                "Plot Form",
                              ].map((item) => (
                                <li
                                  key={item}
                                  onClick={() => closeDropdown1(item)}
                                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                  <div className="relative grid gap-2 w-full">
                    <label>City</label>
                    <div
                      className="flex px-4 h-[52px] border rounded-md border-gray-400 font-medium gap-8 items-center justify-between cursor-pointer"
                      onClick={toggleDropdown2}
                    >
                      {City}
                      <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </div>
                    {isOpen2 && (
                      <div className="absolute w-full mt-1 p-2 shadow-lg border z-10 bg-white rounded-sm">
                        <input
                          required
                          type="text"
                          placeholder="Enter Locations"
                          className="text-sm hover:bg-gray-50 rounded-sm p-1 w-full outline-red-400"
                        />
                        <hr className="my-2" />
                        <ul>
                          {["Bahawalpur"].map((item) => (
                            <li
                              key={item}
                              onClick={() => closeDropdown2(item)}
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2 w-full mt-4 md:mt-0">
                    <label>Location</label>
                    <input
                      type="text"
                      className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                      placeholder="Enter location"
                      value={Location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                  <div className="grid gap-2 w-full">
                    <label>Town</label>
                    <input
                      type="text"
                      className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                      placeholder="Enter town"
                      value={Town}
                      onChange={(e) => setTown(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2 w-full mt-4 md:mt-0">
                    <label>Street</label>
                    <input
                      type="text"
                      className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                      placeholder="Enter street"
                      value={Street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="bg-red-500 hover:bg-red-600 cursor-pointer backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-3 text-white mt-4"
                  onClick={() => setOpenTab(2)}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Tab 2 - Property Features */}
            <div className={openTab === 2 ? "block" : "hidden"}>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                  <div className="grid gap-2 w-full relative">
                    <label>Select Purpose</label>
                    <div
                      className="flex px-4 h-[52px] border rounded-md border-gray-400 font-medium gap-8 items-center justify-between cursor-pointer"
                      onClick={toggleDropdown3}
                    >
                      {SelectPurpose}
                      <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </div>
                    {isOpen3 && (
                      <div className="absolute w-full mt-1 p-3 shadow-lg border z-10 bg-white rounded-sm">
                        <ul>
                          {["Buy", "Rent"].map((item) => (
                            <li
                              key={item}
                              onClick={() => closeDropdown3(item)}
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {hide1 && (
                    <div className="grid gap-2 w-full mt-4 md:mt-0">
                      <label>Price</label>
                      <div className="flex">
                        <input
                          required
                          type="text"
                          className="w-full p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                          value={Price}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (validateNumericInput(value)) {
                              setPrice(value);
                            }
                          }}
                          placeholder="Enter price"
                        />
                      </div>
                    </div>
                  )}

                  {hide2 && (
                    <div className="grid gap-2 w-full mt-4 md:mt-0">
                      <label>Monthly Rent</label>
                      <div className="flex">
                        <input
                          type="text"
                          className="w-full p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                          value={MonthlyRent}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (validateNumericInput(value)) {
                              setMonthlyRent(value);
                            }
                          }}
                          placeholder="Enter monthly rent"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {SelectPurpose == "Rent" && (
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="grid gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <FaBed />
                        <label>Bed</label>
                      </div>
                      <input
                        type="text"
                        className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                        value={bed}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (validateNumericInput(value)) {
                            setBed(value);
                          }
                        }}
                        placeholder="Enter number of beds"
                      />
                    </div>

                    <div className="grid gap-2 w-full mt-4 md:mt-0">
                      <div className="flex items-center gap-2">
                        <FaBath />
                        <label>Bath</label>
                      </div>
                      <input
                        type="text"
                        className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                        value={bath}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (validateNumericInput(value)) {
                            setBath(value);
                          }
                        }}
                        placeholder="Enter number of baths"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                  <div className="grid gap-2 w-full">
                    <label>Area Size</label>
                    <div className="flex">
                      <input
                        required
                        type="text"
                        className="w-full p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                        value={AreaSize}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (validateNumericInput(value)) {
                            setAreaSize(value);
                          }
                        }}
                        placeholder="Enter area size"
                      />
                      <select
                        className="p-3 border rounded-md border-gray-400 outline-rose-400"
                        onChange={(e) => setMarla(e.target.value)}
                        value={Marla}
                      >
                        {["Marla", "Feet", "Kanal", "Sq. Yd."].map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {hide1 ? (
                    <div className="flex flex-col md:flex-row gap-2 w-full justify-between items-center mt-4 md:mt-0">
                      <div className="grid gap-1">
                        <label className="text-lg md:text-xl font-semibold">
                          Installment available
                        </label>
                        <p className="text-gray-500 text-sm md:text-base">
                          Enable if listing is available on installments
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="p-2 w-6 h-6 border rounded-md border-gray-400 outline-rose-400 mt-2 md:mt-0"
                        checked={Installmentavailable}
                        onChange={(e) =>
                          setInstallmentavailable(e.target.checked)
                        }
                      />
                    </div>
                  ) : (
                    <div className="grid gap-2 w-full mt-4 md:mt-0">
                      <label>Add additional features</label>
                      <input
                        type="text"
                        className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                        value={Addadditionalfeatures}
                        onChange={(e) =>
                          setAddadditionalfeatures(e.target.value)
                        }
                        placeholder="Enter additional features"
                      />
                    </div>
                  )}
                </div>

                <button
                  className="bg-red-500 p-3 rounded-md text-white mt-4"
                  onClick={() => setOpenTab(3)}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Tab 3 - Description & Contact */}
            <div className={openTab === 3 ? "block" : "hidden"}>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="grid gap-2 w-full">
                    <label>Title</label>
                    <input
                      required
                      type="text"
                      className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                      value={Title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter property title"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                  {/* Email Field with Error */}
                  <div className="grid gap-2 w-full">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      className={`w-full p-2 text-lg border rounded-md ${
                        errors.Email ? "border-red-500" : "border-gray-400"
                      } outline-rose-400`}
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                    {errors.Email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.Email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number 1 Field with Error */}

                  {/* Phone Number 1 Field with Error - Fixed Version */}
                  <div className="grid gap-2 w-full">
                    <label>Phone Number 1</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        className={`w-full p-2 text-lg border rounded-md ${
                          errors.PhoneNumber1
                            ? "border-red-500"
                            : "border-gray-400"
                        } outline-rose-400`}
                        value={PhoneNumber1}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (validatePhoneInput(value)) {
                            setPhoneNumber1(value);
                          }
                        }}
                        placeholder="923146551264"
                        maxLength={12}
                      />
                      {errors.PhoneNumber1 && (
                        <p className="absolute text-red-500 text-xs mt-1">
                          {errors.PhoneNumber1}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                  {/* Phone Number 2 Field with Error */}
                  {/* Phone Number 2 Field with Error - Fixed Version */}
                  <div className="grid gap-2 w-full">
                    <label>Phone Number 2 (Optional)</label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full p-2 text-lg border rounded-md ${
                          errors.PhoneNumber2
                            ? "border-red-500"
                            : "border-gray-400"
                        } outline-rose-400`}
                        value={PhoneNumber2}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (validatePhoneInput(value)) {
                            setPhoneNumber2(value);
                          }
                        }}
                        placeholder="923146551264"
                        maxLength={12}
                      />
                      {errors.PhoneNumber2 && (
                        <p className="absolute text-red-500 text-xs mt-1">
                          {errors.PhoneNumber2}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Number Field with Error - Fixed Version */}
                  <div className="grid gap-2 w-full">
                    <label>WhatsApp Number (Optional)</label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full p-2 text-lg border rounded-md ${
                          errors.WhatsappNumber
                            ? "border-red-500"
                            : "border-gray-400"
                        } outline-rose-400`}
                        value={WhatsappNumber}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (validatePhoneInput(value)) {
                            setWhatsappNumber(value);
                          }
                        }}
                        placeholder="923146551264"
                        maxLength={12}
                      />
                      {errors.WhatsappNumber && (
                        <p className="absolute text-red-500 text-xs mt-1">
                          {errors.WhatsappNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Number Field with Error */}
                </div>

                <div className="grid w-full mt-4">
                  <label>Description</label>
                  <textarea
                    required
                    className="p-2 text-lg mt-3 border rounded-md border-gray-400 outline-rose-400 h-32"
                    value={Discription}
                    onChange={(e) => setDiscription(e.target.value)}
                    placeholder="Enter brief details about your property"
                  />
                </div>
                <button
                  className="bg-red-500 p-3 w-full mt-5 rounded-md text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    if (validateCurrentTab()) {
                      setOpenTab(4);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Tab 4 - Upload Images & Video */}
            <div className={openTab === 4 ? "block" : "hidden"}>
              <div className="grid gap-10">
                {/* Upload Images */}
                <div>
                  <label className="text-xl font-semibold">Upload Images</label>
                  <div className="mt-2 w-full h-40 border-2 border-dashed border-gray-300 flex items-center justify-center text-center rounded-md relative">
                    <p className="text-gray-500 text-base">
                      Click to upload images or drag and drop <br />
                      <span className="text-sm text-gray-400">
                        (Maximum 10 images, JPG/PNG format)
                      </span>
                    </p>
                    <input
                      type="file"
                      required
                      accept="image/png, image/jpeg"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        if (files.length <= 10) {
                          setImages(files);
                        } else {
                          alert("You can upload a maximum of 10 images.");
                        }
                      }}
                    />
                  </div>

                  {/* Existing Image Previews with Remove */}
                  {existingImages.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">
                        Existing Images
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {existingImages.map((img, index) => (
                          <div
                            key={`existing-${index}`}
                            className="relative group"
                          >
                            <img
                              src={`http://localhost:3000${img}`}
                              alt={`existing-preview-${index}`}
                              className="w-full h-32 object-cover rounded-md border"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="absolute top-1 right-1 bg-white bg-opacity-60 text-black rounded-full px-2 py-0.5 text-xs"
                            >
                              ❌
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Image Previews with Remove */}
                  {images.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">New Images</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                          <div key={`new-${index}`} className="relative group">
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`preview-${index}`}
                              className="w-full h-32 object-cover rounded-md border"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...images];
                                newImages.splice(index, 1);
                                setImages(newImages);
                              }}
                              className="absolute top-1 right-1 bg-white bg-opacity-60 text-black rounded-full px-2 py-0.5 text-xs"
                            >
                              ❌
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Video */}
                <div>
                  <label className="text-xl font-semibold">Upload Video</label>
                  <div className="mt-2 w-full h-40 border-2 border-dashed border-gray-300 flex items-center justify-center text-center rounded-md relative">
                    <p className="text-gray-500 text-base">
                      Click to upload video or drag and drop <br />
                      <span className="text-sm text-gray-400">
                        (MP4 format, max 50MB)
                      </span>
                    </p>
                    <input
                      type="file"
                      accept="video/mp4"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (
                          selectedFile &&
                          selectedFile.size <= 50 * 1024 * 1024
                        ) {
                          setFile([selectedFile]);
                        } else {
                          alert("Video must be in MP4 format and under 50MB.");
                        }
                      }}
                    />
                  </div>
                  {/* Existing Video Preview with Remove */}
                  {existingVideo && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">
                        Existing Video
                      </h3>
                      <video
                        src={`http://localhost:3000${existingVideo}`}
                        controls
                        className="w-[15rem] h-[15rem] object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={removeExistingVideo}
                        className="mt-2 bg-red-500 text-white text-sm px-4 py-1 rounded-md"
                      >
                        Remove Video
                      </button>
                    </div>
                  )}

                  {/* New Video Preview with Remove */}
                  {file.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">New Video</h3>
                      <video
                        src={URL.createObjectURL(file[0])}
                        controls
                        className="w-[15rem] h-[15rem] object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => setFile([])}
                        className="mt-2 bg-red-500 text-white text-sm px-4 py-1 rounded-md"
                      >
                        Remove Video
                      </button>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button
                    className="bg-gray-600 text-white px-6 py-3 rounded-md w-full sm:w-40"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                  >
                    Back
                  </button>
                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <button
                      className={`bg-green-500 p-3 w-[10rem] rounded-md text-white ${
                        !isFormChanged
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isFormChanged && validateCurrentTab()) {
                          submitForm(e);
                        }
                      }}
                      disabled={!isFormChanged}
                    >
                      Submit Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProperty;
