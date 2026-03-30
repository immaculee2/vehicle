import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useVehicle } from "../hooks/useVehicle";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const Home = () => {
  const { vehiclesQuery, deleteVehicle } = useVehicle();
  const { data, isLoading, error } = vehiclesQuery;
  const { isAuthenticated } = useContext(AuthContext);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicle.mutate(id, {
        onError: () => alert("Error deleting vehicle"),
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error?.message || "Failed to fetch vehicles"}</p>;

  const vehicles = Array.isArray(data) ? data : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-blue-600 text-white">
              <h1 className="text-2xl font-bold">All Vehicles</h1>
              <p className="text-blue-100">Browse our registered vehicle database</p>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading vehicles...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <div className="text-red-500 text-lg font-semibold mb-2">Error Loading Vehicles</div>
                <p className="text-gray-600">{error?.message || "Failed to fetch vehicles"}</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">🚗</div>
                <p className="text-gray-600 text-lg">No vehicles found.</p>
                <p className="text-gray-500">Check back later for new registrations.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plate Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      {isAuthenticated && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vehicles.map((v) => (
                      <tr key={v._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {v.plateNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {v.model}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {v.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            v.status === 'NEW' ? 'bg-green-100 text-green-800' :
                            v.status === 'USED' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {v.status}
                          </span>
                        </td>
                        {isAuthenticated && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Link
                              to={`/vehicle/${v._id}`}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleDelete(v._id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;