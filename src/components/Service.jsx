import React, { useEffect, useState } from "react";

import Select from "./Select";
import api from "../api";
import ServiceTable from "./ServiceTable";

const Service = ({
  formData,
  setFormData,
  addMoreService,
  removeService,
  services,
}) => {
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchItems = await api.get("/branch");
        const categoryItems = await api.get("/category");
        setBranches(branchItems.data);
        setCategories(categoryItems.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  useEffect(() => {
    if (formData.branch && formData.service) {
      api
        .get(
          `/staffs?branchId=${formData.branch}&serviceId=${formData.service}`
        )
        .then((res) => setStaffData(res.data))
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [formData.branch, formData.service]);

  useEffect(() => {
    if (formData.branch && formData.category) {
      api
        .get(
          `/services?branchId=${formData.branch}&categoryId=${formData.category}`
        )
        .then((res) => setServicesData(res.data))
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [formData.branch, formData.category]);

  const generateTimeOption = (startTime, endTime, duration) => {
    const slots = [];
    let current = new Date(`2025-03-18T${startTime}:00`);
    const end = new Date(`2025-03-18T${endTime}:00`);

    while (current < end) {
      let next = new Date(current.getTime() + duration * 60000);
      if (next <= end) {
        slots.push(current.toTimeString().slice(0, 5)); // Format as HH:MM
      }
      current = next;
    }
    return slots;
  };

  const onChange = (e, name) => {
    const obj = {};
    if (name === "service") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
        [name + "Name"]: servicesData.find(
          (item) => item._id === e.target.value
        )?.name,
        time: "",
      }));
    } else if (name === "staff") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
        [name + "Name"]: staffData.find((item) => item._id === e.target.value)
          ?.name,
        [name + "Price"]: staffData.find((item) => item._id === e.target.value)
          ?.price,
        time: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
        time: "",
      }));
    }
  };

  return (
    <div className="p-3">
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Select
            label="Branch"
            name="branch"
            required
            value={formData.branch}
            options={branches}
            onChange={onChange}
          />
          <Select
            label="Category"
            required
            options={categories}
            value={formData.category}
            name="category"
            onChange={onChange}
          />
          <Select
            label="Service"
            required
            value={formData.service}
            options={servicesData}
            name="service"
            onChange={onChange}
          />
          <div className="w-full">
            <label
              htmlFor="select-input"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Staff
            </label>
            {staffData.length === 0 ? (
              <div className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                Loading...
              </div>
            ) : (
              <select
                id="select-input"
                value={formData.staff}
                required
                name="staff"
                onChange={(e) => onChange(e, "staff")}
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              >
                <option value="">Select an Option</option>
                {staffData.map((item) => (
                  <option value={item._id}>
                    {item.name} - INR{item.price}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="col-span-1 lg:col-span-2">
            <label
              htmlFor="date"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData?.date}
              onChange={(e) => onChange(e, "date")}
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>

          <div className="col-span-1 lg:col-span-2">
            <label
              htmlFor="time"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Time
            </label>
            <div className="p-4 rounded-xl border flex flex-wrap gap-3 min-h-12 max-h-72 overflow-y-scroll">
              {generateTimeOption(
                "09:00",
                "18:00",
                servicesData.find((item) => item._id === formData?.service)
                  ?.duration
              ).map((item) => (
                <div
                  onClick={() => setFormData({ ...formData, time: item })}
                  className={`${
                    item === formData.time
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-white text-gray-500 hover:bg-slate-300"
                  } h-fit p-4 rounded-xl border border-slate-300 cursor-pointer`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-4 flex flex-col lg:flex-row justify-between">
            You've Selected {formData.time} On{" "}
            {new Date(formData.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <button
              type="button"
              onClick={(e) => addMoreService(e)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add More Service
            </button>
          </div>

          {services.length > 0 && (
            <div className="mt-8 col-span-1 lg:col-span-4 overflow-x-scroll">
              <ServiceTable
                services={services}
                servicesData={servicesData}
                staffData={staffData}
                removeService={removeService}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Service;
