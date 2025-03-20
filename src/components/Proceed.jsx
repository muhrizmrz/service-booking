import React from "react";
import ServiceTable from "./ServiceTable";

const Proceed = ({ services, addressData }) => {
  return (
    <div className="p-3">
      <div className="grid grid-cols-1">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Service Details
      </h2>
      {services.length > 0 && (
        <div className="mt-8 col-span-1 overflow-x-scroll sm:overflow-x-auto">
        <ServiceTable services={services} />
        </div>
      )}
      <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-4">
        Address Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Full Name:</p>
          <p className="text-sm text-gray-900">{addressData.fullName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Email:</p>
          <p className="text-sm text-gray-900">{addressData.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Mobile Number:</p>
          <p className="text-sm text-gray-900">{addressData.mobile}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Postal Code:</p>
          <p className="text-sm text-gray-900">{addressData.postalCode}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">State:</p>
          <p className="text-sm text-gray-900">{addressData.state}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">District:</p>
          <p className="text-sm text-gray-900">{addressData.district}</p>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <p className="text-sm font-medium text-gray-700">Street Address:</p>
          <p className="text-sm text-gray-900">{addressData.streetAddress}</p>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <p className="text-sm font-medium text-gray-700">Service Remarks:</p>
          <p className="text-sm text-gray-900">{addressData.serviceRemarks}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Proceed;
