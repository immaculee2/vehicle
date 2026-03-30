import { useState } from "react";
import { useVehicle } from "../hooks/useVehicle";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, ownerSchema, registrationSchema } from "../utils/validationSchemas";

const combinedSchema = vehicleSchema.merge(ownerSchema).merge(registrationSchema);

const RegisterVehicle = () => {
  const { createVehicle } = useVehicle();
  const [step, setStep] = useState(1);

  const {
    register, handleSubmit, formState: { errors }, trigger
  } = useForm({ resolver: zodResolver(combinedSchema) });

  const stepFields = {
    1: ['manufacture', 'model', 'bodyType', 'color', 'year', 'engineCapacity', 'odometerReading', 'seatingCapacity', 'vehicleType', 'fuelType', 'purpose', 'status'],
    2: ['ownerName', 'ownerType', 'address', 'nationalID', 'mobileNumber', 'email', 'companyRegNumber', 'passportNumber'],
    3: ['plateNumber', 'plateType', 'registrationDate', 'expiryDate', 'insuranceExpiryDate', 'policyNumber', 'companyName', 'insuranceType', 'roadworthyCert', 'customsRef', 'proofOfOwnership', 'state', 'insuranceState']
  };

  const onSubmitVehicle = async (data) => {
    if (step < 3) {
      const isValid = await trigger(stepFields[step]);
      if (isValid) {
        setStep(step + 1);
      }
    } else {
      createVehicle.mutate(data, {
        onSuccess: () => alert("Vehicle registered successfully"),
        onError: (error) => {
          if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            alert("Validation errors: " + errors.map(e => e.message).join(", "));
          } else {
            alert("Error registering vehicle");
          }
        }
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h1 className="text-2xl font-bold">Register New Vehicle</h1>
              <p className="text-blue-100">Complete the form in 3 easy steps</p>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                {["Vehicle Info", "Owner Details", "Registration"].map((stepName, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step > index ? 'bg-green-500 text-white' :
                      step === index + 1 ? 'bg-blue-600 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {step > index ? '✓' : index + 1}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      step === index + 1 ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {stepName}
                    </span>
                    {index < 2 && (
                      <div className={`w-12 h-1 mx-4 ${
                        step > index ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmitVehicle)} className="p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manufacture *
                      </label>
                      <input
                        {...register("manufacture")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Toyota"
                      />
                      {errors.manufacture && <p className="mt-1 text-sm text-red-600">{errors.manufacture.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model *
                      </label>
                      <input
                        {...register("model")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Camry"
                      />
                      {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Body Type *
                      </label>
                      <input
                        {...register("bodyType")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Sedan"
                      />
                      {errors.bodyType && <p className="mt-1 text-sm text-red-600">{errors.bodyType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color *
                      </label>
                      <input
                        {...register("color")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., White"
                      />
                      {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year *
                      </label>
                      <input
                        type="number"
                        {...register("year", { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 2020"
                      />
                      {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Engine Capacity (cc) *
                      </label>
                      <input
                        type="number"
                        {...register("engineCapacity", { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 2000"
                      />
                      {errors.engineCapacity && <p className="mt-1 text-sm text-red-600">{errors.engineCapacity.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Odometer Reading (km) *
                      </label>
                      <input
                        type="number"
                        {...register("odometerReading", { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 50000"
                      />
                      {errors.odometerReading && <p className="mt-1 text-sm text-red-600">{errors.odometerReading.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seating Capacity *
                      </label>
                      <input
                        type="number"
                        {...register("seatingCapacity", { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 5"
                      />
                      {errors.seatingCapacity && <p className="mt-1 text-sm text-red-600">{errors.seatingCapacity.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Type *
                      </label>
                      <select
                        {...register("vehicleType")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Type</option>
                        <option value="ELECTRIC">Electric</option>
                        <option value="SUV">SUV</option>
                        <option value="TRUCK">Truck</option>
                        <option value="MOTORCYCLE">Motorcycle</option>
                        <option value="BUS">Bus</option>
                        <option value="VAN">Van</option>
                        <option value="PICKUP">Pickup</option>
                        <option value="OTHER">Other</option>
                      </select>
                      {errors.vehicleType && <p className="mt-1 text-sm text-red-600">{errors.vehicleType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuel Type *
                      </label>
                      <select
                        {...register("fuelType")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Fuel Type</option>
                        <option value="PETROL">Petrol</option>
                        <option value="DIESEL">Diesel</option>
                        <option value="ELECTRIC">Electric</option>
                        <option value="HYBRID">Hybrid</option>
                        <option value="GAS">Gas</option>
                        <option value="OTHER">Other</option>
                      </select>
                      {errors.fuelType && <p className="mt-1 text-sm text-red-600">{errors.fuelType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose *
                      </label>
                      <select
                        {...register("purpose")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Purpose</option>
                        <option value="PERSONAL">Personal</option>
                        <option value="COMMERCIAL">Commercial</option>
                        <option value="TAXI">Taxi</option>
                        <option value="GOVERNMENT">Government</option>
                      </select>
                      {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        {...register("status")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Status</option>
                        <option value="NEW">New</option>
                        <option value="USED">Used</option>
                        <option value="REBUILT">Rebuilt</option>
                      </select>
                      {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Owner Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Owner Name *
                      </label>
                      <input
                        {...register("ownerName")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Full name"
                      />
                      {errors.ownerName && <p className="mt-1 text-sm text-red-600">{errors.ownerName.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Owner Type *
                      </label>
                      <select
                        {...register("ownerType")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Type</option>
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="COMPANY">Company</option>
                        <option value="NGO">NGO</option>
                        <option value="GOVERNMENT">Government</option>
                      </select>
                      {errors.ownerType && <p className="mt-1 text-sm text-red-600">{errors.ownerType.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        {...register("address")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Full address"
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        National ID *
                      </label>
                      <input
                        {...register("nationalID")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="16-digit ID"
                      />
                      {errors.nationalID && <p className="mt-1 text-sm text-red-600">{errors.nationalID.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        {...register("mobileNumber")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10-digit number"
                      />
                      {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="email@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Registration Number
                      </label>
                      <input
                        {...register("companyRegNumber")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Required for companies"
                      />
                      {errors.companyRegNumber && <p className="mt-1 text-sm text-red-600">{errors.companyRegNumber.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passport Number
                      </label>
                      <input
                        {...register("passportNumber")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Optional"
                      />
                      {errors.passportNumber && <p className="mt-1 text-sm text-red-600">{errors.passportNumber.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Registration & Insurance</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plate Number *
                      </label>
                      <input
                        {...register("plateNumber")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., RAB123A"
                      />
                      {errors.plateNumber && <p className="mt-1 text-sm text-red-600">{errors.plateNumber.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plate Type *
                      </label>
                      <select
                        {...register("plateType")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Type</option>
                        <option value="PRIVATE">Private</option>
                        <option value="COMMERCIAL">Commercial</option>
                        <option value="GOVERNMENT">Government</option>
                        <option value="DIPLOMATIC">Diplomatic</option>
                        <option value="PERSONALIZED">Personalized</option>
                      </select>
                      {errors.plateType && <p className="mt-1 text-sm text-red-600">{errors.plateType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Date *
                      </label>
                      <input
                        type="datetime-local"
                        {...register("registrationDate")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.registrationDate && <p className="mt-1 text-sm text-red-600">{errors.registrationDate.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="datetime-local"
                        {...register("expiryDate")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Expiry Date *
                      </label>
                      <input
                        type="datetime-local"
                        {...register("insuranceExpiryDate")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.insuranceExpiryDate && <p className="mt-1 text-sm text-red-600">{errors.insuranceExpiryDate.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Policy Number *
                      </label>
                      <input
                        {...register("policyNumber")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Insurance policy number"
                      />
                      {errors.policyNumber && <p className="mt-1 text-sm text-red-600">{errors.policyNumber.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        {...register("companyName")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Insurance company"
                      />
                      {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Type *
                      </label>
                      <input
                        {...register("insuranceType")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Comprehensive"
                      />
                      {errors.insuranceType && <p className="mt-1 text-sm text-red-600">{errors.insuranceType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Roadworthy Certificate *
                      </label>
                      <input
                        {...register("roadworthyCert")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Certificate number"
                      />
                      {errors.roadworthyCert && <p className="mt-1 text-sm text-red-600">{errors.roadworthyCert.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Customs Reference *
                      </label>
                      <input
                        {...register("customsRef")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Customs reference"
                      />
                      {errors.customsRef && <p className="mt-1 text-sm text-red-600">{errors.customsRef.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proof of Ownership *
                      </label>
                      <input
                        {...register("proofOfOwnership")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ownership document"
                      />
                      {errors.proofOfOwnership && <p className="mt-1 text-sm text-red-600">{errors.proofOfOwnership.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration State *
                      </label>
                      <select
                        {...register("state")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        <option value="ACTIVE">Active</option>
                        <option value="SUSPENDED">Suspended</option>
                        <option value="EXPIRED">Expired</option>
                        <option value="PENDING">Pending</option>
                      </select>
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance State *
                      </label>
                      <select
                        {...register("insuranceState")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        <option value="ACTIVE">Active</option>
                        <option value="SUSPENDED">Suspended</option>
                        <option value="EXPIRED">Expired</option>
                      </select>
                      {errors.insuranceState && <p className="mt-1 text-sm text-red-600">{errors.insuranceState.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-gray-200">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    Previous
                  </button>
                )}

                <button
                  type="submit"
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={createVehicle.isPending}
                >
                  {createVehicle.isPending ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Registering...
                    </span>
                  ) : step === 3 ? (
                    'Register Vehicle'
                  ) : (
                    'Next Step'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterVehicle;