export default function StudentDashboard() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your learning portal. Use the sidebar to navigate to your
          books, progress, and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Quick Access</h3>
          <p className="text-sm text-muted-foreground">
            Navigate to your library to start reading your course materials.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">
            Check your reading progress and recent bookmarks.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize your reading experience with accessibility options.
          </p>
        </div>
      </div>
    </div>
  );
}
