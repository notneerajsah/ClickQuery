

const About = () => {
  return (
    <div className="min-h-screen p-8  flex flex-col items-center bg-fuchsia-400">
      <div className="max-w-4xl bg-fuchsi-400 shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          About Our Database Management Tool
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Welcome to our innovative database management tool! Our platform allows you to easily create and manage your databases without the need to write complex SQL queries. Whether you're a beginner or an experienced developer, our user-friendly interface simplifies the process of setting up and managing your data.
        </p>
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Features</h2>
        <ul className="list-disc list-inside mb-6 text-gray-600">
          <li>Create tables with a simple form-based interface.</li>
          <li>Define columns with various data types such as integers, text, and more.</li>
          <li>Insert, update, and delete data effortlessly.</li>
          <li>Visualize your database structure and data.</li>
          <li>Export and import data for backup and sharing.</li>
        </ul>
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">How It Works</h2>
        <p className="text-lg mb-6 text-gray-600">
          Using our tool is straightforward:
        </p>
        <ol className="list-decimal list-inside mb-6 text-gray-600">
          <li>Navigate to the <strong>Create Table</strong> section.</li>
          <li>Fill in the form to define your table&apos;s name and columns.</li>
          <li>Click <strong>Create Table</strong> to generate the table in your database.</li>
          <li>Use the <strong>Insert Data</strong> section to add records to your table.</li>
        </ol>
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Benefits</h2>
        <p className="text-lg mb-6 text-gray-600">
          Our platform offers several advantages:
        </p>
        <ul className="list-disc list-inside mb-6 text-gray-600">
          <li>Ease of use: No need to learn complex SQL syntax.</li>
          <li>Time-saving: Quickly set up and modify your database.</li>
          <li>Accessibility: Manage your database from anywhere with an internet connection.</li>
          <li>Scalability: Suitable for both small projects and large applications.</li>
        </ul>
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Get Started</h2>
        <p className="text-lg text-gray-600">
          Ready to simplify your database management?{' '}
          <a href="/signup" className="text-blue-500 underline hover:text-blue-700">
            Sign up
          </a>{' '}
          today and start building your database with ease!
        </p>
      </div>
    </div>
  );
};

export default About;
