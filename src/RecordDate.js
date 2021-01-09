import Paper from "@material-ui/core/Paper";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr, enUS } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";

import PropTypes from "prop-types";

registerLocale("fr", fr);
registerLocale("enUS", enUS);

export default function RecordDate(props) {
  //TODO Style DateInput button
  // const DateInput = ({ value, onClick }) => (
  //   <button className="date-input" onClick={onClick}>
  //     {value}
  //   </button>
  // );

  return (
    <Paper variant="outlined" style={{ display: "inline-block" }}>
      <DatePicker
        selected={props.date}
        onChange={props.updateDate}
        onMonthChange={props.updateDate}
        locale="fr" //TODO Localize date
        dateFormat="dd MMMM yyyy"
        //customInput={<DateInput />}
      />
    </Paper>
  );
}

RecordDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  updateDate: PropTypes.func.isRequired,
};
