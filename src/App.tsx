import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

interface Font {
  family: string;
  files: {
    regular: string;
    italic: string;
  };
}

const GlobalStyle = createGlobalStyle<{ font: Font }>`
@font-face {
  font-family: '${({ font }) => font.family}';
  src: url(${({ font }) => font.files.regular});
  
}
h1 {
  font-family: '${({ font }) => font.family}';
  font-style:italic;
}
`;

function App() {
  const [fonts, setFonts] = useState<any>([]);
  const [font, setFont] = useState<Font | null>(null);

  const API_KEY = 'AIzaSyCKKJleTQI05DjdyEkQ6rPSvx8jrQ-oYzI';
  const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFonts(data.items));
  }, []);
  //console.log(fonts);

  const updateFont = (e: any) => {
    setFont(fonts[e.target.value]);
  };
  return (
    <>
      <select onChange={updateFont}>
        {fonts.map((f: any, i: number) => (
          <option key={i} value={i}>
            {f.family}
          </option>
        ))}
      </select>
      {font && <GlobalStyle font={font} />}
      <h1>The quick brown fox</h1>
    </>
  );
}

export default App;
