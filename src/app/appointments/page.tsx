"use client";

import DoctorSelectionStep from '@/components/appointments/DoctorSelectionStep';
import ProgressSteps from '@/components/appointments/ProgressSteps';
import TimeSelectionStep from '@/components/appointments/TimeSelectionStep';
import Navbar from '@/components/Navbar'
import { APPOINTMENT_TYPES } from '@/lib/utils';
import { format } from 'date-fns';
import { useState } from 'react'
import { toast } from 'sonner';

function AppointmentsPage() {

  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1: select dentist, 2: select time, 3: confirm
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);

    // reset the state when dentist changes
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = async () => {
    if (!selectedDentistId || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

    bookAppointmentMutation.mutate(
      {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name,
      },
      {
        onSuccess: async (appointment) => {
          // store the appointment details to show in the modal
          setBookedAppointment(appointment);

          try {
            const emailResponse = await fetch("/api/send-appointment-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail: appointment.patientEmail,
                doctorName: appointment.doctorName,
                appointmentDate: format(new Date(appointment.date), "EEEE, MMMM d, yyyy"),
                appointmentTime: appointment.time,
                appointmentType: appointmentType?.name,
                duration: appointmentType?.duration,
                price: appointmentType?.price,
              }),
            });

            if (!emailResponse.ok) console.error("Failed to send confirmation email");
          } catch (error) {
            console.error("Error sending confirmation email:", error);
          }

          // show the success modal
          setShowConfirmationModal(true);

          // reset form
          setSelectedDentistId(null);
          setSelectedDate("");
          setSelectedTime("");
          setSelectedType("");
          setCurrentStep(1);
        },
        onError: (error) => toast.error(`Failed to book appointment: ${error.message}`),
      }
    );
  };

  return (
    // <div>AppointmentsPage</div>
    <>
        <Navbar />

        <div className='max-w-7xl mx-auto px-6 py-8 pt-24'>
          {/* Header */}
          <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">Find and book with verified dentists in your area</p>
          </div>
          <ProgressSteps currentStep={currentStep} />
          
          {currentStep === 1 && (
            <DoctorSelectionStep
              selectedDentistId={selectedDentistId}
              onContinue={() => setCurrentStep(2)}
              onSelectDentist={handleSelectDentist}
            />

          )}

          {currentStep === 2 && selectedDentistId && (
            <TimeSelectionStep
              selectedDentistId={selectedDentistId}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedType={selectedType}
              onBack={() => setCurrentStep(1)}
              onContinue={() => setCurrentStep(1)}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              onTypeChange={setSelectedType}
            />
          )}


        </div>
        
    </>
  )
}

export default AppointmentsPage