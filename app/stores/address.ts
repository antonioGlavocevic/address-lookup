import { defineStore } from "pinia";
import { formatDistance } from "date-fns";
import type { Address as PrismaAddress } from "~~/generated/prisma/client";

type SerializedAddress = Omit<PrismaAddress, "createdAt"> & {
  createdAt: string;
};

export type Address = {
  id: number;
  displayName: string;
  lat: number;
  lng: number;
  createdAt: string;
};

export const PRE_ADDRESS_ID = -1;
export const PRE_ADDRESS_DISPLAY_NAME = "Loading...";

export const useAddressStore = defineStore("address", () => {
  const addresses = ref<Address[]>([]);
  const selectedAddress = ref<Address | null>(null);

  function serializedToStore(address: SerializedAddress): Address {
    return {
      ...address,
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
