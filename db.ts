import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import {
  Student,
  Teacher,
  ClassRoom,
  Subject,
  AttendanceRecord,
  Exam,
  ExamMark,
  FeeInvoice,
  TimetableSlot,
  Announcement,
  SchoolSettings
} from '../types';
import {
  SAMPLE_STUDENTS,
  SAMPLE_TEACHERS,
  SAMPLE_CLASSES,
  SAMPLE_SUBJECTS,
  SAMPLE_ATTENDANCE,
  SAMPLE_EXAMS,
  SAMPLE_MARKS,
  SAMPLE_FEES,
  SAMPLE_TIMETABLE,
  SAMPLE_ANNOUNCEMENTS,
  INITIAL_SCHOOL_SETTINGS
} from './mockData';

// Firestore Collection Helpers with Local Fallback memory cache for ultimate speed

export async function seedFirestoreIfEmpty(): Promise<boolean> {
  try {
    const studentsSnap = await getDocs(collection(db, 'students'));
    if (!studentsSnap.empty) {
      return false; // Already seeded
    }

    // Seed Students
    for (const s of SAMPLE_STUDENTS) {
      await setDoc(doc(db, 'students', s.id), s);
    }

    // Seed Teachers
    for (const t of SAMPLE_TEACHERS) {
      await setDoc(doc(db, 'teachers', t.id), t);
    }

    // Seed Classes
    for (const c of SAMPLE_CLASSES) {
      await setDoc(doc(db, 'classes', c.id), c);
    }

    // Seed Subjects
    for (const sb of SAMPLE_SUBJECTS) {
      await setDoc(doc(db, 'subjects', sb.id), sb);
    }

    // Seed Attendance
    for (const att of SAMPLE_ATTENDANCE) {
      await setDoc(doc(db, 'attendance', att.id), att);
    }

    // Seed Exams
    for (const ex of SAMPLE_EXAMS) {
      await setDoc(doc(db, 'exams', ex.id), ex);
    }

    // Seed Marks
    for (const m of SAMPLE_MARKS) {
      await setDoc(doc(db, 'marks', m.id), m);
    }

    // Seed Fees
    for (const f of SAMPLE_FEES) {
      await setDoc(doc(db, 'fees', f.id), f);
    }

    // Seed Timetable
    for (const tt of SAMPLE_TIMETABLE) {
      await setDoc(doc(db, 'timetables', tt.id), tt);
    }

    // Seed Announcements
    for (const a of SAMPLE_ANNOUNCEMENTS) {
      await setDoc(doc(db, 'announcements', a.id), a);
    }

    // Seed School Settings
    await setDoc(doc(db, 'schoolSettings', 'global'), INITIAL_SCHOOL_SETTINGS);

    return true;
  } catch (err) {
    console.warn('Firestore seed warning or fallback:', err);
    return false;
  }
}

// Generic Fetch Function with Fallback Data
export async function getCollectionData<T>(collectionName: string, fallbackData: T[]): Promise<T[]> {
  try {
    const snap = await getDocs(collection(db, collectionName));
    if (snap.empty) {
      return fallbackData;
    }
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as unknown as T);
  } catch (error) {
    console.warn(`Error fetching ${collectionName} from Firestore, using fallback:`, error);
    return fallbackData;
  }
}

// CRUD Operations for Students
export async function fetchStudents(): Promise<Student[]> {
  return getCollectionData<Student>('students', SAMPLE_STUDENTS);
}

export async function saveStudent(student: Student): Promise<void> {
  try {
    await setDoc(doc(db, 'students', student.id), student);
  } catch (err) {
    console.warn('Error saving student to Firestore:', err);
  }
}

export async function deleteStudent(studentId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'students', studentId));
  } catch (err) {
    console.warn('Error deleting student from Firestore:', err);
  }
}

// CRUD Operations for Teachers
export async function fetchTeachers(): Promise<Teacher[]> {
  return getCollectionData<Teacher>('teachers', SAMPLE_TEACHERS);
}

export async function saveTeacher(teacher: Teacher): Promise<void> {
  try {
    await setDoc(doc(db, 'teachers', teacher.id), teacher);
  } catch (err) {
    console.warn('Error saving teacher to Firestore:', err);
  }
}

