import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div className="">
      <div className="flex items-start gap-2 mb-2 flex-col">
        <div className="flex items-center gap-2">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-900"
          >
            {labelName}
          </label>
          {isSurpriseMe && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="font-semibold text-sm bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
            >
              Surprise Me
            </button>
          )}
        </div>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className="bg-gray-50 border w-full border-gray-300 text-gray text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block p-3"
        />
      </div>
    </div>
  );
};

export default FormField;
