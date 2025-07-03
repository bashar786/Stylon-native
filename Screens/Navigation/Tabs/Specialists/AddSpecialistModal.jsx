import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import ImgPlaceHolder from "../../../../assets/images/ImgPlaceHolder.png";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

const sampleCategories = ["Hair", "Nails", "Massage", "Facial"];
const sampleServices = ["Cut", "Color", "Manicure", "Pedicure", "Swedish Massage"];

export default function AddSpecialistModal({
  visible,
  onClose,
  name,
  setName,
  role,
  setRole,
  phone = "",
  setPhone,
  imageUri,
  pickImage,
  workingHours = {},
  setWorkingHours,
  selectedCategories = [],
  setSelectedCategories,
  selectedServices = [],
  setSelectedServices,
  handleAddSpecialist,
  isEdit = false,
}) {
  const onSave = () => {
    if (!name.trim() || !role.trim() || !imageUri || !phone.trim()) {
      alert("Please complete all required fields.");
      return;
    }
    handleAddSpecialist();
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleService = (srv) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const toggleSelectAllServices = () => {
    if (selectedServices.length === sampleServices.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices([...sampleServices]);
    }
  };

  const updateHours = (day, field, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
      propagateSwipe
      avoidKeyboard
    >
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <AntDesign name="closecircle" size={24} color="#000" />
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 50 }}
          >
            <Text style={styles.modalTitle}>
              {isEdit ? "Edit Specialist" : "Add Specialist"}
            </Text>

            <TouchableOpacity
              onPress={pickImage}
              style={{ alignItems: "center", marginVertical: 16 }}
            >
              <Image
                source={imageUri ? { uri: imageUri } : ImgPlaceHolder}
                style={styles.imagePreview}
              />
            </TouchableOpacity>

            <TextInput
              placeholder="Name"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <TextInput
              placeholder="Role"
              placeholderTextColor="#666"
              value={role}
              onChangeText={setRole}
              style={styles.input}
            />

            <View style={styles.inputBox}>
              <TextInput
                keyboardType="phone-pad"
                style={styles.Input}
                placeholder="Phone Number"
                placeholderTextColor={'#999'}
                value={phone}
                onChangeText={(value) => {
                  let cleaned = value.replace(/[^\d+]/g, '');
                  if (!cleaned.startsWith('+')) {
                    cleaned = '+' + cleaned.replace(/[^\d]/g, '');
                  }
                  setPhone(cleaned);
                }}
                maxLength={12}
              />
            </View>

            <Text style={styles.sectionTitle}>Working Hours</Text>
            {daysOfWeek.map((day) => (
              <View key={day} style={styles.workingRow}>
                <Text style={styles.dayLabel}>{day}</Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Start"
                  value={workingHours[day]?.start || ""}
                  onChangeText={(value) => updateHours(day, "start", value)}
                />
                <TextInput
                  style={styles.timeInput}
                  placeholder="End"
                  value={workingHours[day]?.end || ""}
                  onChangeText={(value) => updateHours(day, "end", value)}
                />
              </View>
            ))}

            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.tagsWrap}>
              {sampleCategories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.tag,
                    selectedCategories.includes(cat) && styles.tagSelected,
                  ]}
                  onPress={() => toggleCategory(cat)}
                >
                  <Text style={{
                    color: selectedCategories.includes(cat) ? "white" : "#000",
                  }}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity
              onPress={toggleSelectAllServices}
              style={styles.selectAllButton}
            >
              <Text style={{ fontFamily: "Regular", color: "#FF402D" }}>
                Select All
              </Text>
            </TouchableOpacity>

            <View style={styles.tagsWrap}>
              {sampleServices.map((srv) => (
                <TouchableOpacity
                  key={srv}
                  style={[
                    styles.tag,
                    selectedServices.includes(srv) && styles.tagSelected,
                  ]}
                  onPress={() => toggleService(srv)}
                >
                  <Text style={{
                    color: selectedServices.includes(srv) ? "white" : "#000",
                  }}>
                    {srv}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveButtonText}>
                {isEdit ? "Update" : "Save Specialist"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get("window").height * 0.85,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontFamily: "Regular",
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  Input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Regular',
  },
  sectionTitle: {
    fontFamily: "SemiBold",
    fontSize: 16,
    marginVertical: 10,
  },
  workingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dayLabel: {
    flex: 1,
    fontFamily: "Regular",
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 4,
    fontFamily: "Regular",
  },
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  tagSelected: {
    backgroundColor: "#FF402D",
    borderColor: "#FF402D",
  },
  saveButton: {
    backgroundColor: "#FF402D",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  selectAllButton: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