export async function deleteTeacher(teacherId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'teachers', teacherId));
  } catch (err) {
    console.warn('Error deleting teacher:', err);
  }
}

// CRUD Operations for Classes
export async function fetchClasses(): Promise<ClassRoom[]> {
  return getCollectionData<ClassRoom>('classes', SAMPLE_CLASSES);
}

export async function saveClass(cls: ClassRoom): Promise<void> {
  try {
    await setDoc(doc(db, 'classes', cls.id), cls);
  } catch (err) {
    console.warn('Error saving class:', err);
  }
}

// CRUD Operations for Subjects
export async function fetchSubjects(): Promise<Subject[]> {
  return getCollectionData<Subject>('subjects', SAMPLE_SUBJECTS);
}

export async function saveSubject(subject: Subject): Promise<void> {
  try {
    await setDoc(doc(db, 'subjects', subject.id), subject);
  } catch (err) {
    console.warn('Error saving subject:', err);
  }
}

// Attendance
export async function fetchAttendance(): Promise<AttendanceRecord[]> {
  return getCollectionData<AttendanceRecord>('attendance', SAMPLE_ATTENDANCE);
}

export async function saveAttendanceRecords(records: AttendanceRecord[]): Promise<void> {
  try {
    for (const rec of records) {
      await setDoc(doc(db, 'attendance', rec.id), rec);
    }
  } catch (err) {
    console.warn('Error saving attendance records:', err);
  }
}

// Exams & Marks
export async function fetchExams(): Promise<Exam[]> {
  return getCollectionData<Exam>('exams', SAMPLE_EXAMS);
}

export async function saveExam(exam: Exam): Promise<void> {
  try {
    await setDoc(doc(db, 'exams', exam.id), exam);
  } catch (err) {
    console.warn('Error saving exam:', err);
  }
}

export async function fetchMarks(): Promise<ExamMark[]> {
  return getCollectionData<ExamMark>('marks', SAMPLE_MARKS);
}

export async function saveMark(mark: ExamMark): Promise<void> {
  try {
    await setDoc(doc(db, 'marks', mark.id), mark);
  } catch (err) {
    console.warn('Error saving mark:', err);
  }
}

// Fees
export async function fetchFees(): Promise<FeeInvoice[]> {
  return getCollectionData<FeeInvoice>('fees', SAMPLE_FEES);
}

export async function saveFee(fee: FeeInvoice): Promise<void> {
  try {
    await setDoc(doc(db, 'fees', fee.id), fee);
  } catch (err) {
    console.warn('Error saving fee:', err);
  }
}

// Timetable
export async function fetchTimetable(): Promise<TimetableSlot[]> {
  return getCollectionData<TimetableSlot>('timetables', SAMPLE_TIMETABLE);
}

export async function saveTimetableSlot(slot: TimetableSlot): Promise<void> {
  try {
    await setDoc(doc(db, 'timetables', slot.id), slot);
  } catch (err) {
    console.warn('Error saving timetable slot:', err);
  }
}

// Announcements
export async function fetchAnnouncements(): Promise<Announcement[]> {
  return getCollectionData<Announcement>('announcements', SAMPLE_ANNOUNCEMENTS);
}

export async function saveAnnouncement(ann: Announcement): Promise<void> {
  try {
    await setDoc(doc(db, 'announcements', ann.id), ann);
  } catch (err) {
    console.warn('Error saving announcement:', err);
  }
}

export async function deleteAnnouncement(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'announcements', id));
  } catch (err) {
    console.warn('Error deleting announcement:', err);
  }
}

// School Settings
export async function fetchSchoolSettings(): Promise<SchoolSettings> {
  try {
    const snap = await getDoc(doc(db, 'schoolSettings', 'global'));
    if (snap.exists()) {
      return snap.data() as SchoolSettings;
    }
    return INITIAL_SCHOOL_SETTINGS;
  } catch (err) {
    return INITIAL_SCHOOL_SETTINGS;
  }
}

export async function saveSchoolSettings(settings: SchoolSettings): Promise<void> {
  try {
    await setDoc(doc(db, 'schoolSettings', 'global'), settings);
  } catch (err) {
    console.warn('Error saving school settings:', err);
  }
}
