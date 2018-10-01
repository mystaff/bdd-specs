Feature : Deleting screenshots

	Given delete screenshot setting is ON
	And user is on the Screenshots page


Scenario 1: Deleting a screenshot
	When user selects a screenshot
	And clicks on "delete" button
	And clicks "yes" from the popup
	Then screenshot is removed 
	And associated time is removed



Scenario 2: Deleting multiple screenshots
	When user selects multiple screenshots
	And clicks on "delete" button
	And clicks "yes" from the popup
	Then selected screenshots are deleted
	And associated time is removed
