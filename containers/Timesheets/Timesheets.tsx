import React, { useState, useEffect } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/molecules/Header';
import CustomText from '../../components/atoms/CustomText/CustomText';
import { useAuth } from '../../contexts/AuthContext'; // Get the auth token from context
import { useLoading } from '../../contexts/LoadingContext';
import styles from './Timesheets.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { formatDistanceToNow, isToday, isYesterday, format } from 'date-fns';
import { getFarmerEmployeeTimesheets } from '../../services/employee';
import { RouteProp, useRoute } from '@react-navigation/native';
import Colors from '../../constants/Colors';


// Define the navigation type for Home screen
type TimesheetsNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Timesheets'>;

type TimesheetsRouteProp = RouteProp<AuthStackParamList, 'Timesheets'>;

interface TimesheetsProps {
    navigation: TimesheetsNavigationProp;
}

// Define the shape of a timesheet object
interface Timesheet {
    clockInTime: string;
    clockOutTime: string | null;
    dateWorked: string;
    minutesWorked: number;
    timesheetId: string;
}

const Timesheets: React.FC<TimesheetsProps> = ({ navigation }) => {
    // Set the type of timesheets as Timesheet[]
    const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
    const { authToken } = useAuth(); // Get authToken from AuthContext
    const { setLoading } = useLoading();
    const route = useRoute<TimesheetsRouteProp>()
    const { employeeId } = route.params

    useEffect(() => {
        setLoading(true);
        const fetchTimesheets = async () => {
            try {
                const response = await getFarmerEmployeeTimesheets(authToken, employeeId); // Fetch timesheets from API
                setTimesheets(response.timesheets); // Ensure the response is typed correctly
            } catch (error) {
                console.error("Error fetching timesheets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimesheets();
    }, [authToken]);


    // Function to format minutes into hours and minutes
    const formatMinutesWorked = (minutes: number) => {
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
        }
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    };

    const renderTimesheets = () => {
        if (timesheets.length === 0) {
            return <CustomText>No Timesheets available</CustomText>;
        }

        return timesheets.map((timesheet, index) => {
            const clockInDate = new Date(timesheet.clockInTime);
            const clockOutDate = timesheet.clockOutTime ? new Date(timesheet.clockOutTime) : null;

            // Determine how to show the date (Today, Yesterday, or actual date)
            const dateWorked = isToday(new Date(timesheet.dateWorked))
                ? 'Today'
                : isYesterday(new Date(timesheet.dateWorked))
                    ? 'Yesterday'
                    : format(new Date(timesheet.dateWorked), 'MMMM dd, yyyy'); // Full date

            // Format punch-in time in a more readable way
            const clockInTime = format(clockInDate, 'h:mm a'); // "5:30 PM" format
            const clockOutTime = clockOutDate
                ? format(clockOutDate, 'h:mm a') // "5:45 PM" format
                : 'Still working';

            // Show how long ago the punch-in happened
            const clockInDistance = formatDistanceToNow(clockInDate, { addSuffix: true }); // e.g. "5 minutes ago"

            return (
                <Pressable key={index} style={styles.timesheetItem}>
                    <CustomText size={14} weight='600'>Date Worked: <CustomText size={14} color={Colors.romanSilver2}>{dateWorked}</CustomText></CustomText>
                    <CustomText size={14} weight='600'>Punch In:
                        <CustomText size={14} color={Colors.romanSilver}> {clockInTime} ({clockInDistance})</CustomText>
                    </CustomText>
                    <CustomText size={14} weight='600'>Punch Out:
                        <CustomText color={Colors.romanSilver} size={14}>
                            {' '}{clockOutTime}
                        </CustomText>
                    </CustomText>
                    {timesheet.minutesWorked ? (
                        <CustomText size={14} weight='600'>Work duration:
                            <CustomText size={14} color={Colors.romanSilver}>
                                {' '}{formatMinutesWorked(timesheet.minutesWorked)}
                            </CustomText>
                        </CustomText>
                    ) : null}
                </Pressable>
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Timesheets" isBackButtonVisible onBackPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    {renderTimesheets()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Timesheets;