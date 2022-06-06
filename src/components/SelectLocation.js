import { Autocomplete, Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

const SelectLocation = ({
  onChange,
  handleAutocomplete,
  locations,
  choice,
  setChoice,
  inputValue,
}) => {
  // useEffect(() => {}, [locations]);

  return (
    <div>
      {/* <Autocomplete
        freeSolo
        sx={{ width: 300 }}
        id="free-solo-2-demo"
        disableClearable
        options={locations}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAutocomplete();
          }
        }}
        onChange={onChange}
      /> */}
      <Box component="form">
        <Autocomplete
          value={choice}
          onChange={setChoice}
          inputValue={inputValue}
          onInputChange={onChange}
          id="controllable-states-demo"
          options={locations}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Controllable" />
          )}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     handleAutocomplete();
          //   }
          // }}
          onSubmit={(e) => handleAutocomplete()}
        />
      </Box>
    </div>
  );
};

export default SelectLocation;
