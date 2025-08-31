import Select from 'react-select';
import { products } from '../utils/products';

import { Strings } from '../utils/strings';

const options = [
    { value: "sofa", label: "Sofa" },
    { value: "chair", label: "Chair" },
    { value: "watch", label: "Watch" },
    { value: "mobile", label: "Mobile" },
    { value: "wireless", label: "Wireless" },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "var(--primary-color, #0f3460)",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected || state.isFocused ? "var(--primary-color, #0f3460)" : "white",
        color: state.isSelected || state.isFocused ? "white" : "var(--primary-color, #0f3460)",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({setFilterList}) => {
    const handleChange = (selectedOption)=> {
        setFilterList(products.filter(item => item.category ===selectedOption.value))
    }
    return (
    <Select
    options={options}
    defaultValue={{ value: "", label: Strings.visitCollection }}
    styles={customStyles}
    onChange={handleChange}
    />
    );
};

export default FilterSelect;
