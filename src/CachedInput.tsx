// @ts-nocheck
// TODO Fix this

import { useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { debounce } from "lodash";

export default function CachedInput(props) {
  const [val, setVal] = useState(props.value);

  //Debounce API call after onChange
  const parentOnChangeRef = useRef(null);
  useEffect(() => {
    const parentOnChange = (e) => {
      props.onChange(e);
    };
    parentOnChangeRef.current = debounce(parentOnChange, 500);
    return () => {
      parentOnChangeRef.current.flush();
    };
  }, [props]);

  return (
    <TextField
      {...props}
      value={val}
      //error={val.length < 1}
      //helperText={val.length < 1 ? "Champ obligatoire" : false}
      onChange={(e) => {
        setVal(e.target.value);
        parentOnChangeRef.current(e);
      }}
    />
  );
}
