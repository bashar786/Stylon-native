import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, EvilIcons, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const dummyAppointments = [
  {
    id: 101,
    date: "2025-06-11",
    time: "10:00 AM",
    customerName: "John Doe",
    specialistName: "Dr. Sarah Lee",
    specialistRole: "Barber",
    specialistImage: require("../../../../../assets/images/sana.png"),
    orderNumber: "A001",
    services: [
      { name: "Haircut", time: "30 mins", price: "$20" },
      { name: "Beard Trim", time: "15 mins", price: "$10" },
    ],
  },
  {
    id: 102,
    date: "2025-06-15",
    time: "2:30 PM",
    customerName: "Emma Watson",
    specialistRole: "Owner",
    specialistName: "Dr. Mike Ross",
    specialistImage: require("../../../../../assets/images/hassan.png"),
    orderNumber: "A002",
    services: [
      { name: "Facial", time: "70 mins", price: "$40" },
      { name: "Massage", time: "1 hr", price: "$60" },
    ],
  },
  {
    id: 103,
    date: "2025-06-15",
    time: "4:00 PM",
    customerName: "Jake Paul",
    specialistRole: "Manager",
    specialistName: "Dr. Lisa Ray",
    specialistImage: require("../../../../../assets/images/raza.png"),
    orderNumber: "A003",
    services: [
      { name: "Manicure", time: "75 mins", price: "$15" },
    ],
  },
];

const categories = ["All", "Haircut", "Facial", "Massage", "Beard Trim", "Manicure"];

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedCat, setSelectedCat] = useState("All");
  const navigation = useNavigation();

  const markedDates = dummyAppointments.reduce((acc, appointment) => {
    acc[appointment.date] = {
      marked: true,
      dotColor: "green",
      selected: appointment.date === selectedDate,
      selectedColor: "#E6FFE6",
      selectedTextColor: "#000",
    };
    return acc;
  }, {});

  const applyFilters = () => {
    let filtered = dummyAppointments;

    if (selectedSpec) {
      filtered = filtered.filter(item => item.specialistName === selectedSpec.name);
    }

    if (selectedCat !== "All") {
      filtered = filtered.filter(item =>
        item.services.some(service => service.name === selectedCat)
      );
    }

    setAppointments(filtered);
    setFilterModalOpen(false);
  };

  const appointmentsForSelectedDay = appointments.filter(
    (a) => a.date === selectedDate
  );

  const allSpecialists = [
    {
      name: "Dr. Sarah Lee",
      image: require("../../../../../assets/images/sana.png"),
      role: 'Barber',
    },
    {
      name: "Dr. Mike Ross",
      image: require("../../../../../assets/images/raza.png"),
      role: 'Manager',
    },
    {
      name: "Dr. Lisa Ray",
      image: require("../../../../../assets/images/hassan.png"),
      role: 'Owner',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment History</Text>
        <TouchableOpacity onPress={() => setFilterModalOpen(true)}>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
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

<FlatList
  data={selectedDate ? appointmentsForSelectedDay : appointments}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
      <Text style={{fontSize: 18, color: '#000', fontFamily: 'SemiBold'}}>
         {item.customerName}
        </Text>
        <Text style={styles.color}>
          <AntDesign name="clockcircleo" size={16} /> {item.date} {item.time} 
        </Text>
        <Text style={styles.color}>
        <FontAwesome5 name="user-circle" size={16} /> {item.specialistName}
        </Text>
        <Text style={styles.color}>
        <FontAwesome name="calendar-check-o" size={16} /> {item.orderNumber}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AppointmentHistoryDetail", { appointment: item })}
      >
        <Text style={styles.viewDetail}>View Detail</Text>
      </TouchableOpacity>
    </View>
  )}
  ListEmptyComponent={
    <Text style={styles.noAppointments}>No appointments on this date.</Text>
}
/>

      <Modal visible={filterModalOpen} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setFilterModalOpen(false)}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filter Appointments</Text>

          <Text style={styles.sectionTitle}>Saloon Specialists</Text>
          <View style={styles.row}>
            {allSpecialists.map((spec) => (
              <TouchableOpacity
                key={spec.name}
                style={[
                  styles.specialistItem,
                ]}
                onPress={() =>
                  setSelectedSpec(
                    selectedSpec?.name === spec.name ? null : spec
                  )
                }
              >
          <Image
  source={spec.image}
  style={[
    styles.avatar,
    selectedSpec?.name === spec.name && styles.selectedBorder
  ]}
/>

            <Text style={{ fontSize: 14, textAlign: "center", fontFamily: 'Medium', }}>{spec.name}</Text>
                <Text style={{ fontSize: 12, textAlign: "center", fontFamily: 'Regular',color: '#7d7d7d' }}>{spec.role}</Text>

              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.row}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCat === cat && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCat(cat)}
              >
                <Text
                  style={{ color: selectedCat === cat ? "white" : "#000" }}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
            <Text style={{ color: "white", fontFamily: 'Medium' }}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 35,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "SemiBold",
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: 'red',
  },  
  color: {
   color: '#333',
   fontFamily: 'Medium',
   paddingTop: 5,
   display: 'flex',
   gap: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLeft: {
    flex: 1,
    gap: 4,
  },
  viewDetail: {
    color: "#FF402D",
    textDecorationLine: "underline",
    alignSelf: "center",
    fontWeight: "600",
    fontFamily: 'SemiBold'
  },
  noAppointments: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  modalContainer: {
    padding: 20,
    marginTop: 40,
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: 'Bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'SemiBold'
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  specialistItem: {
    alignItems: "center",
    marginRight: 10,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginBottom: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 100,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    alignSelf :'center',
  },
  selectedCategory: {
    backgroundColor: "#FF402D",
    borderColor: "#FF402D",
  },
  applyBtn: {
    marginTop: 30,
    backgroundColor: "#FF402D",
    padding: 16,
    alignItems: "center",
    borderRadius: 100,
  },
});
