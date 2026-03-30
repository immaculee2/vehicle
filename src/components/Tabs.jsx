import { useState } from "react";
import {
  useVehicleInfo,
  useVehicleOwner,
  useVehicleRegistration,
  useVehicleInsurance,
} from "../hooks/useVehicle";
import Loader from "./Loader";

const Tabs = ({ vehicleId }) => {
  const [activeTab, setActiveTab] = useState("info");

  const infoQuery = useVehicleInfo(vehicleId, { enabled: activeTab === "info" });
  const ownerQuery = useVehicleOwner(vehicleId, { enabled: activeTab === "owner" });
  const registrationQuery = useVehicleRegistration(vehicleId, { enabled: activeTab === "registration" });
  const insuranceQuery = useVehicleInsurance(vehicleId, { enabled: activeTab === "insurance" });

  const activeQuery =
    activeTab === "info"
      ? infoQuery
      : activeTab === "owner"
      ? ownerQuery
      : activeTab === "registration"
      ? registrationQuery
      : insuranceQuery;

  return (
    <div className="p-6">
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {["info", "owner", "registration", "insurance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Details
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 min-h-96">
        {activeQuery.isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading {activeTab} details...</p>
            </div>
          </div>
        ) : activeQuery.isError ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
              <p className="text-gray-600">Failed to fetch {activeTab} details</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
              {activeTab} Information
            </h3>
            <div className="prose prose-sm max-w-none">
              <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(activeQuery.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;