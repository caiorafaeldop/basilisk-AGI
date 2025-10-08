import { createContext, useContext, useState, ReactNode } from 'react';

interface PublicPageContextType {
  isPublicPage: boolean;
  setIsPublicPage: (value: boolean) => void;
}

const PublicPageContext = createContext<PublicPageContextType | undefined>(undefined);

export const PublicPageProvider = ({ children }: { children: ReactNode }) => {
  const [isPublicPage, setIsPublicPage] = useState(false);

  return (
    <PublicPageContext.Provider value={{ isPublicPage, setIsPublicPage }}>
      {children}
    </PublicPageContext.Provider>
  );
};

export const usePublicPage = () => {
  const context = useContext(PublicPageContext);
  if (!context) {
    throw new Error('usePublicPage must be used within PublicPageProvider');
  }
  return context;
};
