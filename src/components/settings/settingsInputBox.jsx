/**
 * Creates the input box for the settings, with the current names as default
 * @param {Object} props - The properties passed to the InputBox component.
 * @param {string} props.text - The current text to be displayed in the input box.
 * @param {string} props.inputId - The id for the input field
 * @param {Function} props.onInputChange - Callback function triggered when the input value changes.
 * @returns {React.Element} A component with an input box that responds to user input.
 */
export default function InputBox(props) {
  /*ACB to handle inputs*/
  function handleInputChangeACB(evt) {
    props.onInputChange(evt.target.value);
  }

  return (
    <input
      id={props.inputId}
      type="text"
      placeholder={props.predfinedText}
      value={props.inputText}
      onChange={handleInputChangeACB}
      className="settingsInput"
    />
  );
}
