import { defineStore } from "pinia";
import { formatDistance } from "date-fns";
import type { Address as PrismaAddress } from "~~/generated/prisma/client";

type SerializedAddress = Omit<PrismaAddress, "createdAt"> & {
  createdAt: string;
};

export type Address = {
  id: number;
  displayName: string;
  lat: string;
  lng: string;
  createdAt: string;
};

export const useAddressStore = defineStore("address", () => {
  const addresses = ref<Address[]>([]);
  const selectedAddress = ref<Address | null>(null);

  function serializedToStore(address: SerializedAddress): Address {
    return {
      ...address,
      lat:
        address.lat < 0
          ? `${address.lat.toFixed(3)}°S`
          : `${address.lat.toFixed(3)}°N`,
      lng:
        address.lng < 0
          ? `${address.lng.toFixed(3)}°W`
          : `${address.lng.toFixed(3)}°E`,
      createdAt: formatDistance(new Date(), new Date(address.createdAt)),
    };
  }

  function setAddresses(newAddresses: SerializedAddress[]) {
    addresses.value = newAddresses.map(serializedToStore);
  }

  function addAddress(address: SerializedAddress) {
    addresses.value.unshift(serializedToStore(address));
  }

  function removeAddress(id: number) {
    addresses.value = addresses.value.filter((a) => a.id !== id);
  }

  function setSelectedAddress(address: Address | null) {
    selectedAddress.value = address;
  }

  return {
    addresses,
    setAddresses,
    addAddress,
    removeAddress,
    selectedAddress,
    setSelectedAddress,
  };
});
