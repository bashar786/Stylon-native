import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import ImgPlaceHolder from "../../../../assets/images/ImgPlaceHolder.png";
import { Dimensions } from "react-native";
import AddSpecialistModal from "./AddSpecialistModal";
import { useNavigation } from "@react-navigation/native";
import { addSpecialist, setSelectedSpecialist } from "../../../../redux/reducer/bookingSlice";

// Helper: generate hourly slots from 9 to 17
const generateDefaultSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(formatTime(hour, 0));
    if (hour !== 17) {
      // Don't add 5:30 PM, end at 5:00 PM
      slots.push(formatTime(hour, 30));
    }
  }
  return slots;
};

// Helper function
const formatTime = (hour, minute) => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute = minute === 0 ? "00" : minute;
  return `${displayHour}:${displayMinute} ${ampm}`;
};

export default function SpecialistBookingScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const specialists = useSelector((state) => state.booking.specialists);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [calSelectedDays, setCalSelectedDays] = useState([]);
  const [slotSelections, setSlotSelections] = useState({});

  // Booking UI state
  const selectedSpecialistId = useSelector(state => state.booking.selectedSpecialistId);
  const selectedSpecialist = specialists.find(s => s.id === selectedSpecialistId);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [userSlots, setUserSlots] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const openAddModal = () => {
    setName("");
    setRole("");
    setImageUri(null);
    setCalSelectedDays([]);
    setSlotSelections({});
    setAddModalVisible(true);
  };
  const closeAddModal = () => setAddModalVisible(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const toggleDay = (day) => {
    const date = day.dateString;
    setCalSelectedDays((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
    // initialize default slots if new
    if (!slotSelections[date]) {
      setSlotSelections((prev) => ({
        ...prev,
        [date]: generateDefaultSlots().map((s) => ({
          time: s,
          selected: false,
        })),
      }));
    }
  };

  const toggleSlot = (date, slot) => {
    setSlotSelections((prev) => ({
      ...prev,
      [date]: prev[date].map((s) =>
        s.time === slot ? { ...s, selected: !s.selected } : s
      ),
    }));
  };

  const handleAddSpecialist = () => {
    const availableSlots = {};
  
    calSelectedDays.forEach(date => {
      const daySlots = slotSelections[date];
      if (daySlots) {
        const selectedSlots = daySlots
          .filter(slot => slot.selected)
          .map(slot => slot.time);
  
        if (selectedSlots.length > 0) {
          availableSlots[date] = selectedSlots;
        }
      }
    });
  
    const newSpecialist = {
      id: Date.now().toString(),
      name,
      role,
      imageUri,
      availableSlots,
    };
  
    dispatch(addSpecialist(newSpecialist));
    closeAddModal();
  };

  const handleSpecialistClick = (item) => {
    dispatch(setSelectedSpecialist(item.id));
    setSelectedDate(today);
    setSelectedTime(null);
  
    const customSlots = item.availableSlots?.[today];
    setUserSlots(
      customSlots && customSlots.length > 0
        ? customSlots
        : generateDefaultSlots()
    );
  };
  
  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedTime(null);

    const customSlots = selectedSpecialist?.availableSlots?.[day.dateString];
    setUserSlots(
      customSlots && customSlots.length > 0
        ? customSlots
        : generateDefaultSlots()
    );
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time === selectedTime ? null : time);
  };

  const handleBookAppointment = () => {
    if (!selectedSpecialist || !selectedDate || !selectedTime) return;
    
    navigation.navigate("CreateAnAppointment", {
      specialist: selectedSpecialist,
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Specialists</Text>
        <TouchableOpacity onPress={openAddModal}>
          <AntDesign name="pluscircleo" size={20} color="#707070" />
        </TouchableOpacity>
      </View>

      {/* Specialists */}
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 16,}}>
        <FlatList
          style={styles.Specialists}
          horizontal
          data={specialists}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSpecialistClick(item)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20,}}
            >
              {item.imageUri && (
                <Image
                  source={{ uri: item.imageUri }}
                  style={styles.specImage}
                />
              )}
              <Text style={styles.SpecialistName}>{item.name}</Text>
              <Text style={styles.SpecialistRole}>{item.role}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {selectedSpecialist && (
        <>
          <Text style={{ marginTop: 15, fontFamily: "Medium", fontSize: 16, marginBottom: 15, }}>
            Book with {selectedSpecialist.name}
          </Text>
          <Calendar
            onDayPress={handleDatePress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "#FF402D",
                selectedTextColor: "white",
                customStyles: {
                  container: {
                    backgroundColor: "#FF402D",
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  text: {
                    color: "white",
                    fontFamily: "Regular",
                  },
                },
              },
            }}
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
          
          <Text style={{ fontFamily: 'Medium', marginBottom: 15, marginTop: 10, fontSize: 16 }}>
            Available Slots:
          </Text>
          
          <View style={styles.slotRow}>
            {userSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slot,
                  selectedTime === slot && styles.slotSelected
                ]}
                onPress={() => handleTimeSelect(slot)}
              >
                <Text style={selectedTime === slot ? { color: 'white' } : {}}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedTime && (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleBookAppointment}
            >
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <AddSpecialistModal
        visible={addModalVisible}
        onClose={closeAddModal}
        name={name}
        setName={setName}
        role={role}
        setRole={setRole}
        imageUri={imageUri}
        pickImage={pickImage}
        calSelectedDays={calSelectedDays}
        toggleDay={toggleDay}
        slotSelections={slotSelections}
        toggleSlot={toggleSlot}
        handleAddSpecialist={handleAddSpecialist}
      />
    </ScrollView>
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
  SpecialistName: {
    fontFamily: 'Medium',
    fontSize: 16,
    paddingTop: 10,
  },
  SpecialistRole: {
    fontFamily: 'Light',
    fontSize: 14,
    color: '#707070',
    paddingTop: 5,
  },
  saveButton: {
    backgroundColor: "#FF402D",
    paddingVertical: 16,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  Specialists: {
    display: 'flex',
    gap: 20,
  },
  bookButton: {
    backgroundColor: "#FF402D",
    padding: 15,
    borderRadius: 100,
    marginTop: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontFamily: 'SemiBold',
    fontSize: 16,
  },
});