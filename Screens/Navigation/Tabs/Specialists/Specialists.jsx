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

const generateDefaultSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(formatTime(hour, 0));
    if (hour !== 17) {
      slots.push(formatTime(hour, 30));
    }
  }
  return slots;
};

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

  const selectedSpecialistId = useSelector(state => state.booking.selectedSpecialistId);
  const selectedSpecialist = specialists.find(s => s.id === selectedSpecialistId);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [userSlots, setUserSlots] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [phone, setPhone] = useState('');
  const [workingHours, setWorkingHours] = useState({
    Monday: { start: '', end: '' },
    Tuesday: { start: '', end: '' },
    Wednesday: { start: '', end: '' },
    Thursday: { start: '', end: '' },
    Friday: { start: '', end: '' },
    Saturday: { start: '', end: '' },
    Sunday: { start: '', end: '' },
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [viewMode, setViewMode] = useState("");

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

  const handleAddSpecialist = () => {
    const availableSlots = {};
    calSelectedDays.forEach(date => {
      const daySlots = slotSelections[date];
      if (daySlots) {
        const selectedSlots = daySlots.filter(slot => slot.selected).map(slot => slot.time);
        if (selectedSlots.length > 0) {
          availableSlots[date] = selectedSlots;
        }
      }
    });

    const newSpecialist = {
      id: Date.now().toString(),
      name,
      role,
      phone,
      imageUri,
      workingHours,
      categories: selectedCategories,
      services: selectedServices,
      availableSlots,
    };

    dispatch(addSpecialist(newSpecialist));
    closeAddModal();
  };

  const handleSpecialistClick = (item) => {
    dispatch(setSelectedSpecialist(item.id));
    setViewMode("info");
  };

  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedTime(null);
    const customSlots = selectedSpecialist?.availableSlots?.[day.dateString];
    setUserSlots(customSlots && customSlots.length > 0 ? customSlots : generateDefaultSlots());
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
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 24, fontFamily: "Bold", marginBottom: 10 }}>Specialists</Text>
        <TouchableOpacity onPress={openAddModal}>
          <AntDesign name="pluscircleo" size={20} color="#707070" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={specialists}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSpecialistClick(item)}
            style={{ alignItems: 'center', marginRight: 20 }}
          >
            {item.imageUri && <Image source={{ uri: item.imageUri }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
            <Text style={{ fontFamily: 'Medium', fontSize: 16, paddingTop: 10 }}>{item.name}</Text>
            <Text style={{ fontFamily: 'Light', fontSize: 14, color: '#707070' }}>{item.role}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedSpecialist && viewMode === "info" && (
        <View>
          <Text style={{ fontSize: 18, fontFamily: "Bold", marginTop: 20, marginBottom: 10, }}>{selectedSpecialist.name}</Text>
          <Text style={styles.subheading}>Role: {selectedSpecialist.role}</Text>
          <Text style={styles.subheading}>Phone: {selectedSpecialist.phone}</Text>

          <Text style={{ fontFamily: "SemiBold", fontSize: 16,  marginTop: 0, marginBottom: 10, }}>Working Hours</Text>
          {Object.entries(selectedSpecialist.workingHours || {}).map(([day, hours]) => (
            <Text key={day} style={styles.subheading}>{day}: {hours.start} - {hours.end}</Text>
          ))}

          <Text style={{ fontFamily: "SemiBold", fontSize: 16,  marginTop: 10, marginBottom: 10,  }}>Categories</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {(selectedSpecialist.categories || []).map(cat => (
              <View key={cat} style={{ backgroundColor: '#FF402D', borderRadius: 20, paddingHorizontal: 14, margin: 4, paddingVertical: 10, }}>
                <Text style={{ color: 'white', fontFamily: 'Medium' }}>{cat}</Text>
              </View>
            ))}
          </View>

          <Text style={{ fontFamily: "SemiBold", fontSize: 16,  marginTop: 20, marginBottom: 10,}}>Services</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {(selectedSpecialist.services || []).map(srv => (
              <View key={srv} style={{ backgroundColor: '#FF402D', borderRadius: 20, paddingHorizontal: 14, margin: 4, paddingVertical: 10,  }}>
                <Text style={{ color: 'white', fontFamily: 'Medium' }}>{srv}</Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity onPress={() => setViewMode("book")} style={{ backgroundColor: '#FF402D', padding: 15, borderRadius: 100, flex: 1, marginRight: 5, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'SemiBold' }}>Book</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setName(selectedSpecialist.name);
              setRole(selectedSpecialist.role);
              setPhone(selectedSpecialist.phone);
              setWorkingHours(selectedSpecialist.workingHours || {});
              setSelectedCategories(selectedSpecialist.categories || []);
              setSelectedServices(selectedSpecialist.services || []);
              setImageUri(selectedSpecialist.imageUri || null);
              setAddModalVisible(true);
            }} style={{ backgroundColor: '#333', padding: 15, borderRadius: 100, flex: 1, marginLeft: 5, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'SemiBold' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {selectedSpecialist && viewMode === "book" && (
        <View>
          <Text style={{ marginTop: 15, fontFamily: "Medium", fontSize: 16 }}>Book with {selectedSpecialist.name}</Text>
          <Calendar
            onDayPress={handleDatePress}
            markedDates={{ [selectedDate]: { selected: true, selectedColor: "#FF402D" } }}
            markingType="custom"
            hideExtraDays={true}
            theme={{ todayTextColor: "#FF402D", textDayFontFamily: "Regular" }}
          />

          <Text style={{ fontFamily: 'Medium', marginBottom: 15, marginTop: 10, fontSize: 16 }}>Available Slots:</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}>
            {userSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  width: 100,
                  borderWidth: 1,
                  margin: 4,
                  borderRadius: 12,
                  borderColor: selectedTime === slot ? "#FF402D" : "#707070",
                  backgroundColor: selectedTime === slot ? "#FF402D" : "transparent",
                  alignItems: 'center'
                }}
                onPress={() => handleTimeSelect(slot)}
              >
                <Text style={{ color: selectedTime === slot ? 'white' : 'black' }}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedTime && (
            <TouchableOpacity onPress={handleBookAppointment} style={{ backgroundColor: "#FF402D", padding: 15, borderRadius: 100, marginTop: 20, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'SemiBold' }}>Book Appointment</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <AddSpecialistModal
        visible={addModalVisible}
        onClose={closeAddModal}
        name={name}
        setName={setName}
        role={role}
        setRole={setRole}
        phone={phone}
        setPhone={setPhone}
        imageUri={imageUri}
        pickImage={pickImage}
        workingHours={workingHours}
        setWorkingHours={setWorkingHours}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        handleAddSpecialist={handleAddSpecialist}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subheading:{
    fontFamily: 'Medium',
    marginBottom: 10
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