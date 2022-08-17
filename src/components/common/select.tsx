import ReactSelect from "react-select";
import constants from "../../utils/constants";
const { colors } = constants;
const { primaryBackground, secondaryBackground } = colors;

//@ts-ignore
const Select = (props) => {
  if (!window) {
    return null;
  }

  return (
    <ReactSelect
      {...props}
      menuPortalTarget={document.body}
      menuPosition={"fixed"}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: "#fff",
          backgroundColor: "none",
          zIndex: 9999,
          overflow: "hidden",
          cursor: "pointer"
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          backgroundColor: "none",
          cursor: "pointer"
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: "#25242C",
          color: "#fff",
          zIndex: 9999,
          cursor: "pointer"
        }),
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 9999,
          cursor: "pointer"
        }),
        control: (provided) => ({
          // none of react-select's styles are passed to <Control />
          ...provided,
          background: "none",
          borderRadius: "8px",
          borderWidth: 1,
          borderColor:"#25242C",
          width: window.innerWidth <= 750 ? 170 : 170,
          color: "#fff",
          cursor: "pointer"
        }),
        listBox: (provided) => ({
          // none of react-select's styles are passed to <Control />
          ...provided,
          zIndex: 9999,
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = "opacity 300ms";
          return { ...provided, color: "#fff", opacity, transition };
        },
      }}
    />
  );
};

export default Select;
