import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useVehicle } from "../hooks/useVehicle";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { vehiclesQuery } = useVehicle();
  const { data, isLoading, isError, error } = vehiclesQuery;

  if (isLoading) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    </>
  );

  if (isError) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error?.message || "Failed to load dashboard data"}</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-blue-100">Welcome to your vehicle management dashboard</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">🚗</div>
                    <div>
                      <p className="text-blue-100 text-sm uppercase tracking-wide">Total Vehicles</p>
                      <p className="text-3xl font-bold">{data?.length || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">✅</div>
                    <div>
                      <p className="text-green-100 text-sm uppercase tracking-wide">Active</p>
                      <p className="text-3xl font-bold">
                        {data?.filter(v => v.status === 'ACTIVE' || v.state === 'ACTIVE').length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg p-6 text-white">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">🆕</div>
                    <div>
                      <p className="text-yellow-100 text-sm uppercase tracking-wide">New Vehicles</p>
                      <p className="text-3xl font-bold">
                        {data?.filter(v => v.status === 'NEW').length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/vehicle/new"
                    className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                  >
                    <div className="text-2xl mr-3">➕</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Register New Vehicle</h3>
                      <p className="text-sm text-gray-500">Add a new vehicle to the system</p>
                    </div>
                  </Link>

                  <Link
                    to="/"
                    className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                  >
                    <div className="text-2xl mr-3">📋</div>
                    <div>
                      <h3 className="font-medium text-gray-900">View All Vehicles</h3>
                      <p className="text-sm text-gray-500">Browse the complete vehicle list</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;