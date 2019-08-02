#
# Feature: Lock or Unlock events
#
# Created by Sandy on: 2 August, 2019
#


@Silent-app 
Feature: Lock or Unlock events

Background:
	Given Install Silent app on Windows OS

  @lock-mode 
  Scenario: 1 Test Silent app when the laptop is locked
    When User clicks 'Windows+L' on keyboard
    And Laptop gets locked
    Then App should stop tracking time

  @lock-mode 
  Scenario: 2 Test Silent app when the laptop is locked
    When User clicks 'ALT+CONTROL+DELETE' buttons together on keyboard
    And User click on 'Lock' button on the screen
    Then App should stop tracking time

  @lock-mode 
  Scenario: 3 Test Silent app when the laptop is locked 
    Given Set inactivity time for lock screen from screensaver
    When Laptop is idle for selected inactive time
    And Laptop locked automatically 
    Then App should stop tracking time

  @Unlock-mode 
  Scenario: 4 Test Silent app when the laptop is unlocked
    Given Laptop screen is locked
    When Click anywhere on the screen
    And Enter password on logon screen
    And Unlock screen
    Then App should start tracking time
