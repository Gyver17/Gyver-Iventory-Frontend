const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 10,
    background: state.isSelected ? "var(--tertiary)" : "none",
  }),
  control: (_, { selectProps: { width }}) => ({
    fontSize: "14px",
    fontStyle: "italic",
    alignItems: "center",
    border: "2px solid var(--secondary)",
    width: width,
    height: (window.innerWidth < 1025) ? "35px" : "40px",
    display: "flex",
    flexDirection: "row",
    borderRadius: "5px",
    margin: "0px 5px",
  }),
  menu: (provided, state) => ({
    ...provided,
    padding: "0px",
    background: "var(--cardBackground)",
  }),
  dropdownIndicator: () => ({
    color: "var(--secondary)",
    padding: "3px",
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