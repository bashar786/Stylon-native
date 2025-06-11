// components/AddSpecialistModal.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet
} from "react-native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import ImgPlaceHolder from "../../../../assets/images/ImgPlaceHolder.png";

export default function AddSpecialistModal({
  visible,
  onClose,
  name,
  setName,
  role,
  setRole,
  imageUri,
  pickImage,
  calSelectedDays,
  toggleDay,
  slotSelections,
  toggleSlot,
  handleAddSpecialist,
}) {
    const onSave = () => {
        if (!name.trim()) {
          alert("Please enter the specialist's name.");
          return;
        }
      
        if (!role.trim()) {
          alert("Please enter the specialist's role.");
          return;
        }
      
        if (!imageUri) {
          alert("Please select a profile image.");
          return;
        }
      
        handleAddSpecialist(); // All fields valid, proceed
      };
      
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={[styles.modal, { maxHeight: Dimensions.get("window").height * 0.85 }]}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <AntDesign name="closecircle" size={24} color="#000" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.modalTitle}>Add Specialist</Text>

          {/* Image Picker */}
          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={imageUri ? { uri: imageUri } : ImgPlaceHolder}
                style={styles.imagePreview}
              />
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <TextInput
            placeholderTextColor="#666"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor="#666"
            placeholder="Role"
            value={role}
            onChangeText={setRole}
            style={styles.input}
          />

          {/* Calendar */}
          <Calendar
            onDayPress={toggleDay}
            markedDates={calSelectedDays.reduce(
              (m, d) => ({
                ...m,
                [d]: {
                  selected: true,
                  selectedColor: "#FF402D",
                  selectedTextColor: "white",
                },
              }),
              {}
            )}
            markingType="custom"
            hideExtraDays={true}
            theme={{
              backgroundColor: "white",
              calendarBackground: "white",
              todayTextColor: "#FF402D",
              dayTextColor: "#000",
              textDisabledColor: "#222",
              monthTextColor: "#FF402D",
              selectedDayBackgroundColor: "#FF402D",
              selectedDayTextColor: "#fff",
              textDayFontFamily: "Regular",
              textMonthFontFamily: "Regular",
              textDayHeaderFontFamily: "Regular",
              arrowColor: "#FF402D",
            }}
          />

          {/* Time Slots */}
          {calSelectedDays.map((date) => (
            <View key={date}>
              <Text style={styles.SlotDate}>{date}</Text>
              <View style={styles.slotRow}>
                {slotSelections[date]?.map((s) => (
                  <TouchableOpacity
                    key={s.time}
                    style={[styles.slot, s.selected && styles.slotSelected]}
                    onPress={() => toggleSlot(date, s.time)}
                  >
                    <Text>{s.time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

<TouchableOpacity style={styles.saveButton} onPress={onSave}>

            <Text style={styles.saveButtonText}>Save Specialist</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    header: { flexDirection: "row", justifyContent: "space-between" },
    heading: { fontSize: 24, fontFamily: "Bold" },
    specImage: { width: 60, height: 60, borderRadius: 30 },
    modal: {
      backgroundColor: "white",
      paddingVertical: 30,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    modalTitle: { fontSize: 18, marginBottom: 10, fontFamily: "Bold" },
    slotRow: { 
      flexDirection: "row", 
      flexWrap: "wrap", 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    slot: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      borderWidth: 1,
      margin: 4,
      borderRadius: 12,
      borderColor: "#707070",
      fontFamily: "Regular",
    },
    
    slotSelected: {
      backgroundColor: "#FF402D",
      borderColor: "#FF402D",
      fontFamily: 'Regular',
    },
    SlotDate: {
      fontFamily: 'Medium',
      marginBottom: 10,
      marginTop: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: "#9D9D9D",
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginVertical: 8,
      fontFamily: "Regular",
      fontSize: 15,
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "#eee",
      borderWidth: 1,
      borderColor: "#ccc",
    },
    closeIcon: {
      position: "absolute",
      top: 5,
      right: 5,
    },
    SpecialistName:{
      fontFamily: 'Medium',
      fontSize: 16,
      paddingTop: 10,
    },
    SpecialistRole:{
      fontFamily: 'Light',
      fontSize: 14,
      color: '#707070',
      paddingTop: 5,
    },
    saveButton:{
      backgroundColor: "#FF402D",
      paddingVertical: 12,
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  marginTop: 20,
    },
    saveButtonText:{
      color: "white",
      fontFamily: "SemiBold",
      fontSize: 16,
    },
    Specialists: {
      display: 'flex',
      gap: 20,
    },
    });
  