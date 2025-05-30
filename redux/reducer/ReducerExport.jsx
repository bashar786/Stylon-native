// store/salonSelectors.js
export const selectRegistration = (state) => state.salon.registration;
export const selectSalonInfo = (state) => state.salon.salonInfo;
export const selectServices = (state) => state.salon.services;
export const selectModals = (state) => state.salon.modals;

// Specific selectors
export const selectPhoneNumber = (state) => state.salon.registration.phoneNumber;
export const selectIsVerified = (state) => state.salon.registration.isVerified;
export const selectTermsAccepted = (state) => state.salon.registration.termsAccepted;
export const selectCoverImage = (state) => state.salon.salonInfo.coverImage;
export const selectLogoImage = (state) => state.salon.salonInfo.logoImage;
export const selectSalonCategories = (state) => state.salon.salonInfo.categories;
export const selectServiceCategories = (state) => state.salon.services.categories;
export const selectServicesList = (state) => state.salon.services.servicesList;
export const selectCategoryModalVisible = (state) => state.salon.modals.categoryModalVisible;
export const selectServiceModalVisible = (state) => state.salon.modals.serviceModalVisible;