import React from 'react';
import PopupForm from './Components/PopupForm';
import PopupPreview from './Components/PopupPreview';

function App() {
  const handlePopupConfig = (config) => {
    // Function to send the config to your backend or apply it directly
    console.log(config);
    // For now, just log the configuration to the console
  };

  return (
    <div>
      <h1>Configure Your Popup</h1>
      <PopupForm onSubmit={handlePopupConfig} />
    </div>
  );
}

export default App;