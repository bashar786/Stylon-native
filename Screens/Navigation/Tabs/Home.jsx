import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import SaloonImg from '../../../assets/images/saloonimg.png'
import Create from '../../../assets/images/create.svg'
import Calendar from '../../../assets/images/calendaradd.svg'
import Share from '../../../assets/images/share.svg'
import UpcomingAppoitment from './components/UpcomingCardHome.jsx';
import AppointmentRequests from './components/widgets/AppointmentRequests.jsx';
import { useNavigation } from 'expo-router'

const Home = () => {
  const SaloonName = 'Rouge Beauty Salon';
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.MainContainer}>

         <View style={styles.container}>
    <Image
      source={SaloonImg}
      style={styles.image}
    />
    <View style={styles.textContainer}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.salonName}>{SaloonName}</Text>
    </View>
    </View>
<View style={styles.flexImages}>
  <TouchableOpacity onPress={()=> navigation.navigate('Specialists')}>
<Create />
</TouchableOpacity>
<TouchableOpacity onPress={()=> navigation.navigate('AppointmentHistory')}>
<Calendar />
</TouchableOpacity>
<TouchableOpacity>
<Share />
</TouchableOpacity>
</View>
<UpcomingAppoitment />
<AppointmentRequests />
  </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  MainContainer : {
backgroundColor: '#fff',
width: '100%',
paddingHorizontal: 20,

  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 31,

  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20
  },
  welcomeText: {
    fontSize: 14,
    color: '#203052',
    fontFamily: 'Regular',
    marginBottom: 4,
  },
  salonName: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'SemiBold'

  },
  flexImages :{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 41,
  },
})