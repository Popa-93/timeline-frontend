import DatePicker, { registerLocale } from "react-datepicker";
import { fr, enUS } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("fr", fr);
registerLocale("enUS", enUS);

export default function RecordDate(props) {
  //TODO Style DateInput button
  const DateInput = ({ value, onClick }) => (
    <button className="date-input" onClick={onClick}>
      {value}
    </button>
  );

  return (
    <DatePicker
      selected={props.date}
      onChange={props.updateDate}
      onMonthChange={props.updateDate}
      locale="fr" //TODO Localize date
      dateFormat="dd MMMM yyyy"
      //customInput={<DateInput />}
    />
  );
}
