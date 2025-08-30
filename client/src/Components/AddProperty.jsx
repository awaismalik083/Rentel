import React, { useState } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "sonner";
import DashNavbar from "../Dashboard/DashNavbar";
import DashSidebar from "../Dashboard/DashSidebar";
import { useAppContext } from "../Context/Context";

const AddProperty = () => {
  const { setPropertyId } = useAppContext();
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
  const [SelectPurpose, setSelectPurpose] = useState("Rent");
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

  // Helper to validate phone input with max 11 digits (excluding leading '+')
  const validatePhoneInputWithLimit = (value) => {
    // Allow empty input
    if (value === "") return true;

    // Allow only one '+' at start
    if (value[0] === "+") {
      // Check if the rest are digits and length <= 12 (1 for + + 11 digits)
      return /^\+\d{0,12}$/.test(value);
    } else {
      // If no plus, allow only digits up to 11
      return /^\d{0,12}$/.test(value);
    }
  };

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
      } else if (!/^(\+92|0)[0-9]{10}$/.test(PhoneNumber1)) {
        newErrors.PhoneNumber1 =
          "Please enter a valid Pakistani phone number (e.g.,+92XXXXXXXXX)";
      }

      // Phone Number 2 validation (optional)
      if (PhoneNumber2 && !/^(\+92|0)[0-9]{10}$/.test(PhoneNumber2)) {
        newErrors.PhoneNumber2 = "Please enter a valid Pakistani phone number";
      }

      // WhatsApp Number validation (optional)
      if (WhatsappNumber && !/^(\+92|0)[0-9]{10}$/.test(WhatsappNumber)) {
        newErrors.WhatsappNumber =
          "Please enter a valid Pakistani phone number";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    return true; // For other tabs, allow proceeding by default
  };
  const validator = () => {
    if (openTab === 1) {
      // Validate Tab 1 fields
      if (Location.length <= 0 || Town.length <= 0 || Street.length <= 0) {
        toast.error(
          "Please enter all required fields in Step1 (location,Town,Street)"
        );
        return;
      } else {
        setOpenTab(2);
        return; // ← Add return to prevent further execution
      }
    }

    if (openTab === 2) {
      // Validate Tab 2 fields based on purpose
      if (SelectPurpose === "Rent") {
        // Validate Rent-specific fields
        if (
          MonthlyRent.length <= 0 || // Changed from < 0 to <= 0
          bed.length <= 0 || // Changed from < 0 to <= 0
          bath.length <= 0 || // Changed from < 0 to <= 0
          AreaSize.length <= 0 // Changed from < 0 to <= 0
        ) {
          toast.error(
            "Please enter all required fields in Step 2 (Rent, Beds, Baths, Area Size)"
          );
          return;
        }
        setOpenTab(3);
      }
    }
  };
  // Validate form fields
  const validateError = () => {
    const newErrors = {};

    // Basic property info
    if (!PropertyType) newErrors.PropertyType = "Property type is required";
    if (!PropertyTypetype)
      newErrors.PropertyTypetype = "Property type is required";
    if (!City) newErrors.City = "City is required";
    if (!Location) newErrors.Location = "Location is required";
    if (!Town) newErrors.Town = "Town is required";
    if (!Street) newErrors.Street = "Street is required";

    // Purpose-specific fields
    if (!SelectPurpose) newErrors.SelectPurpose = "Purpose is required";

    // if (SelectPurpose === "Buy") {
    //   if (!Price) newErrors.Price = "Price is required";
    // } else
    if (SelectPurpose === "Rent") {
      if (!MonthlyRent) newErrors.MonthlyRent = "Monthly rent is required";
      if (!bed) newErrors.bed = "Bed count is required";
      if (!bath) newErrors.bath = "Bath count is required";
    }

    // Common fields
    if (!AreaSize) newErrors.AreaSize = "Area size is required";
    if (!Title) newErrors.Title = "Title is required";
    if (!Discription) newErrors.Discription = "Description is required";

    // Contact info
    if (!Email) {
      newErrors.Email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      newErrors.Email = "Please enter a valid email address";
    }

    if (!PhoneNumber1) {
      newErrors.PhoneNumber1 = "Primary phone number is required";
    } else if (!/^(\+92)[0-9]{10}$/.test(PhoneNumber1)) {
      newErrors.PhoneNumber1 =
        "Please enter a valid Pakistani phone number (e.g., +92XXXXXXXXX)";
    }

    if (PhoneNumber2 && !/^(\+92)[0-9]{10}$/.test(PhoneNumber2)) {
      newErrors.PhoneNumber2 = "Please enter a valid Pakistani phone number";
    }

    if (WhatsappNumber && !/^(\+92)[0-9]{10}$/.test(WhatsappNumber)) {
      newErrors.WhatsappNumber = "Please enter a valid Pakistani phone number";
    }

    // Media
    if (images.length === 0) {
      newErrors.images = "At least one image is required";
    }
    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPakistaniNumber = (num) => {
    if (!num) return "";
    num = num.replace(/\D/g, ""); // remove all non-digits
    if (num.startsWith("92")) return `+${num}`;
    if (num.startsWith("0")) return `+92${num.slice(1)}`;
    if (!num.startsWith("92")) return `+92${num}`; // fallback if no prefix
    return `+${num}`;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateError()) {
      toast.error("Please Enter all required Fields");
      return;
    }

    const UserId = localStorage.getItem("sellerId");
    const SellerId = JSON.parse(UserId);

    const formData = new FormData();
    formData.append("SellerId", SellerId);
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
    formData.append("Installment", Installmentavailable);
    formData.append("Additional_Features", Addadditionalfeatures);
    formData.append("Title", Title);
    formData.append("Description", Discription);
    formData.append("Email", Email);

    // ✅ Always save with + sign
    formData.append("Phone_Number_1", formatPakistaniNumber(PhoneNumber1));
    formData.append("Phone_Number_2", formatPakistaniNumber(PhoneNumber2));
    formData.append("Whatsapp_Number", formatPakistaniNumber(WhatsappNumber));

    images.forEach((image) => {
      formData.append(`Images`, image);
    });

    if (file.length > 0) {
      formData.append("Video", file[0]);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/property/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success("Property Uploaded Successfully");
        console.log(res.data.property._id);
        setPropertyId(res.data.property._id);
        setOpenTab(1);
        // Reset form
        setPropertyType("Home");
        setPropertyTypetype("Houses");
        setCity("Bahawalpur");
        setLocation("");
        setTown("");
        setStreet("");
        setBed("");
        setBath("");
        setSelectPurpose("Rent");
        setPrice("");
        setMonthlyRent("");
        setAreaSize("");
        setTitle("");
        setEmail("");
        setPhoneNumber1("");
        setPhoneNumber2("");
        setWhatsappNumber("");
        setDiscription("");
        setImages([]);
        setFile([]);
        setInstallmentavailable(false);
        setAddadditionalfeatures("");
        setMarla("");
        setErrors({});
      }
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      toast.error(
        `Property upload failed: ${err.response?.data?.message || err.message}`
      );
    }
  };

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
    // if (value === "Buy") {
    //   setHide1(true);
    // } else setHide1(false);

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

  return (
    <>
      <DashNavbar />
      <DashSidebar />
      <div className="  bg-gray-50 flex  rounded-md  w-full h-full ">
        <div className=" w-[67rem] mt-10    lg:ml-[16rem] drop-shadow-2xl h-[40rem] rounded-xl">
          {/* Main Form Container */}
          <div className="grid gap-6 p-auto  m-auto md:m-[22px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex flex-wrap   justify-center gap-4 md:gap-20 sm:gap-20 lg:gap-20 py-4 w-full max-w-4xl mx-auto  rounded-xl  md:mt-[10px] bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 shadow-lg">
              {[1, 2, 3, 4].map((tab) => (
                <div
                  key={tab}
                  className={
                    openTab === tab
                      ? "text-blue-500 underline underline-offset-8 text-base md:text-lg font-semibold cursor-pointer"
                      : "text-black text-base md:text-lg font-semibold cursor-pointer"
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
              Add new property
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
                          className="text-sm hover:bg-gray-50 rounded-sm p-1 w-full outline-blue-400"
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
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-3 text-white mt-4"
                  onClick={() => {
                    validator();
                  }}
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
                          {["Rent"].map((item) => (
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

                  {/* Always show Monthly Rent field since only Rent is available */}
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
                </div>

                {/* Always show Bed and Bath fields since only Rent is available */}
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

                <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                  <div className="grid gap-2 w-full">
                    <label>Area Size</label>
                    <div className="flex">
                      <input
                        required
                        type="text"
                        className="w-[30rem] p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
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
                        className="p-3 ml-5 border rounded-md border-gray-400 outline-rose-400"
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

                  {/* Always show Installment available field since only Rent is available
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
                  </div> */}
                </div>

                <button
                  className="bg-blue-500 p-3 rounded-md text-white mt-4"
                  onClick={() => {
                    validator();
                  }}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Tab 3 - Description & Contact */}
            <div className={openTab === 3 ? "block" : "hidden"}>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="grid gap-2 w-full relative pb-6">
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
                  <div className="grid gap-2 w-full relative pb-6">
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
                      <p className="text-red-500 text-sm absolute left-0 bottom-[-20px]">
                        {errors.Email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number 1 Field with Error */}
                  <div className="grid gap-2 w-full relative pb-6">
                    <label>Phone Number 1</label>
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
                        if (validatePhoneInputWithLimit(value)) {
                          setPhoneNumber1(value);
                        }
                      }}
                      placeholder="+92XXXXXXXXX"
                    />
                    {errors.PhoneNumber1 && (
                      <p className="text-red-500 text-sm absolute left-0 bottom-[-20px]">
                        {errors.PhoneNumber1}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                  {/* Phone Number 2 Field with Error */}
                  <div className="grid gap-2 w-full relative pb-6">
                    <label>Phone Number 2 (Optional)</label>
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
                        if (validatePhoneInputWithLimit(value)) {
                          setPhoneNumber2(value);
                        }
                      }}
                      placeholder="+92XXXXXXXXX"
                    />
                    {errors.PhoneNumber2 && (
                      <p className="text-red-500 text-sm absolute left-0 bottom-[-20px]">
                        {errors.PhoneNumber2}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Number Field with Error */}
                  <div className="grid gap-2 w-full relative pb-6">
                    <label>WhatsApp Number (Optional)</label>
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
                        if (validatePhoneInputWithLimit(value)) {
                          setWhatsappNumber(value);
                        }
                      }}
                      placeholder="+92XXXXXXXXX"
                    />
                    {errors.WhatsappNumber && (
                      <p className="text-red-500 text-sm absolute left-0 bottom-[-20px]">
                        {errors.WhatsappNumber}
                      </p>
                    )}
                  </div>
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
                  className="bg-blue-500 p-3 w-full mt-5 rounded-md text-white"
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

                  {/* Image Previews with Remove */}
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
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
                            className="absolute top-1 right-1 bg-white bg-opacity-60 text-black rounded-full px-2 py-0.5 text-xs hidden group-hover:block"
                          >
                            ❌
                          </button>
                        </div>
                      ))}
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
                      required
                      type="file"
                      accept="video/mp4"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (
                          selectedFile &&
                          selectedFile.size <= 200 * 1024 * 1024
                        ) {
                          setFile([selectedFile]);
                        } else {
                          alert("Video must be in MP4 format and under 200MB.");
                        }
                      }}
                    />
                  </div>

                  {/* Video Preview with Remove */}
                  {file.length > 0 && (
                    <div className="mt-4">
                      <video
                        src={URL.createObjectURL(file[0])}
                        controls
                        className="w-[15rem] h-[15rem] object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => setFile([])}
                        className="mt-2 bg-blue-500 text-white text-sm px-4 py-1 rounded-md"
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
                  <button
                    className="bg-blue-500 flex items-center py-3 text-center text-white px-10  rounded-md w-full sm:w-40"
                    onClick={submitForm}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProperty;
