Feature: Editing workspace settings for silent workspace

Background:
	Given workspace is silent
	And I'm logged in as an owner
	And I'm on Edit Workspace settings

Scenario 1: Changing Timezone settings
	When I change the timezone settings from the Timezone drop-down
	And click save
	Then settings should be changed 
	And all data should change according to the selected timezone


Scenario 2: Setting screenshots to blur
	When I switch blur screenshots ON
	Then all new screenshots taken should be blurry


Scenario 3: Making changes without saving the settings
	When I change the workspace setting
	And click on cancel 
	Then all changes should not be saved
	And I should be redirected to the dashboard





