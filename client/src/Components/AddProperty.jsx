import React, { useState } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import Navbar from "./Navbar";

const AddProperty = () => {
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
  const [Installmentavailable, setInstallmentavailable] = useState("");
  const [Addadditionalfeatures, setAddadditionalfeatures] = useState("");
  const [Marla, setMarla] = useState("");
  const [pkr, setPkr] = useState("");
  const [pkr1, setPkr1] = useState("");
  const [Title, setTitle] = useState("");
  const [Discription, setDiscription] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber1, setPhoneNumber1] = useState("");
  const [PhoneNumber2, setPhoneNumber2] = useState("");
  const [WhatsappNumber, setWhatsappNumber] = useState("");
  const [images, setImages] = useState([]);
  const [file, setFile] = useState([]);

  // Form submission handler
  const submitForm = () => {
    const formData = new FormData();

    // Append all form fields
    formData.append('PropertyType', PropertyType);
    formData.append('PropertyTypetype', PropertyTypetype);
    formData.append('City', City);
    formData.append('SelectPurpose', SelectPurpose);
    formData.append('Location', Location);
    formData.append('Town', Town);
    formData.append('Street', Street);
    formData.append('bed', bed);
    formData.append('bath', bath);
    formData.append('Price', Price);
    formData.append('AreaSize', AreaSize);
    formData.append('MonthlyRent', MonthlyRent);
    formData.append('Installmentavailable', Installmentavailable);
    formData.append('Addadditionalfeatures', Addadditionalfeatures);
    formData.append('Marla', Marla);
    formData.append('pkr', pkr);
    formData.append('pkr1', pkr1);
    formData.append('Title', Title);
    formData.append('Discription', Discription);
    formData.append('Email', Email);
    formData.append('PhoneNumber1', PhoneNumber1);
    formData.append('PhoneNumber2', PhoneNumber2);
    formData.append('WhatsappNumber', WhatsappNumber);

    // Append all images
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    // Here you would typically send formData to your backend
    console.log("Form submitted:", Object.fromEntries(formData));
  };

  // File drop handler
  const handleFileDrop = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setFile(files);
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
    if (value === "Buy") {
      setHide1(true);
    } else setHide1(false);

    if (value === "Rent") {
      setHide2(true);
    } else setHide2(false);

    setIsOpen3(false);
    setSelectPurpose(value);
  };

  return (
    <>
      <Navbar />
      <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-28">
        {/* Step Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 lg:gap-20 py-4 w-full max-w-4xl mx-auto rounded-xl mt-4 md:mt-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 shadow-lg">
          {[1, 2, 3, 4].map((tab) => (
            <div
              key={tab}
              className={
                openTab === tab
                  ? "text-orange-600 underline underline-offset-8 text-base md:text-lg font-semibold cursor-pointer"
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

        {/* Main Form Container */}
        <div className="grid gap-6 m-2 md:m-[22px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl">Add new property</h1>

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
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </div>
                  {isOpen && (
                    <div className="absolute w-full mt-1 z-10 p-3 shadow-lg border bg-white rounded-sm">
                      <ul>
                        {["Home", "Commercial", "Land & Plots"].map((item) => (
                          <li
                            key={item}
                            onClick={() => closeDropdown(item)}
                            className="px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            {item}
                          </li>
                        ))}
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
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </div>
                  {isOpen1 && (
                    <div className="absolute w-full z-10 bg-white rounded-sm shadow-lg border mt-1">
                      {show && (
                        <div className="p-3">
                          <ul>
                            {["Houses", "Flat", "Upper Portion", "Lower Portion", "Farm House", "Room", "Penthouse"].map((item) => (
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
                            {["Office", "Shop", "Warehouse", "Factory", "Building", "Other"].map((item) => (
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
                            {["Residential Plot", "Commercial Plot", "Agricultural Land", "Industrial Land", "Plot File", "Plot Form"].map((item) => (
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
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </div>
                  {isOpen2 && (
                    <div className="absolute w-full mt-1 p-2 shadow-lg border z-10 bg-white rounded-sm">
                      <input
                        type="text"
                        placeholder="Enter Locations"
                        className="text-sm hover:bg-gray-50 rounded-sm p-1 w-full outline-red-400"
                      />
                      <hr className="my-2" />
                      <ul>
                        {["Bahawalpur", "Lahore", "Multan", "Islamanbad"].map((item) => (
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
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
              >
                Next
              </button>
            </div>
          </div>

          {/* Tab 2 - Property Features */}
          <div className={openTab === 2 ? "block" : "hidden"}>
            <div className="grid gap-6">
              {hide && (
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="grid gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <FaBed />
                      <label>Bed</label>
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                      className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                      value={bed}
                      onChange={(e) => setBed(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2 w-full mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                      <FaBath />
                      <label>Bath</label>
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                      className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                      value={bath}
                      onChange={(e) => setBath(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                <div className="grid gap-2 w-full relative">
                  <label>Select Purpose</label>
                  <div
                    className="flex px-4 h-[52px] border rounded-md border-gray-400 font-medium gap-8 items-center justify-between cursor-pointer"
                    onClick={toggleDropdown3}
                  >
                    {SelectPurpose}
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
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
                        type="text"
                        className="w-full p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                        value={Price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <select
                        className="p-3 border rounded-md border-gray-400 outline-rose-400"
                        value={pkr}
                        onChange={(e) => setPkr(e.target.value)}
                      >
                        {["PKR", "Dollar", "Euro"].map((currency) => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
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
                        onChange={(e) => setMonthlyRent(e.target.value)}
                      />
                      <select
                        className="p-3 border rounded-md border-gray-400 outline-rose-400"
                        value={pkr1}
                        onChange={(e) => setPkr1(e.target.value)}
                      >
                        {["PKR", "Dollar", "Euro"].map((currency) => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                <div className="grid gap-2 w-full">
                  <label>Area Size</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="w-full p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                      value={AreaSize}
                      onChange={(e) => setAreaSize(e.target.value)}
                    />
                    <select
                      className="p-3 border rounded-md border-gray-400 outline-rose-400"
                      value={Marla}
                      onChange={(e) => setMarla(e.target.value)}
                    >
                      {["Marla", "Feet", "Kanal", "Sq. Yd."].map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {hide1 ? (
                  <div className="flex flex-col md:flex-row gap-2 w-full justify-between items-center mt-4 md:mt-0">
                    <div className="grid gap-1">
                      <label className="text-lg md:text-xl font-semibold">Installment available</label>
                      <p className="text-gray-500 text-sm md:text-base">Enable if listing is available on installments</p>
                    </div>
                    <input
                      type="checkbox"
                      className="p-2 w-6 h-6 border rounded-md border-gray-400 outline-rose-400 mt-2 md:mt-0"
                      checked={Installmentavailable}
                      onChange={(e) => setInstallmentavailable(e.target.checked)}
                    />
                  </div>
                ) : (
                  <div className="grid gap-2 w-full mt-4 md:mt-0">
                    <label>Add additional features</label>
                    <input
                      type="text"
                      className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                      value={Addadditionalfeatures}
                      onChange={(e) => setAddadditionalfeatures(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <button
                className="bg-red-500 p-3 rounded-md text-white mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
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
                <div className="grid gap-2 w-full">
                  <label>Title</label>
                  <input
                    type="text"
                    className="p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
                <div className="grid gap-2 w-full">
                  <label>Email</label>
                  <input
                    type="email"
                    className="w-full p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid gap-2 w-full mt-4 md:mt-0">
                  <label>Phone Number 1</label>
                  <input
                    type="text"
                    defaultValue="+92"
                    className="w-full p-2 text-lg border rounded-md border-gray-400 outline-rose-400"
                    value={PhoneNumber1}
                    onChange={(e) => setPhoneNumber1(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid w-full mt-4">
                <label>Description</label>
                <textarea
                  className="p-2 text-lg mt-3 border rounded-md border-gray-400 outline-rose-400 h-32"
                  value={Discription}
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </div>
              <button
                className="bg-red-500 p-3 w-full mt-5 rounded-md text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
              >
                Next
              </button>
            </div>
          </div>

          {/* Tab 4 - Images & Submit */}
          <div className={openTab === 4 ? "block" : "hidden"}>
            <div className="grid gap-8">
              <div className="flex flex-col items-center gap-6">
                {/* Drag and Drop Area */}
                <div className="w-full h-48 md:h-60 flex justify-between items-center border-4 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center relative">
                  <p className="text-gray-500 mb-4 w-full text-center">Drag & Drop Image or Video here</p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    multiple
                    onChange={handleFileDrop}
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-10 w-full">
                  <button
                    className="bg-gray-500 p-3 rounded-md text-white w-full sm:w-40"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="bg-red-500 p-3 rounded-md text-white w-full sm:w-40"
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                  >
                    Submit Property
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