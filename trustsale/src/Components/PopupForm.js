import React, { useState } from 'react';
import PopupPreview from './PopupPreview';

const PopupForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [corner, setCorner] = useState('bottom-right');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ message, color, corner });
    // Call the global customConfig function with the form data
    window.customConfig({
      siteId: 'dynamicConfig',  // This can be any identifier
      popupText: message,
      popupColor: color,
      popupCorner: corner,
    });
  };

  return (
    <div className="flex justify-start p-8">
      <form onSubmit={handleSubmit} className="max-w-md p-4 bg-white shadow-md rounded-lg mr-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message:
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Popup Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Corner:
            <select
              value={corner}
              onChange={(e) => setCorner(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Popup Preview</h2>
        <div className="border border-gray-300 p-4 rounded-lg">
          <PopupPreview message={message} color={color} />
        </div>
      </div>
    </div>
  );
};

export default PopupForm;