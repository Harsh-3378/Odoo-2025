import { api } from './api';

// Define types for your API responses
interface Course {
  id: string;
  name: string;
  lecturesno: number;
  duration: number;
  instructor_name: string;
  start_hr: number;
  end_hr: number;
}

interface TimeTableResponse {
  id: string;
  name: string;
  courses: Course[];
  createdAt: string;
  updatedAt: string;
}

// Extend the base API
export const timeTableApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => '/courses',
      providesTags: ['Courses'],
    }),

    addCourse: builder.mutation<Course, Partial<Course>>({
      query: (course) => ({
        url: '/add-course',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Courses'],
    }),

    getTimeTables: builder.query<TimeTableResponse[], void>({
      query: () => '/timetables',
      providesTags: ['TimeTable'],
    }),

    generateTimeTable: builder.mutation<TimeTableResponse, { name: string; advanced?: boolean }>({
      query: (body) => ({
        url: '/generate-timetable',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TimeTable'],
    }),

    // Example of a premium feature that would need access control in the UI
    exportTimeTable: builder.mutation<{ url: string }, { id: string; format: 'pdf' | 'excel' }>({
      query: ({ id, format }) => ({
        url: `/timetables/${id}/export`,
        method: 'POST',
        body: { format },
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useAddCourseMutation,
  useGetTimeTablesQuery,
  useGenerateTimeTableMutation,
  useExportTimeTableMutation,
} = timeTableApi;
