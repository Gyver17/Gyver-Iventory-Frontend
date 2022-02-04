const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 10,
    background: state.isSelected ? "var(--tertiary)" : "none",
  }),
  control: () => ({
    fontStyle: "italic",
    border: "2px solid var(--secondary)",
    width: "300px",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    borderRadius: "5px",
  }),
  menu: (provided, state) => ({
    ...provided,
    width: "300px",
    // borderBottom: '1px dotted pink',
    padding: "0px",
    background: "var(--cardBackground)",
  }),
  dropdownIndicator: () => ({
    color: "var(--secondary)",
    padding: "5px 10px",
    display: "flex",
    justifyContent: "center",
  }),
  indicatorSeparator: () => ({
    color: "blue",
    border: "1px solid var(--secondary)",
    display: "flex",
    height: "70%",
  }),
};

export default customStyles;
