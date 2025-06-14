export default function InstructorDashboard() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Instructor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your teaching portal. Use the sidebar to manage courses,
          students, and materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Course Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage your courses, upload materials, and track student progress.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Student Analytics</h3>
          <p className="text-sm text-muted-foreground">
            View detailed analytics on student performance and engagement.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Communication</h3>
          <p className="text-sm text-muted-foreground">
            Send announcements, messages, and manage course communications.
          </p>
        </div>
      </div>
    </div>
  );
}
