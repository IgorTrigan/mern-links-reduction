import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreatePages from './pages/CreatePages';
import DetailPage from './pages/DetailPage';
import LinksPage from './pages/LinksPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePages />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<CreatePages />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
