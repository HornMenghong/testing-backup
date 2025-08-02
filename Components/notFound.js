export const notFoundComponent = () => {
  return `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 class="text-9xl font-extrabold text-gray-300 select-none">404</h1>
      <h2 class="text-4xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      <p class="text-gray-600 mt-2 max-w-md text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        class="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  `;
};