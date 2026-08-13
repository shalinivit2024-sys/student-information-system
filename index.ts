export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  linkedStudentId?: string; // For parent or student user
  linkedTeacherId?: string; // For teacher user
  createdAt?: string;
}

export interface Student {
  id: string;
  rollNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  classId: string;
  className: string; // e.g. "Grade 10-A" or "B.Tech CS - Year 2"
  section: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  bloodGroup: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  avatarUrl?: string;
  gpa?: number;
  attendancePercentage?: number;
}

export interface Teacher {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  qualification: string;
  subjects: string[]; // Subject IDs or names
  assignedClassId?: string; // e.g. Class Teacher of 10-A
  assignedClassName?: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  avatarUrl?: string;
}

export interface ClassRoom {
  id: string;
  name: string; // e.g., "Grade 10-A"
  gradeLevel: string; // e.g., "10th Grade"
  section: string; // "A"
  capacity: number;
  studentCount: number;
  classTeacherId?: string;
  classTeacherName?: string;
  roomNumber: string;
}

export interface Subject {
  id: string;
  code: string; // e.g. "CS101"
  name: string; // e.g. "Data Structures"
  department: string;
  credits: number;
  description?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  classId: string;
  className: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  remarks?: string;
}

export interface Exam {
  id: string;
  title: string; // e.g. "Mid-Term Spring 2026"
  term: 'Mid-Term' | 'Final' | 'Quarterly' | 'Quiz';
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  examDate: string;
  startTime: string;
  endTime: string;
  maxMarks: number;
  passingMarks: number;
}

export interface ExamMark {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  subjectName: string;
  marksObtained: number;
  maxMarks: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  remarks?: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  className: string;
  rollNumber: string;
  title: string; // e.g. "Spring 2026 Tuition Fee"
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  paymentDate?: string;
  paymentMethod?: 'Credit Card' | 'Bank Transfer' | 'Cash' | 'UPI';
  category: 'Tuition' | 'Lab' | 'Library' | 'Sports' | 'Transport';
}

export interface TimetableSlot {
  id: string;
  classId: string;
  className: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  periodNumber: number; // 1 to 7
  startTime: string;
  endTime: string;
  subjectName: string;
  teacherName: string;
  roomNumber: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  authorName: string;
  authorRole: string;
  targetAudience: 'All' | 'Teachers' | 'Students' | 'Parents';
  priority: 'High' | 'Medium' | 'Low';
  category: 'Academic' | 'Sports' | 'Exam' | 'General' | 'Event';
  isPinned?: boolean;
}

export interface CourseProgram {
  id: string;
  title: string;
  code: string;
  degree: string;
  duration: string;
  department: string;
  description: string;
  iconName: string;
  totalStudents: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export interface SchoolSettings {
  institutionName: string;
  tagline: string;
  logoUrl: string;
  academicYear: string;
  email: string;
  phone: string;
  address: string;
  gradingScale: string;
  enableNotifications: boolean;
}
