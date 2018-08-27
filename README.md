# React code challenge

## Features:

1. ### Timer
    1. Start/Stop button to start/stop timer
    2. Hide/Show button to hide/show time label
    3. Reset button to reset timmer and notes
    4. With prosthesis checkbox to indicate whether a prosthetic attachment was used
    5. Notes field for notes specific to this test
    6. Submit button to add test to local records
2. ### Results
    1. Results are displayed in chronological order and display
        1. Time
        2. With Prosthesis (true or false)
        3. Notes
    2. **Filters:**
        1. *All*: Displays all tests
        2. *Without Prosthesis*: Displays all test where a prosthesis was not used
        3. *With Prosthesis*: Displays all test where a prosthesis was used
        4. ***Button for selected filter will be highlighted***
	3. **Interpretations**
        1. *Avg time*: Average time for all tests
        2. *Avg Without Prosthesis*: Average time for all tests where a prosthesis ***wasn't*** used
        3. *Avg With Prosthesis*: Average time for all tests where a prosthesis ***was*** used
        4. ***Average for selected filter will be highlighted***
    4. **Clear Results Button**
        1. Clears all results
