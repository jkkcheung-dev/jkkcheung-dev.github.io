import { useState, createContext } from 'react'
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { theme } from '@/theme';
import { resumeEN } from '@/data/resume-en';
import { resumeJP } from '@/data/resume-jp';
import { Header } from '@/components/Header';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Languages } from '@/components/Languages';
import { Certifications } from '@/components/Certifications';
import { Education } from '@/components/Education';

export const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => { }
});

function App() {
  const [language, setLanguage] = useState<'en' | 'jp'>('en');
  const content = language === 'en' ? resumeEN : resumeJP;

  return (
    <LanguageContext.Provider value={{
      language,
      toggleLanguage: () => setLanguage(lang => lang === 'en' ? 'jp' : 'en')
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" >
          <Header data={content} />
          <Skills skills={content.skills} />
          <Languages languages={content.languages} />
          <Experience experiences={content.experiences} />
          <Education education={content.education} />
          <Certifications certifications={content.certifications} />
        </Container>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
}

export default App
