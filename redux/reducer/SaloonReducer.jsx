// store/salonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Registration state
  registration: {
    phoneNumber: '',
    isVerified: false,
    verificationCode: '',
    termsAccepted: false,
  },
  
  // Salon info state
  salonInfo: {
    coverImage: null,
    logoImage: null,
    name: '',
    categories: [],
    address: '',
    contactNumber: '',
    instagram: '',
    direction: '',
    description: '',
    bankDetails: {
      bankCode: '',
      branchCode: '',
      accountNumber: '',
    },
    acceptsCreditCard: true,
  },
  
  // Services state
  services: {
    categories: [],
    servicesList: [],
  },
  
  // UI state
  ui: {
    loading: false,
    error: null,
  },
  
  // Modal states
  modals: {
    categoryModalVisible: false,
    serviceModalVisible: false,
  },
};

const salonSlice = createSlice({
  name: 'salon',
  initialState,
  reducers: {
    // Registration actions
    setPhoneNumber: (state, action) => {
      state.registration.phoneNumber = action.payload;
    },
    setVerificationCode: (state, action) => {
      state.registration.verificationCode = action.payload;
    },
    verifyCode: (state) => {
      state.registration.isVerified = true;
    },
    acceptTerms: (state, action) => {
      state.registration.termsAccepted = action.payload;
    },
    
    // Salon info actions
    setCoverImage: (state, action) => {
      state.salonInfo.coverImage = action.payload;
    },
    setLogoImage: (state, action) => {
      state.salonInfo.logoImage = action.payload;
    },
    setSalonName: (state, action) => {
      state.salonInfo.name = action.payload;
    },
    addSalonCategory: (state, action) => {
      if (!state.salonInfo.categories.includes(action.payload)) {
        state.salonInfo.categories.push(action.payload);
      }
    },
    removeSalonCategory: (state, action) => {
      state.salonInfo.categories = state.salonInfo.categories.filter(
        cat => cat !== action.payload
      );
    },
    setSalonAddress: (state, action) => {
      state.salonInfo.address = action.payload;
    },
    setContactNumber: (state, action) => {
      state.salonInfo.contactNumber = action.payload;
    },
    setInstagram: (state, action) => {
      state.salonInfo.instagram = action.payload;
    },
    setDirection: (state, action) => {
      state.salonInfo.direction = action.payload;
    },
    setDescription: (state, action) => {
      state.salonInfo.description = action.payload;
    },
    setBankDetails: (state, action) => {
      state.salonInfo.bankDetails = action.payload;
    },
    toggleCreditCard: (state) => {
      state.salonInfo.acceptsCreditCard = !state.salonInfo.acceptsCreditCard;
    },
    
    // Services actions
    addServiceCategory: (state, action) => {
      if (!state.services.categories.includes(action.payload)) {
        state.services.categories.push(action.payload);
      }
    },
    removeServiceCategory: (state, action) => {
      state.services.categories = state.services.categories.filter(
        cat => cat !== action.payload
      );
    },
    addService: (state, action) => {
      const formattedService = {
        ...action.payload,
        price: action.payload.price.startsWith('$') 
          ? action.payload.price 
          : `$${action.payload.price}`,
      };
      state.services.servicesList.push(formattedService);
    },
    updateService: (state, action) => {
      const index = state.services.servicesList.findIndex(
        service => service.id === action.payload.id
      );
      if (index !== -1) {
        state.services.servicesList[index] = {
          ...action.payload,
          price: action.payload.price.startsWith('$') 
            ? action.payload.price 
            : `$${action.payload.price}`,
        };
      }
    },
    removeService: (state, action) => {
      state.services.servicesList = state.services.servicesList.filter(
        service => service.id !== action.payload
      );
    },
    
    // Modal actions
    toggleCategoryModal: (state) => {
      state.modals.categoryModalVisible = !state.modals.categoryModalVisible;
    },
    toggleServiceModal: (state) => {
      state.modals.serviceModalVisible = !state.modals.serviceModalVisible;
    },
    
    // Reset actions
    resetRegistration: (state) => {
      state.registration = initialState.registration;
    },
    resetSalonInfo: (state) => {
      state.salonInfo = initialState.salonInfo;
    },
  },
});

export const {
  setPhoneNumber,
  setVerificationCode,
  verifyCode,
  acceptTerms,
  setCoverImage,
  setLogoImage,
  setSalonName,
  addSalonCategory,
  removeSalonCategory,
  setSalonAddress,
  setContactNumber,
  setInstagram,
  setDirection,
  setDescription,
  setBankDetails,
  toggleCreditCard,
  addServiceCategory,
  removeServiceCategory,
  addService,
  updateService,
  removeService,
  toggleCategoryModal,
  toggleServiceModal,
  resetRegistration,
  resetSalonInfo,
} = salonSlice.actions;

export default salonSlice.reducer;