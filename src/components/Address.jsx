import React from "react";
import Input from "./Input";

const Address = ({ formData, setFormData }) => {
  return (
    <div className="w-full p-3">
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-3">
          <Input
            label="Full Name"
            name="fullName"
            required={true}
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />
          <Input
            label="Email"
            name="email"
            required={true}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <Input
            label="Mobile Number"
            name="mobile"
            type="number"
            required={true}
            value={formData.mobile}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mobile: e.target.value }))
            }
          />
          <Input
            label="Postal Code"
            name="postalCode"
            type="number"
            required={true}
            value={formData.postalCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, postalCode: e.target.value }))
            }
          />
          <Input
            label="State"
            name="state"
            required={true}
            value={formData.state}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, state: e.target.value }))
            }
          />
          <Input
            label="District"
            name="district"
            required={true}
            value={formData.district}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, district: e.target.value }))
            }
          />
          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="streetAddress"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Street Address
            </label>
            <textarea
              value={formData.streetAddress}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  streetAddress: e.target.value,
                }))
              }
              id="streetAddress"
              name="streetAddress"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              rows="3"
            ></textarea>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="serviceRemarks"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Service Remarks
            </label>
            <textarea
              value={formData.serviceRemarks}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  serviceRemarks: e.target.value,
                }))
              }
              id="serviceRemarks"
              name="serviceRemarks"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              rows="3"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Address;
