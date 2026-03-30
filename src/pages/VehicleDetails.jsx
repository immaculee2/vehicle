import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";

const VehicleDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h1 className="text-2xl font-bold">Vehicle Details</h1>
              <p className="text-blue-100">ID: {id}</p>
            </div>
            <Tabs vehicleId={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;