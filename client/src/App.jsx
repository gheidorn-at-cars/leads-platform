import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LeadsList from './pages/LeadsList';
import CreateLead from './pages/CreateLead';
import EditLead from './pages/EditLead';
import ViewLead from './pages/ViewLead';
import TestTailwind from './components/TestTailwind';

function App() {
  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-sm mx-auto bg-blue-500 rounded-xl shadow-md flex items-center space-x-4 m-5">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 bg-white rounded-full"></div>
        </div>
        <div>
          <div className="text-xl font-medium text-white">Tailwind Test</div>
          <p className="text-blue-100">Is Tailwind working?</p>
        </div>
      </div>
      
      <Navbar />
      <TestTailwind />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<LeadsList />} />
          <Route path="/leads/new" element={<CreateLead />} />
          <Route path="/leads/:id/edit" element={<EditLead />} />
          <Route path="/leads/:id" element={<ViewLead />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;