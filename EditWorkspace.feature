Feature: Switching workspace tracking type

Background:
	Given I am on "Edit Workspace" window

Scenario: Changing workspace from Interactive to Silent & Interactive
	And workspace is set to "Interactive"
	When I select "Silent & Interactive" from the workspace trackingMode dropdown
	Then It should bring up the confirmation pop up 
	When I click "continue" button
	Then All other trackingMode from the dropdown should be disabled
	When I click "Save"
	Then settings should be saved

Scenario: Changing workspace from Silent to Silent & Interactive
	And workspace is set to "Silent"
	When I select "Silent & Interactive" from the workspace trackingMode dropdown
	Then It should bring up the confirmation pop up 
	When I click "continue" button
	Then All other trackingMode from the dropdown should be disabled
	When I click "Save"
	Then settings should be saved

Scenario: Activating projects & tasks for Silent & Interactive
	And workspace is set to "Silent & Interactive"
	And projects & tasks setting is set to "NO"
	When I switch the projects & tasks setting to "YES"
	And Click "save"
	Then "Projects & Tasks" should appear in settings menu and reports menu
	And Projects & Tasks should display in desktop client

Scenario: De-activating projects & tasks for Silent & Interactive
	And workspace is set to "Silent & Interactive"
	And projects & tasks setting is set to "YES"
	When I switch the projects & tasks setting to "NO"
	And Click "save"
	Then "Projects & Tasks" should disappear in settings menu and reports menu
	And "Projects & Tasks" should disappear in desktop client

Scenario: Logging in to computer after switching workspace from Interactive to Silent & Interactive
	Given workspace setting was switched from "Interactive" to "Silent & Interactive"
	When I download the silent application
	And I install the application
	And launch the application
	Then silent app should run on Background

Scenario: Switching from "Interactive" to "Silent"
	Given workspace setting is set to "Interactive"
	And "Projects & Tasks" setting is turned "ON"
	When developer changes the setting from "Interactive" to "Silent"
	Then "Projects & Tasks" should disappear from the web interface
	And users should not be able to log in  to the desktop client
	And users who are logged in to the desktop client should be logged out automatically


