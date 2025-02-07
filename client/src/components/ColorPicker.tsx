import React, { useState } from "react";

const ColorPicker = ({
  onColorSelect,
}: {
  onColorSelect: (color: string) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
    onColorSelect(event.target.value);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Pick a Color:</label>
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        style={styles.colorInput}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  colorInput: {
    width: "40px",
    height: "40px",
    border: "none",
    cursor: "pointer",
  },
};

export default ColorPicker;
