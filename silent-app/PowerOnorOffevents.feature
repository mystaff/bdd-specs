#
# Feature: Power On or Off events
#
# Created by Sandy Tarke: 13 August, 2019
#

@Power-on-off 
Feature: Power On or Off events
  These are shut down and restart events
  
  Background:
	Given Install Silent app on Windows OS

  @power-on-mode 
  Scenario: 1 Test Silent app when the laptop is in Power On mode
    When User turn on laptop
    And started working on it
    Then Silent app should start tracking time

  @power-off-mode 
  Scenario: 2 Test Silent app when the laptop is in Power Off mode 
    When User click on windows key
    And Click on shut down option
    Then Silent app should stop tracking time

  @power-off-mode 
  Scenario: 3 Test Silent app when the laptop is in Power Off mode
    When User clicks 'ALT+CONTROL+DELETE' buttons together on keyboard
    And Click on shut down option on the screen
    Then Silent app should stop tracking time

  @Restart 
  Scenario: 4 Test Silent app when the laptop is suddenly restarted 
    When User is working on laptop
    And laptop restarted suddenly
    Then Silent app should stop tracking time
    And Start tracking time after laptop starts again

  @Low-battery 
  Scenario: 5 Test Silent app when the battery is less than 5%
    When User is working on laptop
    And laptop turn off due to no battery
    Then Silent app should stop tracking time
