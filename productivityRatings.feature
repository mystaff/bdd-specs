Feature: 
	As a company owner and as an admin
	I should be able to set or change the productivity rating of a website and application

Background:
	Given I'm logged in as an admin/owner
	And I'm at the productivity ratings page


Scenario 1: Changing productivity ratings for rated activities
	When I change the productivity rating of a website or application
	Then productivity rating should change for all users in the workspace
	And should only affect future activities and not past data

Scenario 2: Set productivity rating for unrated activity
	When I select an unrated activity
	And I set a productivity rating for the first time
	Then productivity rating should change at the global level
	And should affect future activities for all companies
	