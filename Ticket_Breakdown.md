# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Update Agent table to include custom IDs

**Description:**
Currently, the system uses the internal database ID for each Agent in the reports. We need to update the Agent table to include a field for custom IDs that Facilities can save and use for their own identification purposes.

**Acceptance Criteria:**
- Add a new column named "custom_id" to the Agent table in the database.
- Modify the data model and database schema to accommodate the new field.
- Ensure the "custom_id" field accepts alphanumeric values and has a length limit.
- Validate and sanitize the custom IDs to prevent any potential security issues.
- Update the existing APIs and database queries to use the "custom_id" field when generating reports.

**Effort Estimate:** 4 hours

---

### Ticket 2: Update report generation process

**Description:**
Currently, the reports generated use the internal database IDs for Agents. We need to modify the report generation process to utilize the custom IDs entered by Facilities for each Agent.

**Acceptance Criteria:**
- Modify the `generateReport` function to fetch the custom IDs from the Agent table based on the internal database IDs.
- Replace the internal database IDs with the custom IDs in the generated reports.
- Ensure the reports maintain their existing format and other relevant information.

**Effort Estimate:** 3 hours

---

### Ticket 3: Update Shifts retrieval process

**Description:**
Currently, the `getShiftsByFacility` function returns Shifts with metadata about the assigned Agent, using the internal database IDs. We need to modify the function to return Shifts with custom IDs instead.

**Acceptance Criteria:**
- Modify the `getShiftsByFacility` function to fetch the Shifts with custom IDs for the assigned Agents.
- Update the response format to include the custom IDs instead of the internal database IDs.

**Effort Estimate:** 2 hours

---

### Ticket 4: Facility UI enhancements

**Description:**
To support the entry and management of custom IDs, we need to update the Facility user interface to allow Facilities to save and edit custom IDs for their Agents.

**Acceptance Criteria:**
- Add a new input field for custom IDs in the Facility UI.
- Modify the Facility UI to display and allow editing of the custom IDs for each Agent.
- Validate the custom IDs entered by Facilities to ensure they meet the specified requirements.
- Save and update the custom IDs in the Agent table when Facilities make changes.

**Effort Estimate:** 6 hours
