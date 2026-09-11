export type QueueStatus = 'arrived'|'waiting'|'consultation'|'completed'|'no_show';
export type DoctorStatus = 'available'|'delayed'|'emergency'|'unavailable';
export type QueueItem = { id:string; appointment_number:number; patient_name:string; doctor_name:string; service_name:string; status:QueueStatus; checked_in_at:string; };
export type Appointment = { id:string; appointment_number:number; patient_name:string; phone:string; email:string; doctor_id:string; service_slug:string; appointment_date:string; appointment_time:string; status:'booked'|'arrived'|'completed'|'cancelled'|'no_show'; };
