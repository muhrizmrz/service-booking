import React, { useEffect, useState } from "react";
import { Step } from "./Step";
import Service from "./Service";
import Address from "./Address";
import Proceed from "./Proceed";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

const Booking = () => {
  const [index, setIndex] = useState(1);
  const [serviceData, setServiceData] = useState({
    branch: "",
    category: "",
    service: "",
    staff: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
  });
  const [services, setServices] = useState([]);
  const [addressData, setAddressData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    district: "",
    postalCode: "",
    state: "",
    streetAddress: "",
    serviceRemarks: "",
  });
  const [status, setStatus] = useState({
    service: false,
    address: false,
  });

  const serviceHandler = (next) => {
    if (services.length > 0) {
      setStatus((prev) => ({ ...prev, service: true }));
      if (next) {
        setIndex((prev) => prev + 1);
      } else {
        setIndex(2);
      }
      return;
    }
    if (Object.values(serviceData).some((field) => !field)) {
      toast.error("Please fill all fields");
      setStatus((prev) => ({ ...prev, service: false }));
      return false;
    }
    setStatus((prev) => ({ ...prev, service: true }));
    if (services.length === 0) {
      setServices((prev) => [...prev, serviceData]);
    }
    if (next) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(2);
    }
    return true;
  };

  const addMoreService = () => {
    if (
      !serviceData.branch ||
      !serviceData.category ||
      !serviceData.service ||
      !serviceData.staff ||
      !serviceData.date ||
      !serviceData.time
    ) {
      toast.error("Please fill all fields");
      return false;
    }
    setStatus((prev) => ({ ...prev, service: true }));
    setServices((prev) => [...prev, { ...serviceData }]);
    setServiceData({
      branch: "",
      category: "",
      service: "",
      staff: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      serviceName: "",
      staffName: "",
      staffPrice: "",
    });
    return true;
  };

  const removeService = (index) => {
    setServices((prev) => {
      const newServices = [...prev];
      newServices.splice(index, 1);
      return newServices;
    });
    if (services.length === 0) {
      setStatus((prev) => ({ ...prev, service: false }));
    }
  };

  const addressHandler = (next) => {
    if (Object.values(addressData).some((field) => !field)) {
      toast.error("Please fill all address fields");
      setStatus((prev) => ({ ...prev, address: false }));
      return false;
    }
    setStatus((prev) => ({ ...prev, address: true }));
    if (next) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(3);
    }
    return true;
  };

  const submitHandler = async () => {
    if (!status.address || !status.service) {
      toast.error("Fill all fields!");
    }
    try {
      const newArray = services.map(({ service, staff, staffPrice, date, time }) => ({
        service,
        worker: staff,
        price: staffPrice,
        date,
        time
      }));
      await api.post("/book-service", {
        services: newArray,
        address: addressData,
      });
      toast.success("Booking submitted successfully!");
      setServiceData({
        branch: "",
        category: "",
        service: "",
        staff: "",
        serviceName: "",
        staffName: "",
        staffPrice: "",
        date: "",
        time: "",
      });
      setAddressData({
        fullName: "",
        email: "",
        mobile: "",
        postalCode: "",
        state: "",
        district: "",
        streetAddress: "",
        serviceRemarks: "",
      });
      setServices([]);
      setStatus({
        service: false,
        address: false,
      });
      setIndex(1);
    } catch (err) {
      console.log(err);
    }
  };

  const step = {
    [1]: (
      <Service
        formData={serviceData}
        setFormData={setServiceData}
        addMoreService={addMoreService}
        removeService={removeService}
        services={services}
      />
    ),
    [2]: <Address formData={addressData} setFormData={setAddressData} />,
    [3]: <Proceed services={services} addressData={addressData} />,
  };

  const nextFunction = {
    [1]: serviceHandler,
    [2]: addressHandler,
    [3]: submitHandler,
  };

  return (
    <div className="w-full grid place-items-center pb-20 bg-white">
      <Toaster />
      <div className="w-11/12 sm:w-5/6 p-3 py-5 sm:p-6 bg-white rounded-2xl shadow-2xl -mt-20">
        <div className="p-0 sm:p-3 flex justify-normal sm:justify-between gap-0 sm:gap-2">
          <Step
            i={1}
            index={index}
            setIndex={setIndex}
            status={status.service}
            disabled={true}
            onClick={() => setIndex(1)}
            text="Service"
          />
          <Step
            i={2}
            index={index}
            setIndex={setIndex}
            status={status.address}
            disabled={status.service}
            onClick={() => serviceHandler(false)}
            text="Address"
          />
          <Step
            i={3}
            index={index}
            setIndex={setIndex}
            disabled={status.address}
            onClick={() => serviceHandler(false) && addressHandler(false)}
            status={false}
            text="Proceed"
          />
        </div>
        {step[index]}
        <div className="flex justify-end gap-3 mt-12">
          {index > 1 && (
            <button
              onClick={() => setIndex(index - 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => nextFunction[index](true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {index === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
