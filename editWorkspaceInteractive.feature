Feature: Editing workspace settings for interactive workspace

Background:
	Given workspace is interactive
	And I'm logged in as an owner
	And I'm on Edit Workspace settings


Scenario 1: Successfully changing workspace from Interactive to Mixed workspace
	When I change my workspace to "silent & interactive"
	And click on "continue" button from the pop up
	Then workspace type should changed to mixed workspace
	And I should be able to add both interactive and silent users


Scenario 2: Successfully activating projects & tasks
	When I select "YES" from "Use projects & tasks in this workspace"
	And Click "save"
	Then "Projects & Tasks" should appear under "Settings" menu in navigation header
	And It should also appear under "Reports" menu in navigation header
	And I should be able to add projects & tasks

Scenario 3: De-activating projects & tasks for Silent & Interactive
	When I switch the projects & tasks setting to "NO"
	And Click "save"
	Then "Projects & Tasks" should disappear under settings menu and reports menu

Scenario 4: Changing Timezone settings
	When I change the timezone settings from the Timezone drop-down
	And click save
	Then settings should be changed 
	And all data should change according to the selected timezone


Scenario 5: Setting screenshots to blur
	When I switch blur screenshots ON
	Then all new screenshots taken should be blurry


Scenario 6: Making changes without saving the settings
	When I change the workspace setting
	And click on cancel 
	Then all changes should not be saved
	And I should be redirected to the dashboard




