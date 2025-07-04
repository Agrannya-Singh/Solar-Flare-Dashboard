# Solar Flare Dashboard

**Solar Flare Dashboard** is a modern, interactive web application that visualizes NASA solar flare data on a world map. Users can explore solar flare events by date, class (C/M/X), region, and more, with a beautiful, responsive UI and rich tooltips for scientific exploration and educational purposes.

---

## Features

- 🌍 **World Map Visualization:** Solar flare events are plotted as colored circles on an interactive world map using D3.js and TopoJSON.
- 🔎 **Date Range & Class Filtering:** Filter flares by date and by X-ray class (C, M, X) using intuitive controls.
- 🗺️ **Region Search:** Instantly search for flares by heliographic region or active region number.
- 🖱️ **Hover Tooltips:** Hover over any flare to see its name or event ID in a floating tooltip.
- 📊 **Summary Cards:** See total and per-class flare counts for the selected range.
- 🧭 **Legend & Glossary:** Built-in legend and glossary for quick reference of terms and color codes.
- 📚 **About Page:** Learn about solar flares, data sources, and how to read the dashboard.
- 💡 **Fully Responsive:** Works beautifully on desktop and mobile devices.
- 🚀 **Powered by NASA DONKI API:** Live solar flare data from NASA's official DONKI service.

---

## V2 Highlights

- **World Map Upgrade:** Replaced the old solar disk with a full equirectangular world map, using D3's geoNaturalEarth1 projection for a more global perspective.
- **Flare Overlay:** Solar flare circles are now accurately projected and overlaid on the world map.
- **Top Navigation Layout:** Moved all navigation, search, and class selectors to a vertical top bar for improved usability and modern dashboard aesthetics.
- **Enhanced Search:** Added a search box to filter flares by region impact or active region number.
- **Scrollable Main Content:** The main dashboard area now supports smooth vertical scrolling for large datasets.
- **Responsive Design:** Improved layout and scaling for all devices and screen sizes.

---

## Getting Started

### 1. Clone the Repository


git clone https://github.com/your-username/solar-flare-dashboard.git
cd solar-flare-dashboard


### 2. Install Dependencies


npm install


### 3. Download World Map Data

Download world-110m.json from [world-atlas](https://unpkg.com/world-atlas@2.0.2/world/110m.json) and place it in src/assets/

### 4. Start the Development Server

npm run dev


Visit [http://localhost:5173](http://localhost:5173) in your browser.



## Usage

1. **Select a date range** to view solar flare events.
2. **Filter by class** (C, M, X) using the checkboxes.
3. **Search by region** or active region number using the search bar.
4. **Hover over a flare** to see its name or event ID.
5. **Navigate** to About or Glossary for more information.



## Data Source

- [NASA DONKI Solar Flare API](https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/FLR)
- [World Atlas TopoJSON](https://unpkg.com/world-atlas@2.0.2/world/110m.json)



## Tech Stack

- React (Vite)
- D3.js & TopoJSON
- NASA DONKI API
- CSS Grid & Flexbox



## Version 2 Screenshots

![image](https://github.com/user-attachments/assets/d6457d73-61f5-4909-bf8a-def40552ce63)
![image](https://github.com/user-attachments/assets/cf7a6c65-2470-4f08-8d68-b4e82141acfa)




## License

This project is open source and free to use under the MIT License.



## Acknowledgments

- NASA Heliophysics Division
- D3.js & Observable community
- Wikipedia for scientific imagery

---
```
