import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

export const useVehicle = () => {
  const queryClient = useQueryClient();

  const vehiclesQuery = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      try {
        const res = await api.get("/vehicle-service/vehicle");
        return res.data;
      } catch (err) {
        const errMessage =
          err.response?.data?.message ||
          err.response?.statusText ||
          err.message ||
          "Failed to load vehicles";
        throw new Error(errMessage);
      }
    },
  });

  const createVehicle = useMutation({
    mutationFn: async (vehicleData) => {
      const res = await api.post("/vehicle-service/vehicle", vehicleData);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicles"] }),
  });

  const updateVehicle = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/vehicle-service/vehicle/${id}`, data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicles"] }),
  });

  const deleteVehicle = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/vehicle-service/vehicle/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicles"] }),
  });

  return {
    vehiclesQuery,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
};

export const useVehicleDetails = (id) =>
  useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const res = await api.get(`/vehicle-service/vehicle/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

export const useVehicleInfo = (id, options = {}) =>
  useQuery({
    queryKey: ["vehicle", id, "info"],
    queryFn: async () => {
      const res = await api.get(`/vehicle-service/vehicle/${id}/info`);
      return res.data;
    },
    enabled: !!id,
    ...options,
  });

export const useVehicleOwner = (id, options = {}) =>
  useQuery({
    queryKey: ["vehicle", id, "owner"],
    queryFn: async () => {
      const res = await api.get(`/vehicle-service/vehicle/${id}/owner`);
      return res.data;
    },
    enabled: !!id,
    ...options,
  });

export const useVehicleRegistration = (id, options = {}) =>
  useQuery({
    queryKey: ["vehicle", id, "registration"],
    queryFn: async () => {
      const res = await api.get(`/vehicle-service/vehicle/${id}/registration`);
      return res.data;
    },
    enabled: !!id,
    ...options,
  });

export const useVehicleInsurance = (id, options = {}) =>
  useQuery({
    queryKey: ["vehicle", id, "insurance"],
    queryFn: async () => {
      const res = await api.get(`/vehicle-service/vehicle/${id}/insurance`);
      return res.data;
    },
    enabled: !!id,
    ...options,
  });