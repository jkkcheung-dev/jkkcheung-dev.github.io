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
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

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
          <Certifications certifications={content.certifications} />
        </Container>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
